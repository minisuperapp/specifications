const { Given, When, Then } = require('cucumber')
const ProductsRequest = require('support/requests/customer-api/products')
const { expect } = require('chai')
const R = require('ramda')

When('I send request to get products', async function () {
  const request = new ProductsRequest.Builder()
    .build()
  await this.send(request)
})

Then('all products should have an id', function () {
  const productsWithNoEstimatedPrice = R.filter(o => !o.id, this.lastResponse.data)
  expect(productsWithNoEstimatedPrice).to.be.empty
})

Then('all products should have a name', function () {
  const productsWithNoEstimatedPrice = R.filter(o => !o.name, this.lastResponse.data)
  expect(productsWithNoEstimatedPrice).to.be.empty
})

Then('all products should have a code', function () {
  const productsWithNoEstimatedPrice = R.filter(o => !o.code, this.lastResponse.data)
  expect(productsWithNoEstimatedPrice).to.be.empty
})
