const { Given, When, Then } = require('cucumber')
const DelivererLoginRequest = require('support/web/requests/deliverer-api/login')
const DelivererRegistrationRequest = require('support/web/requests/deliverer-api/registration')
const { expect } = require('chai')

Given(
  'Deliverer {string} registers with phone number {string} and password {string}',
  async function(deliverer, phone_number, password) {
    const request = new DelivererRegistrationRequest.Builder()
      .withPhoneNumber(phone_number)
      .withPassword(password)
      .build()
    await this.send(request)
  },
)

Given('Deliverer {string} registers with phone number {string} and logs in', async function(
  deliverer,
  phone_number,
) {
  const registrationRequest = new DelivererRegistrationRequest.Builder()
    .withPhoneNumber(phone_number)
    .build()
  await this.send(registrationRequest)
  const loginRequest = new DelivererLoginRequest.Builder(deliverer)
    .withPhoneNumber(phone_number)
    .build()
  await this.send(loginRequest)
})

Given(
  'Deliverer {string} registers with phone number {string}, name {string}, and then and logs in',
  async function(deliverer, phone_number, name) {
    await this.send(
      new DelivererRegistrationRequest.Builder()
      .withPhoneNumber(phone_number)
      .withName(name)
      .build()
    )
    await this.send(
      new DelivererLoginRequest.Builder(deliverer).withPhoneNumber(phone_number).build(),
    )
  },
)

When(
  'Deliverer {string} registers with name {string}, phone number {string}, and password {string}',
  async function(deliverer, name, phone_number, password) {
    const request = new DelivererRegistrationRequest.Builder()
      .withName(name)
      .withPhoneNumber(phone_number)
      .withPassword(password)
      .build()
    await this.send(request)
  },
)

When('Deliverer {string} logs in with phone number {string} and password {string}', async function(
  deliverer,
  phone_number,
  password,
) {
  const request = new DelivererLoginRequest.Builder(deliverer)
    .withPhoneNumber(phone_number)
    .withPassword(password)
    .build()
  await this.send(request)
})

Then('Deliverer should receive session token', function() {
  expect(this.lastResponse.data.session_token).not.to.be.undefined
  expect(this.lastResponse.data.session_token.length).to.be.at.least(1)
})
