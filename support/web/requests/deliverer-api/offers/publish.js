const Base = require('../$base')

class PublishOfferRequest extends Base {
  constructor(build) {
    super(build.deliverer)
    this.product_code = build.product_code
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
  get payload() {
    return {
      product_code: this.product_code,
      availableQuantity: this.availableQuantity,
      onHandQuantity: '10',
      unitPrice: this.unitPrice,
    }
  }
  static get Builder() {
    class Builder {
      constructor(deliverer) {
        this.deliverer = deliverer
        this.product_code = 'tortillas_de_maiz'
        this.availableQuantity = '8'
        this.unitPrice = '18.00'
      }
      withProductCode(product_code) {
        this.product_code = product_code
        return this
      }
      withAvailableQuantity(availableQuantity) {
        this.availableQuantity = availableQuantity
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
