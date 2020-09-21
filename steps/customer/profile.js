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


Then(/^Customer should receive profile addresses$/, function () {
  expect(this.lastResponse.addresses).not.to.be.undefined
  expect(this.lastResponse.addresses.length).to.equal(1)
  expect(this.lastResponse.addresses[0].name).to.equal('Casa')
})
