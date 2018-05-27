const { setWorldConstructor } = require('cucumber')
const apiRequester = require('support/apiRequester')

class Context {
  constructor() {
    this.lastResponse = {}
    this.currentRequest = {}
  }

  async send(request) {
    this.lastResponse = await apiRequester.send(request, this.sessionToken)
    console.log(this.lastResponse)
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
