const { Given, When, Then } = require('cucumber')
const CustomerRegistrationRequest = require('support/web/requests/customer-api/registration')
const CustomerLoginRequest = require('support/web/requests/customer-api/login')
const { expect } = require('chai')

When('Customer registers with email {string} and password {string}', async function (
  email,
  password,
) {
  const request = new CustomerRegistrationRequest.Builder()
    .withEmail(email)
    .withPassword(password)
    .build()
  await this.send(request)
})

When('Customer is registered', async function () {
  const request = new CustomerRegistrationRequest.Builder().build()
  await this.send(request)
})

When('Customer logs in with email {string} and password {string}', async function (
  email,
  password,
) {
  const request = new CustomerLoginRequest.Builder().withEmail(email).withPassword(password).build()
  await this.send(request)
})

Then('Customer should receive session token', function () {
  expect(this.lastResponse.data.session_token).not.to.be.undefined
  expect(this.lastResponse.data.session_token.length).to.be.at.least(1)
})
