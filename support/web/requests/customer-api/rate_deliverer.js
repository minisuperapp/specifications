const Base = require('./$base')

class Request extends Base {
  constructor(build) {
    super()
    this.delivererId = build.delivererId
    this.orderId = build.orderId
    this.concept = build.concept
    this.rating = build.rating
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'rate_deliverer'
  }
  get payload() {
    return {
      delivererId: this.delivererId,
      orderId: this.orderId,
      concept: this.concept,
      rating: this.rating,
    }
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.delivererId = ''
        this.orderId = ''
        this.concept = ''
        this.rating = ''
      }
      withDelivererId(delivererId) {
        this.delivererId = delivererId
        return this
      }
      withOrderId(orderId) {
        this.orderId = orderId
        return this
      }
      withConcept(concept) {
        this.concept = concept
        return this
      }
      withRating(rating) {
        this.rating = rating
        return this
      }
      build() {
        return new Request(this)
      }
    }
    return Builder
  }
}

module.exports = Request
