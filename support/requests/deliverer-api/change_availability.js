const Base = require('./$base')

class DelivererAvailabilityChangeRequest extends Base {
  constructor(build) {
    super(build.deliverer)
    this.available = build.available
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'change_availability'
  }
  get payload() {
    return {
      available: this.available
    }
  }
  static get Builder() {
    class Builder {
      constructor(deliverer) {
        this.deliverer = deliverer
        this.available = true
      }
      withAvailable(available) {
        this.available = available
        return this
      }
      build() {
        return new DelivererAvailabilityChangeRequest(this)
      }
    }
    return Builder
  }
}

module.exports = DelivererAvailabilityChangeRequest
