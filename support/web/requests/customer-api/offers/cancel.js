const Base = require('../$base')

class Request extends Base {
  constructor(build) {
    super()
    this.offerId = build.offerId
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'offers/cancel'
  }
  get payload() {
    return {
      offerId: this.offerId,
    }
  }
  static get Builder() {
    class Builder {
      constructor() {
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
