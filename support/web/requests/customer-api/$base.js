const config = require('config')

class Base {
  constructor() {
    this.uri = `${config.customer_api_host}/api`
    this.apiServer = 'customer-api'
  }
}

module.exports = Base
