const ApiFunctionRequest = require('../../$api_function_request')

class OffersGroupedByProductRequest extends ApiFunctionRequest {
  constructor(build) {
    super()
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'customer/offer/search_for_all_products'
  }
  get payload() {
    return {}
  }
  static get Builder() {
    class Builder {
      build() {
        return new OffersGroupedByProductRequest(this)
      }
    }
    return Builder
  }
}

module.exports = OffersGroupedByProductRequest
