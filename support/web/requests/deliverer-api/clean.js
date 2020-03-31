const Base = require('./$base')

class DelivererApiCleanRequest extends Base {
  constructor(build) {
    super(build.deliverer)
    this.phone_number = build.phone_number
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'clean'
  }
  get payload() {
    return {
    }
  }
  static get Builder() {
    class Builder {
         constructor() {
           this.deliverer = "D1"
         }
         build() {
            return new DelivererApiCleanRequest(this)
         }
      }
      return Builder
  }
}

module.exports = DelivererApiCleanRequest
