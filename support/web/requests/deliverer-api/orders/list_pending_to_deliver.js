const ApiFunctionRequest = require('../../$api_function_request')

class Request extends ApiFunctionRequest {
  constructor(build) {
    super(build.deliverer)
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'deliverer/order/list_pending_to_deliver'
  }
  get payload() {
    return {}
  }
  static get Builder() {
    class Builder {
      constructor(deliverer) {
        this.deliverer = deliverer
      }
      build() {
        return new Request(this)
      }
    }
    return Builder
  }
}

module.exports = Request
