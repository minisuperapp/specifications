const Base = require('./$base')

class DelivererSetPostalAreaRequest extends Base {
  constructor(build) {
    super(build.deliverer)
    this.input = build
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'location/set_postal_area'
  }
  get payload() {
    return this.input
  }
  static get Builder() {
    class Builder {
      constructor(deliverer) {
        this.deliverer = deliverer
        this.postal_area_code = ''
        this.postal_area_name = ''
        this.postal_area_county = ''
        this.postal_area_state = ''
      }
      withPostalAreaCode(postal_area_code) {
        this.postal_area_code = postal_area_code
        return this
      }
      withPostalAreaName(postal_area_name) {
        this.postal_area_name = postal_area_name
        return this
      }
      withPostalAreaCounty(postal_area_county) {
        this.postal_area_county = postal_area_county
        return this
      }
      withPostalAreaState(postal_area_state) {
        this.postal_area_state = postal_area_state
        return this
      }
      build() {
        return new DelivererSetPostalAreaRequest(this)
      }
    }
    return Builder
  }
}

module.exports = DelivererSetPostalAreaRequest
