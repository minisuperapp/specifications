const { Given, When, Then } = require('cucumber')
const CustomerRegistrationRequest = require('support/requests/customer-api/registration')
const { expect } = require('chai')

When('I register with phone number {string}', async function (phoneNumber) {
  const request = new CustomerRegistrationRequest.Builder()
    .withPhoneNumber(phoneNumber)
    .build()
  await this.send(request)
})
