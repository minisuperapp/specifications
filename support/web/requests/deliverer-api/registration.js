const Base = require('./$base')

class CustomerRegistrationRequest extends Base {
  constructor(build) {
    super('D1')
    this.name = build.name
    this.phone_number = build.phone_number
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
      name: this.name,
      phone_number: this.phone_number,
      password: this.password
    }
  }
  static get Builder() {
    class Builder {
         constructor() {
           this.name = ''
           this.phone_number = ''
           this.password = ''
         }
         withName(name) {
            this.name = name
            return this
         }
         withPhoneNumber(phone_number) {
            this.phone_number = phone_number
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
