const { setWorldConstructor } = require('cucumber')
const apiRequester = require('support/api_requester')
const DelivererLoginRequest = require('./requests/deliverer-api/login')
const PublishOfferRequest = require('./requests/deliverer-api/offer/publish')
const GetProductsRequest = require('./requests/customer-api/get_products')

class Context {
  constructor(params) {
    this.attach = params.attach
    this.lastResponse = {}
    this.currentRequest = {}
    this.delivererSessionTokens = []
    this.delivererOfferMap = {}
    this.currentOffers = []
    this.currentProducts = []
    this.currentLocation = {
      latitude: '28.1867048',
      longitude: '-105.4600849',
    }
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

    if (request instanceof GetProductsRequest && this.lastResponse.success) {
      this.currentProducts = this.lastResponse.data
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

  setCurrentRequest(currentRequest) {
    this.currentRequest = currentRequest
  }
}

setWorldConstructor(Context)
