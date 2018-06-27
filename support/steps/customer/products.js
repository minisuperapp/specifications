const { Given, When, Then } = require('cucumber')
const ProductsRequest = require('support/requests/customer-api/products')
const { expect } = require('chai')
const R = require('ramda')

When('I send request to get products', async function () {
  const request = new ProductsRequest.Builder()
    .build()
  await this.send(request)
})

Then('I should get at least one product', function () {
  expect(this.lastResponse.data).not.to.be.undefined
  expect(this.lastResponse.data.length).to.be.at.least(1)
})

Then('all products should have an id', function () {
  const productsWithNoEstimatedPrice = R.filter(o => !o.id, this.lastResponse.data)
  expect(productsWithNoEstimatedPrice).to.be.empty
})

Then('all products should have a name', function () {
  const productsWithNoEstimatedPrice = R.filter(o => !o.name, this.lastResponse.data)
  expect(productsWithNoEstimatedPrice).to.be.empty
})

Then('all products should have an estimated price', function () {
  const productsWithNoEstimatedPrice = R.filter(o => !o.estimated_price, this.lastResponse.data)
  expect(productsWithNoEstimatedPrice).to.be.empty
})

Then('all products should have an estimated delivery time', function () {
  const productsWithNoEstimatedPrice = R.filter(o => !o.estimated_delivery_time, this.lastResponse.data)
  expect(productsWithNoEstimatedPrice).to.be.empty
})

Then('all products should have an image url', function () {
  const productsWithNoEstimatedPrice = R.filter(o => !o.image_url, this.lastResponse.data)
  expect(productsWithNoEstimatedPrice).to.be.empty
})
