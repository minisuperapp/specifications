class Base {
  constructor(build) {
    this.uri = `${process.env.DELIVERER_API_URL || 'http://localhost:3001'}/api`
  }
}

module.exports = Base
