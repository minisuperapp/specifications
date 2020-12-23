const Base = require('./$base')

class DelivererLoginRequest extends Base {
  constructor(build) {
    super(build.deliverer)
    this.email = build.email
    this.password = build.password
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'deliverer/auth/login'
  }
  get payload() {
    return {
      email: this.email,
      password: this.password,
    }
  }
  static get Builder() {
    class Builder {
      constructor(deliverer) {
        this.email = ''
        this.password = ''
        this.deliverer = deliverer
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
        return new DelivererLoginRequest(this)
      }
    }
    return Builder
  }
}

module.exports = DelivererLoginRequest
