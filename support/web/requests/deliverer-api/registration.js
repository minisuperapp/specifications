const ApiFunctionRequest = require('../$api_function_request')

class DelivererRegistrationRequest extends ApiFunctionRequest {
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
    return 'deliverer/auth/register'
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
           this.name = 'D1'
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
            return new DelivererRegistrationRequest(this)
         }
      }
      return Builder
  }
}

module.exports = DelivererRegistrationRequest
