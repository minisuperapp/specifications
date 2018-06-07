class Base {
  constructor(deliverer) {
    this.uri = `${process.env.DELIVERER_API_URL || 'http://localhost:3001'}/api`
    this.deliverer = deliverer
  }
}

module.exports = Base
