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
    const offers = {
      [this.delivererOfferMap[deliverer].code]: quantity,
    }
    const request = new PlaceOrderRequest.Builder()
      .withOffers(offers)
      .withCustomerLocationId(this.state.customer.lastCustomerLocationId)
      .build()
    await this.send(request)
  },
)

Given('Customer places an order with the following quantities', async function (table) {
  const rows = table.hashes()
  const offers = rows.reduce((acc, val) => {
    acc[this.delivererOfferMap[val.deliverer].code] = val.quantity
    return acc
  }, {})
  const request = new PlaceOrderRequest.Builder()
    .withOffers(offers)
    .withCustomerLocationId(this.state.customer.lastCustomerLocationId)
    .build()
  await this.send(request)
})

Given('Customer places an order using offer from deliverer {string}', async function (deliverer) {
  const offers = {
    [this.delivererOfferMap[deliverer].code]: '1',
  }
  const request = new PlaceOrderRequest.Builder()
    .withOffers(offers)
    .withCustomerLocationId(this.state.customer.lastCustomerLocationId)
    .build()
  await this.send(request)
})

When(
  'Customer places an order using offer from deliverer {string} with quantity {string} and no location',
  async function (deliverer, quantity) {
    const offers = {
      [this.delivererOfferMap[deliverer].code]: quantity,
    }
    const request = new PlaceOrderRequest.Builder()
      .withOffers(offers)
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

Then('Customer should receive {int} orders with non empty id', function (orders_count) {
  expect(this.lastResponse.orders).not.to.be.undefined
  expect(this.lastResponse.orders.length).to.equal(orders_count)
})

Then('Customer should receive an order with total {string}', function (total) {
  const found = this.lastResponse.orders.find(order => order.total === Number.parseFloat(total))
  expect(found).not.to.be.undefined
})

Then('Customer should receive orders with status {string}', function (orderStatus) {
  this.lastResponse.orders.forEach(order => {
    expect(order.status).to.equal(orderStatus)
  })
})

When(
  'Deliverer {string} should receive a pending delivery with last placed order id for product {string}',
  async function (deliverer, product) {
    await this.awaitForSocket('placedOrder')
    expect(this.state.deliverer[deliverer].pendingDeliveries[0]).not.to.be.undefined
    const order = this.state.deliverer[deliverer].pendingDeliveries[0].order
    expect(order).not.to.be.undefined
    expect(order.id).to.equal(this.lastPlacedOrders[0].id)
    expect(order.product_code).to.equal(product)
  },
)

Then(
  'Deliverer {string} should receive an order with customer location street {string} number {string} and neighborhood {string}',
  function (deliverer, street, number, neighborhood) {
    const order = this.state.deliverer[deliverer].pendingDeliveries[0].order
    expect(order.customer_location_street).to.equal(street)
    expect(order.customer_location_number).to.equal(number)
    expect(order.customer_location_neighborhood).to.equal(neighborhood)
  },
)

When('Deliverer {string} should see zero pending deliveries', function (deliverer) {
  expect(this.state.deliverer[deliverer]).to.be.undefined
})
