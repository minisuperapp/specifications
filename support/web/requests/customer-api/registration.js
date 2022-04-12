const ApiFunctionRequest = require('../$api_function_request')

class CustomerGetProfileRequest extends ApiFunctionRequest {
  constructor() {
    super()
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'customer/auth/get_profile'
  }
  get payload() {
    return {}
  }
  static get Builder() {
    class Builder {
      constructor() {}
      build() {
        return new CustomerGetProfileRequest()
      }
    }
    return Builder
  }
}

module.exports = CustomerGetProfileRequest
