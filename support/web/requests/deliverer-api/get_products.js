const Base = require('./$base')

class GetProductsRequest extends Base {
  constructor(build) {
    super(build.deliverer)
    this.customerLocationLatitude = build.customerLocationLatitude
    this.customerLocationLongitude = build.customerLocationLongitude
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'products'
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
        return new GetProductsRequest(this)
      }
    }
    return Builder
  }
}

module.exports = GetProductsRequest
