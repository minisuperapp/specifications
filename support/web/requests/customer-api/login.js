const Base = require('./$base')

class CustomerLoginRequest extends Base {
  constructor(build) {
    super()
    this.email = build.email
    this.password = build.password
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'login'
  }
  get payload() {
    return {
      email: this.email,
      password: this.password
    }
  }
  static get Builder() {
    class Builder {
         constructor() {
           this.email = ''
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
            return new CustomerLoginRequest(this)
         }
      }
      return Builder
  }
}

module.exports = CustomerLoginRequest
