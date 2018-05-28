const { setWorldConstructor } = require('cucumber')
const apiRequester = require('support/apiRequester')

class Context {
  constructor(attach) {
    this.attach = attach
    this.lastResponse = {}
    this.currentRequest = {}
  }

  async send(request) {
    this.attach.attach(`${request.method} /${request.path}`)
    this.attach.attach(JSON.stringify(request.body), 'application/json')
    this.lastResponse = await apiRequester.send(request, this.sessionToken)
    this.attach.attach(JSON.stringify(this.lastResponse), 'application/json')

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
