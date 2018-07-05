const { setWorldConstructor } = require('cucumber')
const apiRequester = require('support/api_requester')
const DelivererLoginRequest = require('./requests/deliverer-api/login')
const PublishOfferRequest = require('./requests/deliverer-api/offer/publish')
const io = require('socket.io-client')
const socket = io(`${process.env.DELIVERER_API_URL || 'http://localhost:3001'}`)

class Context {
  constructor(params) {
    this.attach = params.attach
    this.lastResponse = {}
    this.currentRequest = {}
    this.delivererSessionTokens = []
    this.delivererOfferMap = {}
    this.currentProductOffers = {}
    this.currentLocation = {
      latitude: '28.1867048',
      longitude: '-105.4600849',
    }
    socket.on('published_offer', offer => {
      if (!this.currentProductOffers[offer.productCode]) {
        this.currentProductOffers[offer.productCode] = {}
        this.currentProductOffers[offer.productCode].offers = []
      }
      this.currentProductOffers[offer.productCode].offers.push(offer)
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
    )

    if (request instanceof DelivererLoginRequest && this.lastResponse.success) {
      this.delivererSessionTokens[request.deliverer] = this.lastResponse.data.sessionToken
    }

    if (request instanceof PublishOfferRequest && this.lastResponse.success) {
      this.delivererOfferMap[request.deliverer] = this.lastResponse.data.id
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
      longitude
    })
  }

  setCurrentRequest(currentRequest) {
    this.currentRequest = currentRequest
  }
}

setWorldConstructor(Context)
