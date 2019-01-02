const R = require('ramda')
const { Given, When, Then } = require('cucumber')
const AsDelivererListPendingOrdersToDeliverRequest = require('support/web/requests/deliverer-api/orders/list_pending_to_deliver')
const AsCustomerListPendingOrdersToDeliverRequest = require('support/web/requests/customer-api/orders/list_pending_to_deliver')
const { expect } = require('chai')

When('Deliverer {string} sends request to receive started orders pending to deliver', async function(
  deliverer,
) {
  const request = new AsDelivererListPendingOrdersToDeliverRequest.Builder(deliverer).build()
  await this.send(request)
})

When('Customer sends request to receive started orders pending to deliver', async function() {
  const request = new AsCustomerListPendingOrdersToDeliverRequest.Builder()
    .withCustomerCode(this.customerCode)
    .build()
  await this.send(request)
})

Then('Deliverer should receive one order', function() {
  expect(this.lastResponse.data.orders).not.to.be.undefined
  expect(this.lastResponse.data.orders.length).to.equal(1)
})

Then('Customer should receive {int} orders', function(ordersNumber) {
  expect(this.lastResponse.data.orders).not.to.be.undefined
  expect(this.lastResponse.data.orders.length).to.equal(ordersNumber)
})

Then('the order should be for product {string}', function(productCode) {
  expect(this.lastResponse.data.orders[0].productCode).to.equal(productCode)
  expect(this.lastResponse.data.productsByCode[productCode]).not.to.be.undefined
})

Then('the order should have quantity {string}', function(quantity) {
  expect(this.lastResponse.data.orders[0].productQuantity).to.equal(quantity)
})

Then('the order should have customer location {string}, {string}', function(
  customerLocationLatitude,
  customerLocationLongitude,
) {
  expect(this.lastResponse.data.orders[0].customerLocationLatitude).to.equal(
    customerLocationLatitude,
  )
  expect(this.lastResponse.data.orders[0].customerLocationLongitude).to.equal(
    customerLocationLongitude,
  )
})

Then('Customer should see order status as {string}', async function(orderStatus) {
  await this.awaitForSocket('updateOrderStatus')
  expect(this.state.customer.orders[this.lastPlacedOrder.id].status).to.equal(orderStatus)
})
