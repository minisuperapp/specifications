class DelivererRequest {
  constructor(build) {

  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'deliverer'
  }
  get body() {
    return {
        "offerId": "2",
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
            return new DelivererRequest(this)
         }
      }
      return Builder
  }
}

module.exports = DelivererRequest
