const Base = require('./$base')

class Request extends Base {
  constructor(build) {
    super()
    this.deliverer_id = build.deliverer_id
    this.order_id = build.order_id
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
      deliverer_id: this.deliverer_id,
      order_id: this.order_id,
      concept: this.concept,
      rating: this.rating,
    }
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.deliverer_id = ''
        this.order_id = ''
        this.concept = ''
        this.rating = ''
      }
      withDelivererId(deliverer_id) {
        this.deliverer_id = deliverer_id
        return this
      }
      withOrderId(order_id) {
        this.order_id = order_id
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
