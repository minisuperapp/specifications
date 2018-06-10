const Base = require('../$base')

class AddOfferRequest extends Base {
  constructor(build) {
    super(build.deliverer)
    this.productId = build.productId
    this.locationLatitude = build.locationLatitude
    this.locationLongitude = build.locationLongitude
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
      location: {
        latitude: this.locationLatitude,
        longitude: this.locationLongitude,
      },
    }
  }
  static get Builder() {
    class Builder {
      constructor(deliverer) {
        this.deliverer = deliverer
        this.productId = '1'
        this.locationLatitude = '28.1867348'
        this.locationLongitude = '-105.4608849'
        this.deliveryRadius = '1'
      }
      withProductId(productId) {
        this.productId = productId
        return this
      }
      withDelivererLocationLatitude(locationLatitude) {
        this.locationLatitude = locationLatitude
        return this
      }
      withDelivererLocationLongitude(locationLongitude) {
        this.locationLongitude = locationLongitude
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
