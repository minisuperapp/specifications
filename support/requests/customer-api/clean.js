const Base = require('./$base')

class CustomerApiCleanRequest extends Base {
  constructor(build) {
    super()
    this.phoneNumber = build.phoneNumber
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'clean'
  }
  get body() {
    return {
    }
  }
  static get Builder() {
    class Builder {
         constructor() {
         }
         build() {
            return new CustomerApiCleanRequest(this)
         }
      }
      return Builder
  }
}

module.exports = CustomerApiCleanRequest
