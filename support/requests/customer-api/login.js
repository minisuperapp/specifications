const Base = require('./$base')

class CustomerLoginRequest extends Base {
  constructor(build) {
    super()
    this.phoneNumber = build.phoneNumber
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'login'
  }
  get body() {
    return {
      phoneNumber: this.phoneNumber
    }
  }
  static get Builder() {
    class Builder {
         constructor() {
           this.phoneNumber = ''
         }
         withPhoneNumber(phoneNumber) {
            this.phoneNumber = phoneNumber
            return this
         }
         build() {
            return new CustomerLoginRequest(this)
         }
      }
      return Builder
  }
}

module.exports = CustomerLoginRequest
