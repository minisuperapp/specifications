const { When, Then } = require('cucumber')
const CustomerAddLocationRequest = require('support/web/requests/customer-api/add_location')
const { expect } = require('chai')

When(/^Customer adds a location with the following info$/, async function (table) {
  const location = table.hashes()[0]
  const request = new CustomerAddLocationRequest.Builder()
    .withIsHome(Boolean(location.is_home))
    .withName(location.name)
    .withStreet(location.street)
    .withNumber(location.number)
    .withApartmentNumber(location.apartment_number)
    .withNeighborhood(location.neighborhood)
    .withCity(location.city)
    .withPostalCode(location.postal_code)
    .withState(location.state)
    .build()
  await this.send(request)
})

When(/^Customer adds a home location$/, async function () {
  const request = new CustomerAddLocationRequest.Builder()
    .withIsHome(true)
    .withName('Casa')
    .withStreet('Benito Juarez')
    .withNumber('123')
    .withNeighborhood('Centro')
    .withCity('Delicias')
    .withPostalCode('33700')
    .withState('Chihuahua')
    .build()
  await this.send(request)
})


Then(/^Customer should receive profile locations$/, function () {
  expect(this.lastResponse.profile).not.to.be.undefined
  expect(this.lastResponse.profile.locations).not.to.be.undefined
  expect(this.lastResponse.profile.locations.length).to.equal(1)
  expect(this.lastResponse.profile.locations[0].name).to.equal('Casa')
})
