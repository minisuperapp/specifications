const { setWorldConstructor } = require('cucumber')
const apiRequester = require('support/api_requester')
const DelivererLoginRequest = require('./requests/deliverer-api/login')

class Context {
  constructor(params) {
    this.attach = params.attach
    this.lastResponse = {}
    this.currentRequest = {}
    this.delivererSessionTokens = []
  }

  async send(request) {
    this.attach(`${request.method} /${request.path}`)
    this.attach(
      `request
${JSON.stringify(request.body)}`,
      'text/plain',
    )

    this.lastResponse = await apiRequester.send(request, this.delivererSessionTokens[request.deliverer])

    if (request instanceof DelivererLoginRequest) {
      this.delivererSessionTokens[request.deliverer] = this.lastResponse.data.sessionToken
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
