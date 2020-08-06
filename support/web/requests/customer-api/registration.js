const Base = require('./$base')

class CustomerGetProfileRequest extends Base {
  constructor() {
    super()
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'get_profile'
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
