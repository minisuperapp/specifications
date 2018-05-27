const { Given, When, Then } = require('cucumber')
const OffersRequest = require('support/requests/customer-api/offers')
const { expect } = require('chai')

When('I send request to get product offers', async function () {
  const request = new OffersRequest.Builder()
    .build()
  await this.send(request)
})
