const Base = require('./$base')

class DelivererLogoutRequest extends Base {
  constructor(build) {
    super(build.deliverer)
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'logout'
  }
  get payload() {
    return {}
  }
  static get Builder() {
    class Builder {
      constructor(deliverer) {
        this.deliverer = deliverer
      }
      build() {
        return new DelivererLogoutRequest(this)
      }
    }
    return Builder
  }
}

module.exports = DelivererLogoutRequest
