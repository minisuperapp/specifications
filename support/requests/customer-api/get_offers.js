const Base = require('./$base')

class GetOffersRequest extends Base {
  constructor(build) {
    super()
    this.productCode = build.productCode
    this.quantity = build.quantity
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
      productCode: this.productCode,
      quantity: this.quantity,
      customerLocation: {
        latitude: this.customerLocationLatitude,
        longitude: this.customerLocationLongitude,
      },
    }
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.productCode = 'CORN_TORTILLA'
        this.quantity = '1'
        this.customerLocationLatitude = '28.1867048'
        this.customerLocationLongitude = '-105.4600849'
      }
      withProductCode(productCode) {
        this.productCode = productCode
        return this
      }
      withQuantity(quantity) {
        this.quantity = quantity
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
        return new GetOffersRequest(this)
      }
    }
    return Builder
  }
}

module.exports = GetOffersRequest
