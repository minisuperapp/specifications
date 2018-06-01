const Base = require('../$base')

class AddOfferRequest extends Base {
  constructor(build) {
    super()
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'offer/add'
  }
  get body() {
    return {
        "productId": "1",
        "availableQuantity": "8",
        "onHandQuantity": "10",
        "unitPrice": "18",
      	"delivererLocation": {
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
            return new AddOfferRequest(this)
         }
      }
      return Builder
  }
}

module.exports = AddOfferRequest
