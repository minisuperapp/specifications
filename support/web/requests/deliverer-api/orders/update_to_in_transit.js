const Base = require('../$base')

class Request extends Base {
  constructor(build) {
    super(build.deliverer)
    this.order_id = build.order_id
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'orders/update_to_in_transit'
  }
  get payload() {
    return {
      order_id: this.order_id
    }
  }
  static get Builder() {
    class Builder {
      constructor(deliverer) {
        this.deliverer = deliverer
        this.order_id = ''
      }
      withOrderId(order_id) {
        this.order_id = order_id
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
