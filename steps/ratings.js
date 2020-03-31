const { Given, When, Then } = require('cucumber')
const RateDelivererRequest = require('support/web/requests/customer-api/rate_deliverer')
const OffersGroupedByProductRequest = require('support/web/requests/customer-api/offers/search_for_all_products')
const { expect } = require('chai')

When('Customer rates last order deliverer for {string} with rating {int}',
  async function(concept, rating) {
    const request = new RateDelivererRequest.Builder()
      .withDelivererId(this.lastPlacedOrder.deliverer_id)
      .withOrderId(this.lastPlacedOrder.id)
      .withConcept(concept)
      .withRating(rating)
      .build()
    await this.send(request)
  })

Then('Deliverer publishing {string} should have reputation of {int}', async function (productCode, reputation) {
  const request = new OffersGroupedByProductRequest.Builder().build()
  const offers = await this.send(request)

  const deliverer = offers.data.offersByProduct[productCode].offers[0].deliverer
  expect(deliverer.reputation).to.equal(reputation)
});
