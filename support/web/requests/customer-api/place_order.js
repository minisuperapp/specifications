const Base = require('./$base')

class PlaceOrderRequest extends Base {
  constructor(build) {
    super()
    this.offerId = build.offerId
    this.quantity = build.quantity
    this.customer_location_id = build.customer_location_id
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'order/place'
  }
  get payload() {
    return {
      offerId: this.offerId,
      quantity: this.quantity,
      customer_location_id: this.customer_location_id,
    }
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.offerId = ''
        this.quantity = '1'
        this.customer_location_id = null
      }
      withOfferId(offerId) {
        this.offerId = offerId
        return this
      }
      withQuantity(quantity) {
        this.quantity = quantity
        return this
      }
      withCustomerLocationId(customer_location_id) {
        this.customer_location_id = customer_location_id
        return this
      }
      build() {
        return new PlaceOrderRequest(this)
      }
    }
    return Builder
  }
}

module.exports = PlaceOrderRequest
