const AWS = require('aws-sdk')
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

const sqs = new AWS.SQS({ endpoint: 'http://localhost:4566', region: 'us-west-2' })
const sns = new AWS.SNS({ endpoint: 'http://localhost:4566', region: 'us-west-2' })

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

    this.subscriptionArns = {
      offerUpdate: '',
    }
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
      const currentOrder = this.state.customer.orders[order.order_id]
      this.state.customer.orders = {
        ...this.state.customer.orders,
        [order.order_id]: {
          ...currentOrder,
          status: order.status,
        },
      }

      this.socketLocks.updateOrderStatus--
    })
    socket.on('warning', async message => {
      this._logSocketMessage('customer-api', 'warning', { message })
      this.socketExceptions.push(message)
    })
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

  async subscribeToTopic() {
    const { SubscriptionArn } = await sns
      .subscribe({
        TopicArn: 'arn:aws:sns:us-west-2:000000000000:local_sns',
        Protocol: 'sqs',
        Endpoint: 'http://localstack:4576/queue/local_queue',
      })
      .promise()
    this.subscriptionArns.offerUpdate = SubscriptionArn
  }

  async unsubscribeToTopic() {
    await sns
      .unsubscribe({
        SubscriptionArn: this.subscriptionArns.offerUpdate,
      })
      .promise()
  }

  async listenToOfferUpdates() {
    const { QueueUrl } = await sqs.getQueueUrl({ QueueName: 'local_queue' }).promise()
    await sqs.receiveMessage({ QueueUrl }, async (err, data) => {
      if (err) {
        console.log(err, err.stack)
        return
      }
      if (data.Messages) {
        const message = JSON.parse(data.Messages[0].Body)
        const offer = JSON.parse(message.Message)
        this.setCustomerOfferByProduct(offer)
      }
      await sqs.purgeQueue({ QueueUrl }).promise()
    })
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
    if (
      request.apiServer === 'customer-api' &&
      this.lastResponse.cookies &&
      this.lastResponse.cookies.customerSessionToken
    ) {
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
