const { Given, When, Then } = require('cucumber')
const CustomerRegistrationRequest = require('support/web/requests/customer-api/registration')
const CustomerLoginRequest = require('support/web/requests/customer-api/login')
const { expect } = require('chai')

When('Customer registers with phone number {string}', async function(phone_number) {
  const request = new CustomerRegistrationRequest.Builder()
    .withPhoneNumber(phone_number)
    .build()
  await this.send(request)
})

When('Customer logs in with phone number {string}', async function(phone_number) {
  const request = new CustomerLoginRequest.Builder()
    .withPhoneNumber(phone_number)
    .build()
  await this.send(request)
})

Then('Customer should receive session token', function() {
  expect(this.lastResponse.data.session_token).not.to.be.undefined
  expect(this.lastResponse.data.session_token.length).to.be.at.least(1)
})
