const Base = require('../$base')

class Request extends Base {
  constructor(build) {
    super(build.deliverer)
  }

  get method() {
    return 'POST'
  }

  get path() {
    return 'offers/get_from_a_deliverer'
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
