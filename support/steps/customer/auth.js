const { Given, When, Then } = require('cucumber')
const CustomerRegistrationRequest = require('support/requests/customer-api/registration')
const CustomerLoginRequest = require('support/requests/customer-api/login')
const { expect } = require('chai')

When('Customer registers with phone number {string}', async function(phoneNumber) {
  const request = new CustomerRegistrationRequest.Builder()
    .withPhoneNumber(phoneNumber)
    .build()
  await this.send(request)
})

When('Customer logs in with phone number {string}', async function(phoneNumber) {
  const request = new CustomerLoginRequest.Builder()
    .withPhoneNumber(phoneNumber)
    .build()
  await this.send(request)
})
