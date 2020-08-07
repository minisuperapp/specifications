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
    .withNeighborhood(location.neighborhood)
    .withCity(location.city)
    .withPostalCode(location.postal_code)
    .withState(location.state)
    .build()
  await this.send(request)
})

Then(/^Customer should receive profile locations$/, function () {
  expect(this.lastResponse.profile).not.to.be.undefined
  expect(this.lastResponse.profile.locations).not.to.be.undefined
})
