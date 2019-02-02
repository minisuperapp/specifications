const { setWorldConstructor } = require('cucumber')
const apiRequester = require('./web/api_requester')
const DelivererLoginRequest = require('./web/requests/deliverer-api/login')
const PublishOfferRequest = require('./web/requests/deliverer-api/offers/publish')
const OffersGroupedByProductRequest = require('./web/requests/customer-api/offers/searchForAllProducts')
const BestOfferAssigmentRequest = require('./web/requests/customer-api/offers/assign_best')
const PlaceOrderRequest = require('./web/requests/customer-api/place_order')
const customerSocket = require('./web/sockets/customer_socket_client')
const delivererSocket = require('./web/sockets/deliverer_socket_client')

class Context {
  constructor(params) {
    this.attach = params.attach
    this.lastResponse = {}
    this.currentRequest = {}
    this.delivererSessionTokens = []
    this.customerCode = null
    this.delivererOfferMap = {}
    this.delivererSockets = {}
    this.customerSockets = []
    this.lastPlacedOrder = {}
    this.initState = {
      customer: {
        offersByProduct: {},
        offersById: {},
        lastAssignedOfferId: '',
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
  }

  _setCustomerSocketListeners(socket) {
    socket.on('published_offer', offer => {
      this._logSocketMessage('customer-api', 'published_offer', offer)
      if (!this.state.customer.offersByProduct[offer.productCode]) {
        this.state.customer.offersByProduct[offer.productCode] = {}
        this.state.customer.offersByProduct[offer.productCode].offers = []
      }
      this.state.customer.offersByProduct[offer.productCode].offers.push(offer)
      this.state.customer.offersById[offer.id] = {
        [offer.id]: offer,
      }
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
      const currentOrder = this.state.customer.orders[order.orderId]
      this.state.customer.orders = {
        ...this.state.customer.orders,
        [order.orderId]: {
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

  _setDelivererSocketListeners(socket, deliverer) {
    socket.on('placed_order', data => {
      this._logSocketMessage('deliverer-api', 'placed_order', data)
      if (!this.state.deliverer[deliverer]) {
        this.state.deliverer[deliverer] = {}
        this.state.deliverer[deliverer].pendingDeliveries = []
      }
      this.state.deliverer[deliverer].pendingDeliveries.push({
        order: data.order,
        product: data.product
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
      this.delivererSessionTokens[request.deliverer],
      this.customerCode,
    )

    this._logResponseInfo(this.lastResponse)

    this._modifyLocalState(request)

    return this.lastResponse
  }

  createCustomerSocket(location) {
    const socket = customerSocket.create(location)
    this.customerSockets.push(socket)
    this._setCustomerSocketListeners(socket)
    return socket
  }

  createDelivererSocket(deliverer) {
    const socket = delivererSocket.create()
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
    if (this.lastResponse.cookies && this.lastResponse.cookies.setCustomerCode) {
      this.customerCode = this.lastResponse.cookies.setCustomerCode
    }

    if (request instanceof DelivererLoginRequest && this.lastResponse.success) {
      this.delivererSessionTokens[request.deliverer] = this.lastResponse.data.sessionToken
    }

    if (request instanceof PublishOfferRequest && this.lastResponse.success) {
      this.delivererOfferMap[request.deliverer] = this.lastResponse.data.id
    }

    if (request instanceof OffersGroupedByProductRequest && this.lastResponse.success) {
      this.state.customer.offersByProduct = this.lastResponse.data.offersByProduct
    }

    if (request instanceof PlaceOrderRequest && this.lastResponse.success) {
      this.lastPlacedOrder = this.lastResponse.data
      this.state.customer.orders[this.lastResponse.data.id] = this.lastResponse.data
    }

    if (request instanceof BestOfferAssigmentRequest && this.lastResponse.success) {
      this.state.customer.lastAssignedOfferId = this.lastResponse.data.id
    }
  }
}

setWorldConstructor(Context)
