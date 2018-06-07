const Base = require('./$base')

class CustomerRegistrationRequest extends Base {
  constructor(build) {
    super()
    this.name = build.name
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
      name: this.name,
      phoneNumber: this.phoneNumber,
      password: this.password
    }
  }
  static get Builder() {
    class Builder {
         constructor() {
           this.name = ''
           this.phoneNumber = ''
           this.password = ''
         }
         withName(name) {
            this.name = name
            return this
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
