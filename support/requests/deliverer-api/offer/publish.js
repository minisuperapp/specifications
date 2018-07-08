const Base = require('../$base')

class PublishOfferRequest extends Base {
  constructor(build) {
    super(build.deliverer)
    this.productCode = build.productCode
    this.locationLatitude = build.locationLatitude
    this.locationLongitude = build.locationLongitude
    this.deliveryRadius = build.deliveryRadius
    this.availableQuantity = build.availableQuantity
    this.unitPrice = build.unitPrice
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'offer/publish'
  }
  get body() {
    return {
      productCode: this.productCode,
      availableQuantity: this.availableQuantity,
      onHandQuantity: '10',
      unitPrice: this.unitPrice,
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
        this.productCode = 'CORN_TORTILLA'
        this.availableQuantity = '8'
        this.locationLatitude = '28.1867348'
        this.locationLongitude = '-105.4608849'
        this.deliveryRadius = '1'
        this.unitPrice = '18.00'
      }
      withProductCode(productCode) {
        this.productCode = productCode
        return this
      }
      withAvailableQuantity(availableQuantity) {
        this.availableQuantity = availableQuantity
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
      withUnitPrice(unitPrice) {
        this.unitPrice = unitPrice
        return this
      }
      build() {
        return new PublishOfferRequest(this)
      }
    }
    return Builder
  }
}

module.exports = PublishOfferRequest
