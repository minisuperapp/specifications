const { Given, When, Then } = require('cucumber')
const RateDelivererRequest = require('support/web/requests/customer-api/rate_deliverer')
const { expect } = require('chai')

When('Customer rates last order deliverer for {string} with rating {string}',
  async function(string, string2) {
    const request = new RateDelivererRequest.Builder()
      .withDelivererId(this.lastPlacedOrder.delivererId)
      .build()
    await this.send(request)
  })

