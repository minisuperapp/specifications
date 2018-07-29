const R = require('ramda')
const { Given, When, Then } = require('cucumber')
const UpdateOrderToInTransitRequest = require('support/web/requests/deliverer-api/orders/update_to_in_transit')
const { expect } = require('chai')

When('Deliverer {string} updates last placed order to -in transit-', async function(deliverer) {
  const orderId = this.lastPlacedOrderId
  const request = new UpdateOrderToInTransitRequest.Builder(deliverer)
    .withOrderId(orderId)
    .build()
  await this.send(request)
})
