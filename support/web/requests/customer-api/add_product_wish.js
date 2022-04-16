const ApiFunctionRequest = require('../$api_function_request')

class CustomerAddProductWishRequest extends ApiFunctionRequest {
  constructor(build) {
    super()
    this.input = build
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'customer/product_wish/add'
  }
  get payload() {
    return this.input
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.description = null
        this.latitude = '28.1867348'
        this.longitude = '-105.4608849'
      }
      withDescription(description) {
        this.description = description
        return this
      }
      build() {
        return new CustomerAddProductWishRequest(this)
      }
    }
    return Builder
  }
}

module.exports = CustomerAddProductWishRequest
