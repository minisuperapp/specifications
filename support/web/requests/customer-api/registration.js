const Base = require('./$base')

class CustomerRegistrationRequest extends Base {
  constructor(build) {
    super()
    this.email = build.email
    this.password = build.password
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'register'
  }
  get payload() {
    return {
      email: this.email,
      password: this.password,
    }
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.email = ''
        this.password = ''
      }
      withEmail(email) {
        this.email = email
        return this
      }
      withPassword(password) {
        this.password = password
        return this
      }
      build() {
        return new CustomerRegistrationRequest(this)
      }
    }
    return Builder
  }
}

module.exports = CustomerRegistrationRequest
