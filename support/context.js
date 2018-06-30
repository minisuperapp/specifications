const { setWorldConstructor } = require('cucumber')
const apiRequester = require('support/api_requester')
const DelivererLoginRequest = require('./requests/deliverer-api/login')
const AddOfferRequest = require('./requests/deliverer-api/offer/add')
const ProductsRequest = require('./requests/customer-api/products')

class Context {
  constructor(params) {
    this.attach = params.attach
    this.lastResponse = {}
    this.currentRequest = {}
    this.delivererSessionTokens = []
    this.delivererOfferMap = {}
    this.currentOffers = []
    this.currentProducts = []
  }

  async send(request) {
    this.attach(`${request.method} /${request.path} (${request.apiServer})`)
    this.attach(
      `request
${JSON.stringify(request.body)}`,
      'text/plain',
    )

    this.lastResponse = await apiRequester.send(request, this.delivererSessionTokens[request.deliverer])

    if (request instanceof DelivererLoginRequest && this.lastResponse.success) {
      this.delivererSessionTokens[request.deliverer] = this.lastResponse.data.sessionToken
    }

    if (request instanceof AddOfferRequest && this.lastResponse.success) {
      this.delivererOfferMap[request.deliverer] = this.lastResponse.data.id
    }

    if (request instanceof ProductsRequest && this.lastResponse.success) {
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
