const config = require('config')

class Base {
  constructor(deliverer) {
    if (!deliverer) {
      throw new Error('deliverer should not be null!')
    }
    this.uri = `${config.deliverer_api_host}/api`
    this.apiServer = 'deliverer-api'
    this.deliverer = deliverer
  }
}

module.exports = Base
