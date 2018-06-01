const Base = require('./$base')

class OrderRequest extends Base {
  constructor(build) {
    super()
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'order'
  }
  get body() {
    return {
        "productId": "2",
        "quantity": "2",
      	"deliveryPoint": {
      		"latitude": "27.670799",
      		"longitude": "105.1599679,16"
      	}
    }
  }
  static get Builder() {
    class Builder {
         constructor() {

         }
         build() {
            return new OrderRequest(this)
         }
      }
      return Builder
  }
}

module.exports = OrderRequest
