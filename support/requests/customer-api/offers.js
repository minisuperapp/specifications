const Base = require('./$base')

class OffersRequest extends Base {
  constructor(build) {
    super()
    this.productId = build.productId
    this.customerLocationLatitude = build.customerLocationLatitude
    this.customerLocationLongitude = build.customerLocationLongitude
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'offers'
  }
  get body() {
    return {
      productId: this.productId,
      quantity: '2',
      customerLocation: {
        latitude: this.customerLocationLatitude,
        longitude: this.customerLocationLongitude,
      },
    }
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.productId = '1'
        this.customerLocationLatitude = '28.1867048'
        this.customerLocationLongitude = '-105.4600849'
      }
      withProductId(productId) {
        this.productId = productId
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
        return new OffersRequest(this)
      }
    }
    return Builder
  }
}

module.exports = OffersRequest
