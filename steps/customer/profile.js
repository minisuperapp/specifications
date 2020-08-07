const { When } = require('cucumber')
const CustomerAddLocationRequest = require('support/web/requests/customer-api/add_location')

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
