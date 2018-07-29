const Base = require('../$base')

class Request extends Base {
  constructor(build) {
    super(build.deliverer)
    this.orderId = build.orderId
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'orders/update_to_in_transit'
  }
  get payload() {
    return {
      orderId: this.orderId
    }
  }
  static get Builder() {
    class Builder {
      constructor(deliverer) {
        this.deliverer = deliverer
        this.orderId = ''
      }
      withOrderId(orderId) {
        this.orderId = orderId
        return this
      }
      build() {
        return new Request(this)
      }
    }
    return Builder
  }
}

module.exports = Request
