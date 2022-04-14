const ApiFunctionRequest = require('../../$api_function_request')

class Request extends ApiFunctionRequest {
  constructor(build) {
    super()
    this.product_code = build.product_code
    this.quantity = build.quantity
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'customer/offer/search_for_one_product'
  }
  get payload() {
    return {
      product_code: this.product_code,
      quantity: this.quantity,
    }
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.product_code = 'tortillas_de_maiz'
        this.quantity = '1'
      }
      withProductCode(product_code) {
        this.product_code = product_code
        return this
      }
      withQuantity(quantity) {
        this.quantity = quantity
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
