const Base = require('./$base')

class PlaceOrderRequest extends Base {
  constructor(build) {
    super()
    this.offers = build.offers
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
      offers: this.offers,
      customer_location_id: this.customer_location_id,
    }
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.offers = {}
        this.quantity = '1'
        this.customer_location_id = null
      }
      withOffers(offers) {
        this.offers = offers
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
