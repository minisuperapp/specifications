const ApiFunctionRequest = require('../$api_function_request')

class CustomerSetLocationRequest extends ApiFunctionRequest {
  constructor(build) {
    super()
    this.input = build
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'customer/location/set_location'
  }
  get payload() {
    return this.input
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.latitude = ''
        this.longitude = ''
        this.zoom = 10
      }
      withLatitude(latitude) {
        this.latitude = latitude
        return this
      }
      withLongitude(longitude) {
        this.longitude = longitude
        return this
      }
      build() {
        return new CustomerSetLocationRequest(this)
      }
    }
    return Builder
  }
}

module.exports = CustomerSetLocationRequest
