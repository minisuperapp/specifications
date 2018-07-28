const R = require('ramda')
const { Given, When, Then } = require('cucumber')
const AsDelivererListPendingOrdersToDeliverRequest = require('support/web/requests/deliverer-api/orders/list_pending_to_deliver')
const { expect } = require('chai')

When('Deliverer {string} sends request to get started orders pending to deliver', async function(
  deliverer,
) {
  const request = new AsDelivererListPendingOrdersToDeliverRequest.Builder(deliverer).build()
  await this.send(request)
})

Then('Deliverer should receive one order', function() {
  expect(this.lastResponse.data.length).not.to.be.undefined
  expect(this.lastResponse.data.length).to.equal(1)
})
