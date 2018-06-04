const { Given, When, Then } = require('cucumber')
const DelivererLoginRequest = require('support/requests/deliverer-api/login')
const { expect } = require('chai')

When('Deliverer logs in with phone number {string} and password {string}', async function(
  phoneNumber,
  password,
) {
  const request = new DelivererLoginRequest.Builder()
    .withPhoneNumber(phoneNumber)
    .withPassword(password)
    .build()
  await this.send(request)
})

Then('Deliverer should receive session token', function () {
  expect(this.lastResponse.data.sessionToken).not.to.be.undefined
  expect(this.lastResponse.data.sessionToken.length).to.be.at.least(1)
})
