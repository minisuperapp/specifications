const { Given, When, Then } = require('cucumber')
const GetProductsRequest = require('support/web/requests/customer-api/get_products')
const { expect } = require('chai')
const R = require('ramda')

When('Customer sends request to get products', async function() {
  const request = new GetProductsRequest.Builder().build()
  await this.send(request)
})

Then('Customer should receive products', function() {
  expect(this.lastResponse.data).not.to.be.undefined
})

Then('all products should have an id', function() {
  const productsWithNoId = R.filter(o => !o.id, this.lastResponse.data)
  expect(productsWithNoId).to.be.empty
})

Then('all products should have a name', function() {
  const productsWithNoName = R.filter(o => !o.name, this.lastResponse.data)
  expect(productsWithNoName).to.be.empty
})

Then('all products should have a code', function() {
  const productsWithNoCode = R.filter(o => !o.code, this.lastResponse.data)
  expect(productsWithNoCode).to.be.empty
})
