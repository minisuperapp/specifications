const config = require('config')
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

Given('Customer subscribes to get order updates', async function() {
  const socket = this.createCustomerSocket()
  socket.emit('subscribe_for_order_updates', this.lastPlacedOrderId)
  await this.sleep(300)
})

Given('Customer disconnects subscription for updates', async function() {
  await this.sleep(200)
  const lastCustomerSocket = this.customerSockets[this.customerSockets.length - 1]
  lastCustomerSocket.disconnect()
})