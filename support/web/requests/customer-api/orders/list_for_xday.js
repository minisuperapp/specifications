const ApiFunctionRequest = require('../../$api_function_request')

class Request extends ApiFunctionRequest {
  constructor(build) {
    super()
    this.xday = build.xday
  }

  get method() {
    return 'POST'
  }
  get path() {
    return 'customer/order/list_for_xday'
  }
  get payload() {
    return {
      xday: this.xday,
    }
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.xday = 0
      }
      withXday(xday) {
        this.xday = xday
        return this
      }
      build() {
        return new Request(this)
      }
    }
    return Builder
  }
}

module.exports = Request
