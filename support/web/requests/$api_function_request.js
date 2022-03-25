const config = require('config')

class ApiFunctionRequest {
  constructor(deliverer) {
    this.uri = `${config.api_functions_host}`
    this.apiServer = 'api-functions'
    this.deliverer = deliverer
  }
}

module.exports = ApiFunctionRequest
