class Base {
  constructor(deliverer) {
    if (!deliverer) {
      throw new Error('deliverer should not be null!')
    }
    this.uri = `${process.env.DELIVERER_API_URL || 'http://localhost:3001'}/api`
    this.apiServer = 'deliverer-api'
    this.deliverer = deliverer
  }
}

module.exports = Base
