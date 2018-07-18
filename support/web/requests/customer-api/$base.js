class Base {
  constructor(build) {
    this.uri = `${process.env.CUSTOMER_API_URL || 'http://localhost:3000'}/api`
    this.apiServer = 'customer-api'
  }
}

module.exports = Base
