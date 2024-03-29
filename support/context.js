const AWS = require('aws-sdk')
const Bluebird = require('bluebird')
const { setWorldConstructor, setDefaultTimeout } = require('cucumber')
const apiRequester = require('./web/api_requester')
// const DelivererLoginRequest = require('./web/requests/sam-api/deliverer/login')
const DelivererLoginRequest = require('./web/requests/deliverer-api/login')
const PublishOfferRequest = require('./web/requests/deliverer-api/offers/publish')
const OffersGroupedByProductRequest = require('./web/requests/customer-api/offers/search_for_all_products')
const BestOfferAssigmentRequest = require('./web/requests/customer-api/offers/assign_best')
const CustomerAddAddressRequest = require('./web/requests/customer-api/add_address')
const PlaceOrderRequest = require('./web/requests/customer-api/place_order')
const customerSocket = require('./web/sockets/customer_socket_client')
const delivererSocket = require('./web/sockets/deliverer_socket_client')

const sqs = new AWS.SQS({ endpoint: 'http://localhost:4566', region: 'us-west-1' })
const sns = new AWS.SNS({ endpoint: 'http://localhost:4566', region: 'us-west-1' })

setDefaultTimeout(30000)

class Context {
  constructor(params) {
    this.attach = params.attach
    this.lastResponse = {}
    this.currentRequest = {}
    this.delivererSessionTokens = []
    this.customer_session_token = null
    this.delivererOfferMap = {}
    this.delivererSockets = {}
    this.customerSockets = []
    this.lastPlacedOrders = []
    this.initState = {
      customer: {
        offersByProduct: {},
        offersById: {},
        lastAssignedOfferId: '',
        lastCustomerAddressId: null,
        orders: {},
      },
      deliverer: {
        pendingDeliveryOrders: [],
      },
    }
    this.state = this.initState
    this.initSocketLocks = {
      updateOfferLocation: 0,
      updateOrderStatus: 0,
      placedOrder: 0,
    }
    this.socketLocks = this.initSocketLocks
    this.socketExceptions = []

    this.clientSubscriptions = {}
    this.delivererSubscriptions = {}
  }

  _setCustomerSocketListeners(socket) {
    socket.on('published_offer', offer => {
      this._logSocketMessage('customer-api', 'published_offer', offer)
      this.setCustomerOfferByProduct(offer)
    })
    socket.on('update_offer_location', async offer => {
      this._logSocketMessage('customer-api', 'update_offer_location', offer)
      await this.awaitOn(() => this.state.customer.offersById[offer.offerId])
      this.state.customer.offersById[offer.offerId].latitude = offer.newLocation.latitude
      this.state.customer.offersById[offer.offerId].longitude = offer.newLocation.longitude
      this.socketLocks.updateOfferLocation--
    })
    socket.on('update_order_status', async order => {
      this._logSocketMessage('customer-api', 'update_order_status', order)
      this.updateOrderStatus(order)

      this.socketLocks.updateOrderStatus--
    })
    socket.on('warning', async message => {
      this._logSocketMessage('customer-api', 'warning', { message })
      this.socketExceptions.push(message)
    })
  }

  updateOrderStatus(order) {
    const currentOrder = this.state.customer.orders[order.order_id]
    this.state.customer.orders = {
      ...this.state.customer.orders,
      [order.order_id]: {
        ...currentOrder,
        status: order.status,
      },
    }
  }

  setCustomerOfferByProduct(offer) {
    if (!this.state.customer.offersByProduct[offer.product_code]) {
      this.state.customer.offersByProduct[offer.product_code] = {}
      this.state.customer.offersByProduct[offer.product_code].offers = []
    }
    this.state.customer.offersByProduct[offer.product_code].offers.push(offer)
    this.state.customer.offersById[offer.id] = {
      [offer.id]: offer,
    }
  }

  setPendingDelivery(deliverer, orders) {
    if (!this.state.deliverer[deliverer]) {
      this.state.deliverer[deliverer] = {}
      this.state.deliverer[deliverer].pendingDeliveries = []
    }
    this.state.deliverer[deliverer].pendingDeliveries.push({
      order: orders[0],
    })
  }

  _setDelivererSocketListeners(socket, deliverer) {
    socket.on('placed_order', data => {
      this._logSocketMessage('deliverer-api', 'placed_order', data)
      if (!this.state.deliverer[deliverer]) {
        this.state.deliverer[deliverer] = {}
        this.state.deliverer[deliverer].pendingDeliveries = []
      }
      this.state.deliverer[deliverer].pendingDeliveries.push({
        order: data.orders[0],
      })
      this.socketLocks.placedOrder--
    })
    socket.on('warning', async message => {
      this._logSocketMessage('deliverer-api', 'warning', { message })
      this.socketExceptions.push(message)
    })
  }

  async send(request) {
    this._logRequestInfo(request)

    this.lastResponse = await apiRequester.send(
      request,
      this.customer_session_token,
      this.delivererSessionTokens[request.deliverer],
    )

    this._logResponseInfo(this.lastResponse)

    this._modifyLocalState(request)

    return this.lastResponse
  }

  //deprecated
  createCustomerSocket() {
    const socket = customerSocket.create(this.customer_session_token)
    this.customerSockets.push(socket)
    this._setCustomerSocketListeners(socket)
    return socket
  }

