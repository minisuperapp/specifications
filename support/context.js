const { setWorldConstructor } = require('cucumber')
const apiRequester = require('./web/api_requester')
const DelivererLoginRequest = require('./web/requests/deliverer-api/login')
const PublishOfferRequest = require('./web/requests/deliverer-api/offer/publish')
const OffersGroupedByProductRequest = require('./web/requests/customer-api/offers/grouped_by_product')
const BestOfferAssigmentRequest = require('support/web/requests/customer-api/offers/assign_best')
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
    this.lastPlacedOrderId = ''
    this.state = {
      customer: {
        offersByProduct: {},
        offersById: {},
        lastAssignedOfferId: ''
      },
      deliverer: {},
    }
  }

  _setSocketListeners(socket) {
    socket.on('published_offer', offer => {
      if (!this.state.customer.offersByProduct[offer.productCode]) {
        this.state.customer.offersByProduct[offer.productCode] = {}
        this.state.customer.offersByProduct[offer.productCode].offers = []
      }
      this.state.customer.offersByProduct[offer.productCode].offers.push(offer)
      this.state.customer.offersById[offer.id] = {
        [offer.id]: offer,
      }
    })
    socket.on('update_offer_location', offer => {
      this.state.customer.offersById[offer.offerId].latitude = offer.newLocation.latitude
      this.state.customer.offersById[offer.offerId].longitude = offer.newLocation.longitude
    })
  }

  async send(request) {
    this._logRequestInfo(request)

    if (request instanceof OffersGroupedByProductRequest) {
      this.createCustomerSocket(request.payload.customerLocation)
    }

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
    this._setSocketListeners(socket)
  }

  async sendCurrentRequest() {
    return await this.send(this.currentRequest.build())
  }

  setCurrentRequest(currentRequest) {
    this.currentRequest = currentRequest
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

  _modifyLocalState(request) {
    if (this.lastResponse.cookies && this.lastResponse.cookies.setCustomerCode) {
      this.customerCode = this.lastResponse.cookies.setCustomerCode
    }

    if (request instanceof DelivererLoginRequest && this.lastResponse.success) {
      this.delivererSessionTokens[request.deliverer] = this.lastResponse.data.sessionToken

      const socket = delivererSocket.create()
      this.delivererSockets[request.deliverer] = socket
      socket.on('placed_order', order => {
        if (!this.state.deliverer[request.deliverer]) {
          this.state.deliverer[request.deliverer] = {}
          this.state.deliverer[request.deliverer].pendingDeliveries = []
        }
        this.state.deliverer[request.deliverer].pendingDeliveries.push(order)
      })
      socket.emit('deliverer_socket_connection', this.lastResponse.data.sessionToken)
    }

    if (request instanceof PublishOfferRequest && this.lastResponse.success) {
      this.delivererOfferMap[request.deliverer] = this.lastResponse.data.id
    }

    if (request instanceof OffersGroupedByProductRequest && this.lastResponse.success) {
      this.state.customer.offersByProduct = this.lastResponse.data.offersByProduct
    }

    if (request instanceof PlaceOrderRequest && this.lastResponse.success) {
      this.lastPlacedOrderId = this.lastResponse.data.id
    }

    if (request instanceof BestOfferAssigmentRequest && this.lastResponse.success) {
      this.state.customer.lastAssignedOfferId = this.lastResponse.data.id
    }
  }
}

setWorldConstructor(Context)
