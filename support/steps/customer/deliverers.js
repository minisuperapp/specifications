const { Given, When, Then } = require('cucumber')
const DeliverersRequest = require('support/requests/customer-api/deliverers')
const { expect } = require('chai')
const R = require('ramda')

When('I send request to get deliverers', async function () {
  const request = new DeliverersRequest.Builder()
    .build()
  await this.send(request)
})
