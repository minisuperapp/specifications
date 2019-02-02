const Base = require('../$base')
const config = require('config')

class OffersGroupedByProductRequest extends Base {
  constructor(build) {
    super()
    this.customerLocationLatitude = build.customerLocationLatitude
    this.customerLocationLongitude = build.customerLocationLongitude
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'offers/search_for_all_products'
  }
  get payload() {
    return {
      customerLocation: {
        latitude: this.customerLocationLatitude,
        longitude: this.customerLocationLongitude,
      },
    }
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.customerLocationLatitude = config.mocks.customerLocation.latitude
        this.customerLocationLongitude = config.mocks.customerLocation.longitude
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
        return new OffersGroupedByProductRequest(this)
      }
    }
    return Builder
  }
}

module.exports = OffersGroupedByProductRequest