  async subscribeDelivererToTopic(deliverer, topic) {
    if (!this.delivererSubscriptions[deliverer]) {
      this.delivererSubscriptions[deliverer] = {}
    }
    this.delivererSubscriptions[deliverer][topic] = await this.subscribeToTopic(topic)
  }

  async subscribeClientToTopic(topic) {
    this.clientSubscriptions[topic] = await this.subscribeToTopic(topic)
  }

  async subscribeToTopic(topic) {
    const { SubscriptionArn } = await sns
      .subscribe({
        TopicArn: `arn:aws:sns:us-west-1:000000000000:${topic}`,
        Protocol: 'sqs',
        Endpoint: `http://localstack:4576/queue/${topic}`,
      })
      .promise()
    return SubscriptionArn
  }

  async unsubscribeClientFromTopic(topic) {
    const arn = this.clientSubscriptions[topic]
    if (arn) {
      await this.unsubscribeFromTopic(this.clientSubscriptions[topic])
    }
  }

  async unsubscribeDelivererFromTopic(deliverer, topic) {
    await this.unsubscribeFromTopic(this.delivererSubscriptions[deliverer][topic])
  }

  async unsubscribeFromTopic(arn) {
    await sns
      .unsubscribe({
        SubscriptionArn: arn,
      })
      .promise()
  }

  async purgeSQS() {
    await Bluebird.each(
      ['published_offer', 'placed_order', 'update_order_status'],
      async queueName => {
        const { QueueUrl } = await sqs.getQueueUrl({ QueueName: queueName }).promise()
        await sqs.purgeQueue({ QueueUrl }).promise()
      },
    )
  }

  async pollQueue(queueName) {
    let message = '{}'
    const { QueueUrl } = await sqs.getQueueUrl({ QueueName: queueName }).promise()
    const data = await sqs.receiveMessage({ QueueUrl }).promise()
    if (data.Messages) {
      const event = JSON.parse(data.Messages[0].Body)
      message = event.Message

      for await (let m of data.Messages) {
        await sqs.deleteMessage({ QueueUrl, ReceiptHandle: m.ReceiptHandle })
      }
    }
    return message
  }

  async pollPublishedOffers() {
    const message = await this.pollQueue('published_offer')
    const offer = JSON.parse(message)
    this.setCustomerOfferByProduct(offer)
  }

  async pollUpdatedOrderStatus() {
    const message = await this.pollQueue('update_order_status')
    const order = JSON.parse(message)
    this.updateOrderStatus(order)
  }

  async pollPlacedOrders(deliverer) {
    const message = await this.pollQueue('placed_order')
    const { orders } = JSON.parse(message)
    this.setPendingDelivery(deliverer, orders)
  }

  createDelivererSocket(deliverer, deliverer_session_token) {
    const socket = delivererSocket.create(deliverer_session_token)
    this.delivererSockets[deliverer] = socket
    this._setDelivererSocketListeners(socket, deliverer)
    return socket
  }

  async sendCurrentRequest() {
    return await this.send(this.currentRequest.build())
  }

  setCurrentRequest(currentRequest) {
    this.currentRequest = currentRequest
  }

  async awaitOn(func) {
    let tries = 10
    while (!func() && tries-- > 0) {
      await this.sleep(200)
    }
  }

  async awaitForSocket(lock) {
    const currentLock = this.socketLocks[lock]
    this.socketLocks[lock]++
    await this.awaitOn(() => this.socketLocks[lock] <= currentLock)
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  _logRequestInfo(request) {
    this.attach(`${request.method} /${request.path} (${request.apiServer})`)
    this.attach(
      `request
${JSON.stringify(request.payload)}`,
      'text/plain',
    )
  }

  _logResponseInfo(response) {
    this.attach(
      `response
${JSON.stringify(response)}`,
      'text/plain',
    )
  }

  _logSocketMessage(endpoint, channel, data) {
    this.attach(`${endpoint} ${channel}`)
    this.attach(
      `socket response
${JSON.stringify(data)}`,
      'text/plain',
    )
  }

  _modifyLocalState(request) {
    if (this.lastResponse.cookies && this.lastResponse.cookies.customerSessionToken) {
      this.customer_session_token = this.lastResponse.cookies.customerSessionToken
    }

    if (request instanceof DelivererLoginRequest && this.lastResponse.success) {
      this.delivererSessionTokens[request.deliverer] =
        this.lastResponse.cookies.delivererSessionToken
    }

    if (request instanceof PublishOfferRequest && this.lastResponse.success) {
      this.delivererOfferMap[request.deliverer] = this.lastResponse.data
    }

    if (request instanceof OffersGroupedByProductRequest && this.lastResponse.success) {
      this.state.customer.offersByProduct = this.lastResponse.data.offersByProduct
    }

    if (request instanceof PlaceOrderRequest && this.lastResponse.success) {
      this.lastPlacedOrders = this.lastResponse.orders
      this.lastResponse.orders.forEach(order => {
        this.state.customer.orders[order.id] = order
      })
    }

    if (request instanceof BestOfferAssigmentRequest && this.lastResponse.success) {
      const offers = Object.values(this.lastResponse.index)
      this.state.customer.lastAssignedOfferId = offers[0].id
    }

    if (request instanceof CustomerAddAddressRequest && this.lastResponse.success) {
      this.state.customer.lastCustomerAddressId = this.lastResponse.location.id
    }
  }
}

setWorldConstructor(Context)
