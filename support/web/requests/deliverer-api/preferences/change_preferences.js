const ApiFunctionRequest = require('../../$api_function_request')

class ChangePreferencesRequest extends ApiFunctionRequest {
  constructor(build) {
    super(build.deliverer)
    this.changes = build.changes
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'deliverer/preferences/change'
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
