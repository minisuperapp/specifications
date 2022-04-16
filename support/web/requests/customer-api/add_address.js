const ApiFunctionRequest = require('../$api_function_request')

class CustomerAddAddressRequest extends ApiFunctionRequest {
  constructor(build) {
    super()
    this.input = build
  }
  get method() {
    return 'POST'
  }
  get path() {
    return 'customer/address/add'
  }
  get payload() {
    return this.input
  }
  static get Builder() {
    class Builder {
      constructor() {
        this.is_home = false
        this.name = ''
        this.latitude = null
        this.longitude = null
        this.street = ''
        this.number = ''
        this.apartment_number = ''
        this.neighborhood = ''
        this.city = ''
        this.postal_code = ''
        this.state = ''
        this.country = ''
      }
      withIsHome(is_home) {
        this.is_home = is_home
        return this
      }
      withName(name) {
        this.name = name
        return this
      }
      withStreet(street) {
        this.street = street
        return this
      }
      withNumber(number) {
        this.number = number
        return this
      }
      withApartmentNumber(apartment_number) {
        this.apartment_number = apartment_number
        return this
      }
      withNeighborhood(neighborhood) {
        this.neighborhood = neighborhood
        return this
      }
      withCity(city) {
        this.city = city
        return this
      }
      withPostalCode(postal_code) {
        this.postal_code = postal_code
        return this
      }
      withState(state) {
        this.state = state
        return this
      }
      withCountry(country) {
        this.country = country
        return this
      }
      build() {
        return new CustomerAddAddressRequest(this)
      }
    }
    return Builder
  }
}

module.exports = CustomerAddAddressRequest
