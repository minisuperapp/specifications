const { Given, When, Then } = require('cucumber')
const RateDelivererRequest = require('support/web/requests/customer-api/rate_deliverer')
const OffersGroupedByProductRequest = require('support/web/requests/customer-api/offers/search_for_all_products')
const { expect } = require('chai')

When('Customer rates last order deliverer for {string} with rating {int}', async function (
  concept,
  rating,
) {
  const request = new RateDelivererRequest.Builder()
    .withDelivererId(this.lastPlacedOrders[0].deliverer_id)
    .withOrderId(this.lastPlacedOrders[0].id)
    .withConcept(concept)
    .withRating(rating)
    .build()
  await this.send(request)
})

Then('Deliverer publishing {string} should have reputation of {int}', async function (
  product_code,
  reputation,
) {
  const request = new OffersGroupedByProductRequest.Builder().build()
  const offers = await this.send(request)

  const offer = offers.data.offersByProduct[product_code].offers[0]
  expect(offer.deliverer_reputation).to.equal(reputation)
})
