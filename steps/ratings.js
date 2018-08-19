const { Given, When, Then } = require('cucumber')
const RateDelivererRequest = require('support/web/requests/customer-api/rate_deliverer')
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

