const Base = require('../$base')

class GetPreferencesRequest extends Base {
  constructor(build) {
    super(build.deliverer)
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'preferences'
  }
  get payload() {
    return {
    }
  }
  static get Builder() {
    class Builder {
      constructor(deliverer) {
        this.deliverer = deliverer
      }
      build() {
        return new GetPreferencesRequest(this)
      }
    }
    return Builder
  }
}

module.exports = GetPreferencesRequest
