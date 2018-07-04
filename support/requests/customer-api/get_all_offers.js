const Base = require('./$base')

class GetAllOffersRequest extends Base {
  constructor(build) {
    super()
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
      customerLocation: {
        latitude: this.customerLocationLatitude,
        longitude: this.customerLocationLongitude,
      },
    }
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.customerLocationLatitude = '28.1867048'
        this.customerLocationLongitude = '-105.4600849'
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
        return new GetAllOffersRequest(this)
      }
    }
    return Builder
  }
}

module.exports = GetAllOffersRequest
