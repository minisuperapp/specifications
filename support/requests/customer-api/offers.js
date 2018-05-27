class OffersRequest {
  constructor(build) {

  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'offers'
  }
  get body() {
    return {}
  }
  static get Builder() {
    class Builder {
         constructor() {

         }
         build() {
            return new OffersRequest(this)
         }
      }
      return Builder
  }
}

module.exports = OffersRequest
