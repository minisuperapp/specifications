const Base = require('./$base')

class GetProductsRequest extends Base {
  constructor(build) {
    super()
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'products'
  }
  get body() {
    return {}
  }
  static get Builder() {
    class Builder {
      constructor() {}
      withCustomerLocationLatitude(customerLocationLatitude) {
        this.customerLocationLatitude = customerLocationLatitude
        return this
      }
      withCustomerLocationLongitude(customerLocationLongitude) {
        this.customerLocationLongitude = customerLocationLongitude
        return this
      }
      build() {
        return new GetProductsRequest(this)
      }
    }
    return Builder
  }
}

module.exports = GetProductsRequest
