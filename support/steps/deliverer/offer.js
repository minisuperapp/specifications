const { Given, When, Then } = require('cucumber')
const AddOfferRequest = require('support/requests/deliverer-api/offer/add')
const { expect } = require('chai')
const R = require('ramda')

Given('Deliverer adds a new offer for product {int}', async function (productId) {
  const request = new AddOfferRequest.Builder()
    .withProductId(productId)
    .build()
  await this.send(request)
})

When('Deliverer adds a new offer', async function () {
  const request = new AddOfferRequest.Builder()
    .build()
  await this.send(request)
});
