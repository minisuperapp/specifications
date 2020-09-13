const { When } = require('cucumber')
const CancelOrderByDelivererRequest = require('support/web/requests/deliverer-api/orders/cancel')

When(
  'Deliverer {string} cancels last placed order',
  async function(deliverer) {
    const order_id = this.lastPlacedOrders[0].id
    const request = new CancelOrderByDelivererRequest.Builder(deliverer).withOrderId(order_id).build()
    await this.send(request)
  },
)
