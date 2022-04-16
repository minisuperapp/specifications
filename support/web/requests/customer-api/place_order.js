const ApiFunctionRequest = require('../$api_function_request')

class PlaceOrderRequest extends ApiFunctionRequest {
  constructor(build) {
    super()
    this.offers = build.offers
    this.quantity = build.quantity
    this.customer_address_id = build.customer_address_id
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'customer/order/place'
  }
  get payload() {
    return {
      offers: this.offers,
      customer_address_id: this.customer_address_id,
    }
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.offers = {}
        this.quantity = '1'
        this.customer_address_id = null
      }
      withOffers(offers) {
        this.offers = offers
        return this
      }
      withCustomerAddressId(customer_address_id) {
        this.customer_address_id = customer_address_id
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
