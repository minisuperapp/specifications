const { When } = require('cucumber')
const DelivererSetPostalAreaRequest = require('support/web/requests/deliverer-api/set_postal_area')

When('Deliverer {string} sets the postal area with the following info', async function (
  deliverer,
  table,
) {
  const postal_area = table.hashes()[0]
  const { postal_area_code, postal_area_name, postal_area_county, postal_area_state } = postal_area
  const request = new DelivererSetPostalAreaRequest.Builder(deliverer)
    .withPostalAreaCode(postal_area_code)
    .withPostalAreaName(postal_area_name)
    .withPostalAreaCounty(postal_area_county)
    .withPostalAreaState(postal_area_state)
    .build()
  await this.send(request)
})
