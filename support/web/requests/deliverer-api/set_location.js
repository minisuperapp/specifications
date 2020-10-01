const Base = require('./$base')

class CustomerSetLocationRequest extends Base {
  constructor(build) {
    super(build.deliverer)
    this.input = build
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'location/set_location'
  }
  get payload() {
    return this.input
  }
  static get Builder() {
    class Builder {
      constructor(deliverer) {
        this.deliverer = deliverer
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
