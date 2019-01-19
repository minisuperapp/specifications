const config = require('config')
const { Given, When, Then } = require('cucumber')
const UpdateOrderToInTransitRequest = require('support/web/requests/deliverer-api/orders/update_to_in_transit')
const UpdateOrderToArrivedRequest = require('support/web/requests/deliverer-api/orders/update_to_arrived')
const { expect } = require('chai')

When('Deliverer {string} updates last placed order to -in transit-', async function(deliverer) {
  const orderId = this.lastPlacedOrder.id
  const request = new UpdateOrderToInTransitRequest.Builder(deliverer)
    .withOrderId(orderId)
    .build()
  await this.send(request)
})

When('Deliverer {string} updates last placed order to -arrived-', async function(deliverer) {
  const orderId = this.lastPlacedOrder.id
  const request = new UpdateOrderToArrivedRequest.Builder(deliverer)
    .withOrderId(orderId)
    .build()
  await this.send(request)
})


Given('Customer subscribes to get order updates', async function() {
  const socket = this.createCustomerSocket()
  socket.emit('subscribe_for_order_updates', this.lastPlacedOrder.id)
  await this.sleep(500)
})

Given('Customer disconnects subscription for updates', async function() {
  await this.sleep(200)
  const lastCustomerSocket = this.customerSockets[this.customerSockets.length - 1]
  lastCustomerSocket.disconnect()
  await this.sleep(200)
})