const Base = require('../$base')
const config = require('config')

class OffersGroupedByProductRequest extends Base {
  constructor(build) {
    super()
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'offers/search_for_all_products'
  }
  get payload() {
    return {}
  }
  static get Builder() {
    class Builder {
      build() {
        return new OffersGroupedByProductRequest(this)
      }
    }
    return Builder
  }
}

module.exports = OffersGroupedByProductRequest
