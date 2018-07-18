const { Given, When, Then } = require('cucumber')
const PlaceOrderRequest = require('support/web/requests/customer-api/place_order')
const { expect } = require('chai')

Given(
  'Customer places order using offer from deliverer {string} with quantity {string}',
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
  'Customer places order using offer from deliverer {string} with quantity {string} and location {string}, {string}',
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

Then('Deliverer should receive a pending delivery with last placed order id', async function () {
  await this.sleep(200)
  expect(this.state.deliverer.pendingDeliveries[0]).not.to.be.undefined
  expect(this.state.deliverer.pendingDeliveries[0].orderId).to.equal(this.lastPlacedOrderId)
})
