class CustomerRegistrationRequest {
  constructor(build) {
    this.phoneNumber = build.phoneNumber
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'register'
  }
  get body() {
    return {
      phone: this.phoneNumber
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
            return new CustomerRegistrationRequest(this)
         }
      }
      return Builder
  }
}

module.exports = CustomerRegistrationRequest
