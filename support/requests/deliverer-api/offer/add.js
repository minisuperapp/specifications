const Base = require('../$base')

class AddOfferRequest extends Base {
  constructor(build) {
    super(build.deliverer)
    this.productId = build.productId
    this.delivererLocationLatitude = build.delivererLocationLatitude
    this.delivererLocationLongitude = build.delivererLocationLongitude
    this.deliveryRadius = build.deliveryRadius
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'offer/add'
  }
  get body() {
    return {
      productId: this.productId,
      availableQuantity: '8',
      onHandQuantity: '10',
      unitPrice: '18',
      deliveryRadius: this.deliveryRadius,
      delivererLocation: {
        latitude: this.delivererLocationLatitude,
        longitude: this.delivererLocationLongitude,
      },
    }
  }
  static get Builder() {
    class Builder {
      constructor(deliverer) {
        this.deliverer = deliverer
        this.productId = '1'
        this.delivererLocationLatitude = '28.1867348'
        this.delivererLocationLongitude = '-105.4608849'
        this.deliveryRadius = '1'
      }
      withProductId(productId) {
        this.productId = productId
        return this
      }
      withDelivererLocationLatitude(delivererLocationLatitude) {
        this.delivererLocationLatitude = delivererLocationLatitude
        return this
      }
      withDelivererLocationLongitude(delivererLocationLongitude) {
        this.delivererLocationLongitude = delivererLocationLongitude
        return this
      }
      withDeliveryRadius(deliveryRadius) {
        this.deliveryRadius = deliveryRadius
        return this
      }
      build() {
        return new AddOfferRequest(this)
      }
    }
    return Builder
  }
}

module.exports = AddOfferRequest
