const Base = require('../$base')

class ChangePreferencesRequest extends Base {
  constructor(build) {
    super(build.deliverer)
    this.changes = build.changes
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'change_preferences'
  }
  get payload() {
    return this.changes
  }
  static get Builder() {
    class Builder {
      constructor(deliverer) {
        this.deliverer = deliverer
        this.changes = []
      }
      withChange(change) {
        this.changes.push(change)
        return this
      }
      build() {
        return new ChangePreferencesRequest(this)
      }
    }
    return Builder
  }
}

module.exports = ChangePreferencesRequest
