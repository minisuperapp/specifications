const ApiFunctionRequest = require('../../$api_function_request')

class GetPreferencesRequest extends ApiFunctionRequest {
  constructor(build) {
    super(build.deliverer)
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'deliverer/preferences/get'
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
