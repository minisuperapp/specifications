const { Given, When } = require('cucumber')
const UpdateOrderToInTransitRequest = require('support/web/requests/deliverer-api/orders/update_to_in_transit')
const UpdateOrderToArrivedRequest = require('support/web/requests/deliverer-api/orders/update_to_arrived')
const UpdateOrderToDeliveredRequest = require('support/web/requests/deliverer-api/orders/update_to_delivered')

When('Deliverer {string} updates last placed order to -in transit-', async function (deliverer) {
  const order_id = this.lastPlacedOrders[0].id
  const request = new UpdateOrderToInTransitRequest.Builder(deliverer).withOrderId(order_id).build()
  await this.send(request)
})

When('Deliverer {string} updates last placed order to -arrived-', async function (deliverer) {
  const order_id = this.lastPlacedOrders[0].id
  const request = new UpdateOrderToArrivedRequest.Builder(deliverer).withOrderId(order_id).build()
  await this.send(request)
})

When('Deliverer {string} updates last placed order to -delivered-', async function (deliverer) {
  const order_id = this.lastPlacedOrders[0].id
  const request = new UpdateOrderToDeliveredRequest.Builder(deliverer).withOrderId(order_id).build()
  await this.send(request)
})

Given('Customer subscribes to get order updates', async function () {
  const socket = this.createCustomerSocket()
  socket.emit('subscribe_for_order_updates', this.lastPlacedOrders[0].id)
  await this.sleep(500)
})

Given('Customer disconnects subscription for updates', async function () {
  await this.unsubscribeFromTopic()
})
