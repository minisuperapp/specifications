const { Given, When, Then } = require('cucumber')
const ProductsAndOffersRequest = require('support/requests/customer-api/products_and_offers')
const { expect } = require('chai')
const R = require('ramda')

Given(
  'Customer sends request to get products and offers with location {string}, {string}',
  async function(latitude, longitude) {
    this.sendCustomerLocation(latitude, longitude)
    const request = new ProductsAndOffersRequest.Builder()
      .withCustomerLocationLatitude(latitude)
      .withCustomerLocationLongitude(longitude)
      .build()
    await this.send(request)
  },
)

When('Customer sends request to get products and offers', async function() {
  const request = new ProductsAndOffersRequest.Builder().build()
  await this.send(request)
})

When('Customer sends request to get products with location {string}, {string}', async function(
  latitude,
  longitude,
) {
  const request = new ProductsAndOffersRequest.Builder()
    .withCustomerLocationLatitude(latitude)
    .withCustomerLocationLongitude(longitude)
    .build()
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
