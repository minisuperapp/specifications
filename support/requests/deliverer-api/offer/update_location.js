const Base = require('../$base')

class UpdateOfferLocationRequest extends Base {
  constructor(build) {
    super(build.deliverer)
    this.offerId = build.offerId
    this.locationLatitude = build.locationLatitude
    this.locationLongitude = build.locationLongitude
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'offer/update_location'
  }
  get body() {
    return {
      offerId: this.offerId,
      newLocation: {
        latitude: this.locationLatitude,
        longitude: this.locationLongitude,
      },
    }
  }
  static get Builder() {
    class Builder {
      constructor(deliverer) {
        this.deliverer = deliverer
        this.offerId = ''
        this.locationLatitude = '28.1867348'
        this.locationLongitude = '-105.4608849'
      }
      withOfferId(offerId) {
        this.offerId = offerId
        return this
      }
      withLocationLatitude(locationLatitude) {
        this.locationLatitude = locationLatitude
        return this
      }
      withLocationLongitude(locationLongitude) {
        this.locationLongitude = locationLongitude
        return this
      }
      build() {
        return new UpdateOfferLocationRequest(this)
      }
    }
    return Builder
  }
}

module.exports = UpdateOfferLocationRequest
