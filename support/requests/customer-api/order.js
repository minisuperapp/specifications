const Base = require('./$base')

class OrderRequest extends Base {
  constructor(build) {
    super()
    this.offerId = build.offerId
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'order'
  }
  get payload() {
    return {
        "offerId": this.offerId,
        "quantity": "2",
      	"deliveryPoint": {
      		"latitude": "27.670799",
      		"longitude": "105.1599679"
      	}
    }
  }
  static get Builder() {
    class Builder {
         constructor() {
           this.offerId = ''
         }
         withOfferId(offerId) {
           this.offerId = offerId
           return this
         }
         build() {
            return new OrderRequest(this)
         }
      }
      return Builder
  }
}

module.exports = OrderRequest
