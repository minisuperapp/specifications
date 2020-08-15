const { When } = require('cucumber')
const GetPreferencesAsDelivererRequest = require('support/web/requests/deliverer-api/get_preferences')
const { Then } = require('cucumber')
const { expect } = require('chai')

When('Deliverer {string} sends request to get preferences', async function (deliverer) {
  const request = new GetPreferencesAsDelivererRequest.Builder(deliverer).build()
  await this.send(request)
})

Then(/^Deliverer should receive preferences with these keys$/, function (table) {
  const expectedKeys = table.hashes().map(hash => hash.key)
  const actualKeys = this.lastResponse.preferences.map(preference => preference.key)
  actualKeys.forEach(key => {
    expect(expectedKeys.includes(key)).to.be.true
  })
})
