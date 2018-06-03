const Base = require('./$base')

class DeliverersRequest extends Base {
  constructor(build) {
    super()
    this.productId = build.productId
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'offers'
  }
  get body() {
    return {
      productId: this.productId,
      quantity: '2',
      deliveryPoint: {
        latitude: '27.670799',
        longitude: '105.1599679,16',
      },
    }
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.productId = '1'
      }
      withProductId(productId) {
        this.productId = productId
        return this
      }
      build() {
        return new DeliverersRequest(this)
      }
    }
    return Builder
  }
}

module.exports = DeliverersRequest
