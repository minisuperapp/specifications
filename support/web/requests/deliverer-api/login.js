const Base = require('./$base')

class DelivererLoginRequest extends Base {
  constructor(build) {
    super(build.deliverer)
    this.phone_number = build.phone_number
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
      phone_number: this.phone_number,
      password: this.password,
    }
  }
  static get Builder() {
    class Builder {
      constructor(deliverer) {
        this.phone_number = ''
        this.password = ''
        this.deliverer = deliverer
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
        return new DelivererLoginRequest(this)
      }
    }
    return Builder
  }
}

module.exports = DelivererLoginRequest
