const Base = require('./$base')

class CustomerRegistrationRequest extends Base {
  constructor(build) {
    super()
    this.phoneNumber = build.phoneNumber
    this.password = build.password
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'register'
  }
  get body() {
    return {
      phoneNumber: this.phoneNumber,
      password: this.password
    }
  }
  static get Builder() {
    class Builder {
         constructor() {
           this.phoneNumber = ''
           this.password = ''
         }
         withPhoneNumber(phoneNumber) {
            this.phoneNumber = phoneNumber
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
