const { Given, When, Then } = require('cucumber')
const PlaceOrderRequest = require('support/web/requests/customer-api/place_order')
const { expect } = require('chai')

Given('Deliverer {string} subscribes to get order placements notifications', async function (
  deliverer,
) {
  const socket = this.createDelivererSocket(deliverer, this.delivererSessionTokens[deliverer])
  socket.emit('subscribe_for_order_placements')
  await this.sleep(500)
})

Given('Deliverer {string} disconnects to get order placements notifications', async function (
  deliverer,
) {
  await this.sleep(200)
  this.delivererSockets[deliverer].disconnect()
})

Given(
  'Customer places an order using offer from deliverer {string} with quantity {string}',
  async function (deliverer, quantity) {
    const offer = this.delivererOfferMap[deliverer]
    const request = new PlaceOrderRequest.Builder()
      .withOffer(offer)
      .withQuantity(quantity)
      .withCustomerLocationId(this.state.customer.lastCustomerLocationId)
      .build()
    await this.send(request)
  },
)

Given('Customer places an order using offer from deliverer {string}', async function (deliverer) {
  const offer = this.delivererOfferMap[deliverer]
  const request = new PlaceOrderRequest.Builder()
    .withOffer(offer)
    .withCustomerLocationId(this.state.customer.lastCustomerLocationId)
    .build()
  await this.send(request)
})

When(
  'Customer places an order using offer from deliverer {string} with quantity {string} and home location',
  async function (deliverer, quantity) {
    const offer = this.delivererOfferMap[deliverer]
    const request = new PlaceOrderRequest.Builder()
      .withOffer(offer)
      .withQuantity(quantity)
      .withCustomerLocationId(this.state.customer.lastCustomerLocationId)
      .build()
    await this.send(request)
  },
)

When(
  'Customer places an order using offer from deliverer {string} with quantity {string} and no location',
  async function (deliverer, quantity) {
    const offer = this.delivererOfferMap[deliverer]
    const request = new PlaceOrderRequest.Builder()
      .withOffer(offer)
      .withQuantity(quantity)
      .withCustomerLocationId(null)
      .build()
    await this.send(request)
  },
)

When('Customer send request to place an order', async function () {
  const request = new PlaceOrderRequest.Builder().build()
  await this.send(request)
})

Then('Customer should receive an order with non empty id', function () {
  expect(this.lastResponse.order.id).not.to.be.undefined
})

Then('Customer should receive an order with total {string}', function (total) {
  expect(this.lastResponse.order.total).to.equal(Number.parseFloat(total))
})

Then('Customer should receive an order with status {string}', function (orderStatus) {
  expect(this.lastResponse.order.status).to.equal(orderStatus)
})

When(
  'Deliverer {string} should receive a pending delivery with last placed order id for product {string}',
  async function (deliverer, product) {
    await this.awaitForSocket('placedOrder')
    expect(this.state.deliverer[deliverer].pendingDeliveries[0]).not.to.be.undefined
    expect(this.state.deliverer[deliverer].pendingDeliveries[0].order.id).to.equal(
      this.lastPlacedOrder.id,
    )
    expect(this.state.deliverer[deliverer].pendingDeliveries[0].order.order_details).not.to.be.undefined
    expect(
      this.state.deliverer[deliverer].pendingDeliveries[0].order.order_details[0].product_code,
    ).to.equal(product)
  },
)

When('Deliverer {string} should see zero pending deliveries', function (deliverer) {
  expect(this.state.deliverer[deliverer]).to.be.undefined
})
