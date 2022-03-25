const config = require('config')

class ApiFunctionRequest {
  constructor(deliverer) {
    if (!deliverer) {
      throw new Error('deliverer should not be null!')
    }
    this.uri = `${config.api_functions_host}`
    this.apiServer = 'api-functions'
    this.deliverer = deliverer
  }
}

module.exports = ApiFunctionRequest
