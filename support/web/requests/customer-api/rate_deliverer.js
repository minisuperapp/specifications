const Base = require('./$base')

class Request extends Base {
  constructor(build) {
    super()
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'rate_deliverer'
  }
  get payload() {
    return {

    }
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.delivererId = ''
      }
      withDelivererId(delivererId) {
        this.delivererId = delivererId
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
