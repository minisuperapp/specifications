const { Given, When, Then } = require('cucumber')
const DelivererLoginRequest = require('support/requests/deliverer-api/login')
const DelivererRegistrationRequest = require('support/requests/deliverer-api/registration')
const { expect } = require('chai')

Given(
  'Deliverer {string} registers with phone number {string} and password {string}',
  async function(deliverer, phoneNumber, password) {
    const request = new DelivererRegistrationRequest.Builder()
      .withPhoneNumber(phoneNumber)
      .withPassword(password)
      .build()
    await this.send(request)
  },
)

Given('Deliverer {string} registers with phone number {string} and logs in', async function(
  deliverer,
  phoneNumber,
) {
  const registrationRequest = new DelivererRegistrationRequest.Builder()
    .withPhoneNumber(phoneNumber)
    .build()
  await this.send(registrationRequest)
  const loginRequest = new DelivererLoginRequest.Builder(deliverer)
    .withPhoneNumber(phoneNumber)
    .build()
  await this.send(loginRequest)
})

When(
  'Deliverer {string} registers with name {string}, phone number {string}, and password {string}',
  async function(deliverer, name, phoneNumber, password) {
    const request = new DelivererRegistrationRequest.Builder()
      .withName(name)
      .withPhoneNumber(phoneNumber)
      .withPassword(password)
      .build()
    await this.send(request)
  },
)

When('Deliverer {string} logs in with phone number {string} and password {string}', async function(
  deliverer,
  phoneNumber,
  password,
) {
  const request = new DelivererLoginRequest.Builder(deliverer)
    .withPhoneNumber(phoneNumber)
    .withPassword(password)
    .build()
  await this.send(request)
})

Then('Deliverer should receive session token', function() {
  expect(this.lastResponse.data.sessionToken).not.to.be.undefined
  expect(this.lastResponse.data.sessionToken.length).to.be.at.least(1)
})
