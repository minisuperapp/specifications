const Base = require('../$base')

class Request extends Base {
  constructor(build) {
    super(build.deliverer)
    this.offerId = build.offerId
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'orders/update_to_in_transit'
  }
  get payload() {
    return {
      offerId: this.offerId
    }
  }
  static get Builder() {
    class Builder {
      constructor(deliverer) {
        this.deliverer = deliverer
        this.offerId = ''
      }
      withOfferId(offerId) {
        this.offerId = offerId
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
