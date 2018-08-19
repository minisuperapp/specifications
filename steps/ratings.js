const { Given, When, Then } = require('cucumber')
const RateDelivererRequest = require('support/web/requests/customer-api/rate_deliverer')
const OffersGroupedByProductRequest = require('support/web/requests/customer-api/offers/grouped_by_product')
const { expect } = require('chai')

When('Customer rates last order deliverer for {string} with rating {string}',
  async function(concept, rating) {
    const request = new RateDelivererRequest.Builder()
      .withDelivererId(this.lastPlacedOrder.delivererId)
      .withOrderId(this.lastPlacedOrder.id)
      .withConcept(concept)
      .withRating(rating)
      .build()
    await this.send(request)
  })

Then('Deliverer should have reputation {string}', async function(reputation) {
  const request = new OffersGroupedByProductRequest.Builder().build()
  const offers = await this.send(request)

  const productCode = Object.keys(offers.data.offersByProduct)[0]
  const deliverer = offers.data.offersByProduct[productCode].offers[0].deliverer
  expect(deliverer.reputation).to.equal(reputation)
})