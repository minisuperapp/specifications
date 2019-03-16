const Base = require('../$base')

class DeleteOfferRequest extends Base {
  constructor(build) {
    super(build.deliverer)
    this.offerId = build.offerId
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'offer/delete'
  }
  get payload() {
    return {
      offerId: this.offerId,
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
        return new DeleteOfferRequest(this)
      }
    }
    return Builder
  }
}

module.exports = DeleteOfferRequest
