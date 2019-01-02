const Base = require('../$base')

class Request extends Base {
  constructor(build) {
    super()
    this.customerCode = build.customerCode
  }

  get method() {
    return 'POST'
  }
  get path() {
    return 'orders/list_pending_to_deliver'
  }
  get payload() {
    return {
      customerCode: this.customerCode
    }
  }
  static get Builder() {
    class Builder {
      constructor(customerCode) {
        this.customerCode = customerCode
      }
      withCustomerCode(customerCode) {
        this.customerCode = customerCode
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
