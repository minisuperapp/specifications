const Base = require('./$base')

class DelivererLoginRequest extends Base {
  constructor(build) {
    super(build.deliverer)
    this.phoneNumber = build.phoneNumber
    this.password = build.password
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'login'
  }
  get body() {
    return {
      phoneNumber: this.phoneNumber,
      password: this.password,
    }
  }
  static get Builder() {
    class Builder {
      constructor(deliverer) {
        this.phoneNumber = ''
        this.password = ''
        this.deliverer = deliverer
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
        return new DelivererLoginRequest(this)
      }
    }
    return Builder
  }
}

module.exports = DelivererLoginRequest
