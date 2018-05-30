const { Given, When, Then } = require('cucumber')
const OffersRequest = require('support/requests/customer-api/offers')
const { expect } = require('chai')
const R = require('ramda')

When('I send request to get offers', async function () {
  const request = new OffersRequest.Builder()
    .build()
  await this.send(request)
})
