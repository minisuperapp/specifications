const { setWorldConstructor } = require('cucumber')
const apiRequester = require('support/apiRequester')

class Context {
  constructor(params) {
    this.attach = params.attach
    this.lastResponse = {}
    this.currentRequest = {}
  }

  async send(request) {
    this.attach(`${request.method} /${request.path}`)
    this.attach(`request
${JSON.stringify(request.body)}`, 'text/plain')

    this.lastResponse = await apiRequester.send(request, this.sessionToken)

    this.attach(`response
${JSON.stringify(this.lastResponse)}`, 'text/plain')

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
