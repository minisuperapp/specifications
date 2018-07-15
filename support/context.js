const { setWorldConstructor } = require('cucumber')
const apiRequester = require('support/api_requester')
const DelivererLoginRequest = require('./requests/deliverer-api/login')
const PublishOfferRequest = require('./requests/deliverer-api/offer/publish')
const OffersGroupedByProductRequest = require('./requests/customer-api/offers_grouped_by_product')
const socket = require('./socket')

class Context {
  constructor(params) {
    this.attach = params.attach
    this.lastResponse = {}
    this.currentRequest = {}
    this.delivererSessionTokens = []
    this.customerCode = null
    this.delivererOfferMap = {}
    this.state = {
      offersByProduct: {},
      offersById: {}
    }
    this.currentLocation = {
      latitude: '28.1867048',
      longitude: '-105.4600849',
    }
    socket.on('published_offer', offer => {
      if (!this.state.offersByProduct[offer.productCode]) {
        this.state.offersByProduct[offer.productCode] = {}
        this.state.offersByProduct[offer.productCode].offers = []
      }
      this.state.offersByProduct[offer.productCode].offers.push(offer)
      this.state.offersById[offer.id] = {
        [offer.id]: offer
      }
    })
    socket.on('update_offer_location', offer => {
      this.state.offersById[offer.offerId].latitude = offer.newLocation.latitude
      this.state.offersById[offer.offerId].longitude = offer.newLocation.longitude
    })
  }

  async send(request) {
    this.attach(`${request.method} /${request.path} (${request.apiServer})`)
    this.attach(
      `request
${JSON.stringify(request.body)}`,
      'text/plain',
    )

    this.lastResponse = await apiRequester.send(
      request,
      this.delivererSessionTokens[request.deliverer],
      this.customerCode,
    )

    if (this.lastResponse.cookies && this.lastResponse.cookies.setCustomerCode) {
      this.customerCode = this.lastResponse.cookies.setCustomerCode
      console.log('this.customerCode: ' + this.customerCode)
    }

    if (request instanceof DelivererLoginRequest && this.lastResponse.success) {
      this.delivererSessionTokens[request.deliverer] = this.lastResponse.data.sessionToken
    }

    if (request instanceof PublishOfferRequest && this.lastResponse.success) {
      this.delivererOfferMap[request.deliverer] = this.lastResponse.data.id
    }

    if (request instanceof OffersGroupedByProductRequest && this.lastResponse.success) {
      this.state.offersByProduct = this.lastResponse.data.offersByProduct
    }

    this.attach(
      `response
${JSON.stringify(this.lastResponse)}`,
      'text/plain',
    )

    return this.lastResponse
  }

  async sendCurrentRequest() {
    return await this.send(this.currentRequest.build())
  }

  async sendCustomerLocation(latitude, longitude) {
    socket.emit('send_location', {
      latitude,
      longitude,
    })
  }

  setCurrentRequest(currentRequest) {
    this.currentRequest = currentRequest
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

setWorldConstructor(Context)
