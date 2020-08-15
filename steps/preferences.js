const _ = require('lodash')
const { When } = require('cucumber')
const GetPreferencesAsDelivererRequest = require('support/web/requests/deliverer-api/get_preferences')
const { Then } = require('cucumber')
const { expect } = require('chai')

When('Deliverer {string} sends request to get preferences', async function (deliverer) {
  const request = new GetPreferencesAsDelivererRequest.Builder(deliverer).build()
  await this.send(request)
})

Then(/^Deliverer should receive preferences with these keys and values$/, function (table) {
  const expected_preferences = table.hashes()
  const keyed_preferences = _.keyBy(this.lastResponse.preferences, 'key')
  expected_preferences.forEach(expected_preference => {
    expect(keyed_preferences[expected_preference.key]).not.to.be.undefined
    expect(String(keyed_preferences[expected_preference.key].value)).to.equal(expected_preference.value)
  })
})
