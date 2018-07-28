const Base = require('../$base')

class Request extends Base {
  constructor(build) {
    super(build.deliverer)
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'orders/list_pending_to_deliver'
  }
  get payload() {
    return {}
  }
  static get Builder() {
    class Builder {
      constructor(deliverer) {
        this.deliverer = deliverer
      }
      build() {
        return new Request(this)
      }
    }
    return Builder
  }
}

module.exports = Request
