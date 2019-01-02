const Base = require('../$base')

class Request extends Base {
  constructor(build) {
    super()
  }

  get method() {
    return 'POST'
  }
  get path() {
    return 'orders/list_pending_to_deliver'
  }
  get payload() {
    return { }
  }
  static get Builder() {
    class Builder {
      constructor(customerCode) {
      }
      build() {
        return new Request(this)
      }
    }
    return Builder
  }
}

module.exports = Request
