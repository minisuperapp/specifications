const ApiFunctionRequest = require('../$api_function_request')

class GetProductsRequest extends ApiFunctionRequest {
  constructor(build) {
    super()
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'customer/product/get_all'
  }
  get payload() {
    return {}
  }
  static get Builder() {
    class Builder {
      constructor() {}
      build() {
        return new GetProductsRequest(this)
      }
    }
    return Builder
  }
}

module.exports = GetProductsRequest
