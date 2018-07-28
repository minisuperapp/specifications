const { Given, When, Then } = require('cucumber')
const BestOfferAssigmentRequest = require('support/web/requests/customer-api/offers/assign_best')
const DiscardOfferAssigmentRequest = require('support/web/requests/customer-api/offers/discard_assigment')
const { expect } = require('chai')
const R = require('ramda')

Given(
  'Customer sends request to assign best offer for product {string} with quantity {string}',
  async function(productCode, quantity) {
    const request = new BestOfferAssigmentRequest.Builder()
      .withProductCode(productCode)
      .withQuantity(quantity)
      .build()
    await this.send(request)
  },
)

Given('Customer sends request to cancel last assigned offer', async function() {
  const request = new DiscardOfferAssigmentRequest.Builder().withOfferId(
    this.state.customer.lastAssignedOfferId,
  ).build()
  await this.send(request)
})

When('Customer sends request to assign best offer for product {string}', async function(
  productCode,
) {
  const request = new BestOfferAssigmentRequest.Builder().withProductCode(productCode).build()
  await this.send(request)
})