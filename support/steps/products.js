const { Given, When, Then } = require('cucumber')
const GetProductsRequest = require('support/requests/customer-api/get_products')
const { expect } = require('chai')
const R = require('ramda')

When('Customer sends request to get products', async function() {
  const request = new GetProductsRequest.Builder().build()
  await this.send(request)
})

Then('Customer should receive products', function() {
  expect(this.lastResponse.data.products).not.to.be.undefined
})

Then('all products should have an id', function() {
  const productsWithNoId = R.filter(o => !o.id, this.lastResponse.data.products)
  expect(productsWithNoId).to.be.empty
})

Then('all products should have a name', function() {
  const productsWithNoName = R.filter(o => !o.name, this.lastResponse.data.products)
  expect(productsWithNoName).to.be.empty
})

Then('all products should have a code', function() {
  const productsWithNoCode = R.filter(o => !o.code, this.lastResponse.data.products)
  expect(productsWithNoCode).to.be.empty
})

Then('Customer should see {int} offer\\(s) for product {string}', function(offers, productCode) {
  expect(this.state.offersByProduct[productCode]).not.to.be.undefined
  expect(this.state.offersByProduct[productCode].offers).not.to.be.undefined
  expect(this.state.offersByProduct[productCode].offers.length).to.equal(offers)
  const offerId = this.state.offersByProduct[productCode].offers[0].id
  expect(this.state.offersById[offerId]).not.to.be.undefined
})

Then('Customer should see zero offers for product {string}', function (productCode) {
  expect(this.state.offersByProduct[productCode] === undefined ||
  this.state.offersByProduct[productCode].offers.length === 0).to.be.true
})

Then('Customer should receive product {string} in first place', function (productCode) {
  expect(this.lastResponse.data[0].code).to.equal(productCode)
})
