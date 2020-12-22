const config = require('config')

class Base {
  constructor(deliverer) {
    if (!deliverer) {
      throw new Error('deliverer should not be null!')
    }
    this.uri = `${config.sam_api_host}`
    this.apiServer = 'sam-api'
    this.deliverer = deliverer
  }
}

module.exports = Base
