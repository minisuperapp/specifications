const Base = require('./$base')

class CustomerLoginRequest extends Base {
  constructor(build) {
    super()
    this.phone_number = build.phone_number
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'login'
  }
  get payload() {
    return {
      phone_number: this.phone_number
    }
  }
  static get Builder() {
    class Builder {
         constructor() {
           this.phone_number = ''
         }
         withPhoneNumber(phone_number) {
            this.phone_number = phone_number
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
