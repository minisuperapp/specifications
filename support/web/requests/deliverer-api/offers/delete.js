const ApiFunctionRequest = require('../../$api_function_request')

class DeleteOfferRequest extends ApiFunctionRequest {
  constructor(build) {
    super(build.deliverer)
    this.offerId = build.offerId
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'deliverer/offer/delete'
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
