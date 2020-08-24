const { Given, When } = require('cucumber')
const BestOfferAssigmentRequest = require('support/web/requests/customer-api/offers/assign_best')
const DiscardOfferAssigmentRequest = require('support/web/requests/customer-api/offers/discard_assigment')

Given(
  'Customer sends request to assign best offer for product {string} with quantity {string}',
  async function (product_code, quantity) {
    const request = new BestOfferAssigmentRequest.Builder()
      .withProductCode(product_code)
      .withQuantity(quantity)
      .build()
    await this.send(request)
  },
)

Given('Customer sends request to cancel last assigned offer', async function () {
  const request = new DiscardOfferAssigmentRequest.Builder()
    .withOfferId(this.state.customer.lastAssignedOfferId)
    .build()
  await this.send(request)
})

When('Customer sends request to assign best offer for product {string}', async function (
  product_code,
) {
  const request = new BestOfferAssigmentRequest.Builder().withProductCode(product_code).build()
  await this.send(request)
})

When('Customer sends request to assign best offer these products', async function (table) {
  const products = table.hashes()
  const builder = new BestOfferAssigmentRequest.Builder()
  products.forEach(product => {
    const { code, quantity } = product
    builder.withProductCodeAndQuantity(code, quantity)
  })
  const request = builder.build()
  await this.send(request)
})
