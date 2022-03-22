const config = require('config')

class ApiFunctionRequest {
  constructor() {
    this.uri = `${config.api_functions_host}`
    this.apiServer = 'api-functions'
  }
}

module.exports = ApiFunctionRequest
