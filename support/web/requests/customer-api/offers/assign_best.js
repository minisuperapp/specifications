const Base = require('../$base')

class Request extends Base {
  constructor(build) {
    super()
    this.products = build.products
    this.quantity = build.quantity
    this.customerLocationLatitude = build.customerLocationLatitude
    this.customerLocationLongitude = build.customerLocationLongitude
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'offers/assign_best'
  }
  get payload() {
    return {
      products: this.products,
      location: {
        latitude: this.customerLocationLatitude,
        longitude: this.customerLocationLongitude,
      },
    }
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.products = []
        this.customerLocationLatitude = '28.1867348'
        this.customerLocationLongitude = '-105.4608849'
      }
      withProductCodeAndQuantity(code, quantity) {
        this.products.push({
          code,
          quantity,
        })
        return this
      }
      withProductCode(code) {
        this.withProductCodeAndQuantity(code, 1)
        return this
      }
      withCustomerLocationLatitude(customerLocationLatitude) {
        this.customerLocationLatitude = customerLocationLatitude
        return this
      }
      withCustomerLocationLongitude(customerLocationLongitude) {
        this.customerLocationLongitude = customerLocationLongitude
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
