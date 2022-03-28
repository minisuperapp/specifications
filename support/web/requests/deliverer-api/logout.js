const ApiFunctionRequest = require('../$api_function_request')

class DelivererLogoutRequest extends ApiFunctionRequest {
  constructor(build) {
    super(build.deliverer)
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'deliverer/auth/logout'
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
