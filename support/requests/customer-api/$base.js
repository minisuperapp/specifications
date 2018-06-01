class Base {
  constructor(build) {
    this.uri = `${process.env.CUSTOMER_API_URL || 'http://localhost:3000'}/api`
  }
}

module.exports = Base
