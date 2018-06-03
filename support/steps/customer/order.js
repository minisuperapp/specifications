const { Given, When, Then } = require('cucumber')
const OrderRequest = require('support/requests/customer-api/order')
const { expect } = require('chai')

When('Customer send request to place an order', async function () {
  const request = new OrderRequest.Builder()
    .build()
  await this.send(request)
});
