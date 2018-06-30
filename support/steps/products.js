const { Given, When, Then } = require('cucumber')
const ProductsRequest = require('support/requests/customer-api/products')
const { expect } = require('chai')
const R = require('ramda')

When('Customer sends request to get products', async function () {
  const request = new ProductsRequest.Builder()
    .build()
  await this.send(request)
})

Then('all products should have an id', function () {
  const productsWithNoId = R.filter(o => !o.id, this.lastResponse.data)
  expect(productsWithNoId).to.be.empty
})

Then('all products should have a name', function () {
  const productsWithNoName = R.filter(o => !o.name, this.lastResponse.data)
  expect(productsWithNoName).to.be.empty
})

Then('all products should have a code', function () {
  const productsWithNoCode = R.filter(o => !o.code, this.lastResponse.data)
  expect(productsWithNoCode).to.be.empty
})

Then('all products should have available status', function () {
  const productsWithNoAvailableStatus = R.filter(o => o.available === undefined, this.lastResponse.data)
  expect(productsWithNoAvailableStatus).to.be.empty
})

Then('all products should be unavailable', function () {
  const availableProducts = R.filter(o => o.available === true, this.lastResponse.data)
  expect(availableProducts).to.be.empty
})

Then('product {string} should be available', function (productCode) {
  const cornTortilla = this.currentProducts.find(p => p.code === productCode)
  expect(cornTortilla.available).to.be.true
})
