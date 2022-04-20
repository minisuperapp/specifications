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
  await this.subscribeClientToTopic('update_order_status')
})

Given('Customer disconnects subscription for updates', async function () {
  await this.sleep(200)

  //deprecated
  const lastCustomerSocket = this.customerSockets[this.customerSockets.length - 1]
  lastCustomerSocket.disconnect()

  // AWS
  await this.unsubscribeClientFromTopic('published_offer')
  await this.unsubscribeClientFromTopic('update_order_status')

  await this.sleep(200)
})
