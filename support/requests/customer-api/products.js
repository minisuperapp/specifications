const Base = require('./$base')

class ProductsRequest extends Base {
  constructor(build) {
    super()
    this.customerLocationLatitude = build.customerLocationLatitude
    this.customerLocationLongitude = build.customerLocationLongitude
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'products'
  }
  get body() {
    return {
      customerLocation: {
        latitude: this.customerLocationLatitude,
        longitude: this.customerLocationLongitude,
      },
    }
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.customerLocationLatitude = '28.1867048'
        this.customerLocationLongitude = '-105.4600849'
      }
      build() {
        return new ProductsRequest(this)
      }
    }
    return Builder
  }
}

module.exports = ProductsRequest
