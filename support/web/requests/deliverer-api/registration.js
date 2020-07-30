const Base = require('./$base')

class CustomerRegistrationRequest extends Base {
  constructor(build) {
    super('D1')
    this.name = build.name
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
      name: this.name,
      email: this.email,
      password: this.password
    }
  }
  static get Builder() {
    class Builder {
         constructor() {
           this.name = ''
           this.email = ''
           this.password = ''
         }
         withName(name) {
            this.name = name
            return this
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
