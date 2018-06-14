const { Given, When, Then } = require('cucumber')
const CustomerRegistrationRequest = require('support/requests/customer-api/registration')
const { expect } = require('chai')

When('Customer registers with phone number {string}', async function (phoneNumber) {
  const request = new CustomerRegistrationRequest.Builder()
    .withPhoneNumber(phoneNumber)
    .build()
  await this.send(request)
})

When('Customer logs in with phone number {string} and password {string}', function (string, string2) {

})
