const Base = require('./$base')

class CustomerRegistrationRequest extends Base {
  constructor() {
    super()
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'register'
  }
  get payload() {
    return {}
  }
  static get Builder() {
    class Builder {
      constructor() {}
      build() {
        return new CustomerRegistrationRequest()
      }
    }
    return Builder
  }
}

module.exports = CustomerRegistrationRequest
