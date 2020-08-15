const { When } = require('cucumber')
const GetPreferencesAsDelivererRequest = require('support/web/requests/deliverer-api/preferences/get_preferences')
const ChangePreferencesAsDelivererRequest = require('support/web/requests/deliverer-api/preferences/change_preferences')
const { Then } = require('cucumber')
const { expect } = require('chai')

When('Deliverer {string} sends request to get preferences', async function (deliverer) {
  const request = new GetPreferencesAsDelivererRequest.Builder(deliverer).build()
  await this.send(request)
})

Then(/^Deliverer should receive preferences with these keys and values$/, function (table) {
  const expected_preferences = table.hashes()
  const actual_preferences = this.lastResponse.preferences
  expected_preferences.forEach(expected_preference => {
    expect(actual_preferences[expected_preference.key]).not.to.be.undefined
    expect(String(actual_preferences[expected_preference.key].value)).to.equal(
      expected_preference.value,
    )
  })
})

When('Deliverer {string} sends request to change these preferences', async function (deliverer, table) {
  const changes = table.hashes()
  const request_builder = new ChangePreferencesAsDelivererRequest.Builder(deliverer)
  changes.forEach(change => {
    request_builder.withChange(change)
  })
  const request = request_builder.build()
  await this.send(request)
})
