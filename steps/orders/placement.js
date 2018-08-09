const { Given, When, Then } = require('cucumber')
const PlaceOrderRequest = require('support/web/requests/customer-api/place_order')
const { expect } = require('chai')

Given('Deliverer {string} subscribes to get order placements notifications', async function(deliverer) {
  const socket = this.createDelivererSocket(deliverer)
  socket.emit('subscribe_for_order_placements', this.delivererSessionTokens[deliverer])
  await this.sleep(300)
})

Given(
  'Customer places an order using offer from deliverer {string} with quantity {string}',
  async function(deliverer, quantity) {
    const offerId = this.delivererOfferMap[deliverer]
    const request = new PlaceOrderRequest.Builder()
      .withOfferId(offerId)
      .withQuantity(quantity)
      .build()
    await this.send(request)
  },
)

When(
  'Customer places an order using offer from deliverer {string} with quantity {string} and location {string}, {string}',
  async function(deliverer, quantity, latitude, longitude) {
    const offerId = this.delivererOfferMap[deliverer]
    const request = new PlaceOrderRequest.Builder()
      .withOfferId(offerId)
      .withQuantity(quantity)
      .withCustomerLocationLatitude(latitude)
      .withCustomerLocationLongitude(longitude)
      .build()
    await this.send(request)
  },
)

When('Customer send request to place an order', async function() {
  const request = new PlaceOrderRequest.Builder().build()
  await this.send(request)
})

Then('Customer should receive an order with non empty id', function() {
  expect(this.lastResponse.data.id).not.to.be.undefined
})

Then('Customer should receive an order with total {string}', function(total) {
  expect(this.lastResponse.data.total).to.equal(Number.parseFloat(total))
})

Then('Customer should receive an order with status {string}', function(orderStatus) {
  expect(this.lastResponse.data.status).to.equal(orderStatus)

})

Then(
  'Deliverer {string} should receive a pending delivery with last placed order id',
  async function(deliverer) {
    await this.awaitForSocket('placedOrder')
    expect(this.state.deliverer[deliverer].pendingDeliveries[0]).not.to.be.undefined
    expect(this.state.deliverer[deliverer].pendingDeliveries[0].id).to.equal(this.lastPlacedOrderId)
  },
)