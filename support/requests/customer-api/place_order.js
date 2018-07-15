const Base = require('./$base')

class OrderRequest extends Base {
  constructor(build) {
    super()
    this.offerId = build.offerId
    this.quantity = build.quantity
    this.customerLocationLatitude = build.customerLocationLatitude
    this.customerLocationLongitude = build.customerLocationLongitude
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'order/place'
  }
  get payload() {
    return {
      offerId: this.offerId,
      quantity: this.quantity,
      customerLocation: {
        latitude: '27.670799',
        longitude: '105.1599679',
      },
    }
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.offerId = ''
        this.quantity = '0'
        this.customerLocationLatitude = '27.670799'
        this.customerLocationLongitude = '105.1599679'
      }
      withOfferId(offerId) {
        this.offerId = offerId
        return this
      }
      withQuantity(quantity) {
        this.quantity = quantity
        return this
      }
      withCustomerLocationLatitude(latitude) {
        this.customerLocationLatitude = latitude
        return this
      }
      withCustomerLocationLongitude(longitude) {
        this.customerLocationLongitude = longitude
        return this
      }
      build() {
        return new OrderRequest(this)
      }
    }
    return Builder
  }
}

module.exports = OrderRequest
