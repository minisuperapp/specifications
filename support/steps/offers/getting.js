const { Given, When, Then } = require('cucumber')
const GetProductOffersRequest = require('support/requests/customer-api/get_product_offers')
const OffersGroupedByProductRequest = require('support/requests/customer-api/offers_grouped_by_product')
const { expect } = require('chai')
const R = require('ramda')

Given(
  'Customer sends request to get offers grouped by product with location {string}, {string}',
  async function(latitude, longitude) {
    this.sendCustomerLocation(latitude, longitude)
    const request = new OffersGroupedByProductRequest.Builder()
      .withCustomerLocationLatitude(latitude)
      .withCustomerLocationLongitude(longitude)
      .build()
    await this.send(request)
  },
)

When('Customer sends request to get offers grouped by product', async function() {
  const request = new OffersGroupedByProductRequest.Builder().build()
  await this.send(request)
})

When('Customer sends request to get offers for product {string}', async function(productCode) {
  const request = new GetProductOffersRequest.Builder().withProductCode(productCode).build()
  await this.send(request)
})

When(
  'Customer sends request to get offers for product {string} with location {string}, {string}',
  async function(productCode, latitude, longitude) {
    const request = new GetProductOffersRequest.Builder()
      .withProductCode(productCode)
      .withCustomerLocationLatitude(latitude)
      .withCustomerLocationLongitude(longitude)
      .build()
    await this.send(request)
  },
)

When(
  'Customer sends request to get offers for product {string} and quantity {string}',
  async function(productCode, quantity) {
    const request = new GetProductOffersRequest.Builder()
      .withProductCode(productCode)
      .withQuantity(quantity)
      .build()
    await this.send(request)
  },
)

Then('Customer should receive one offer', function() {
  expect(this.lastResponse.data.length).to.equal(1)
})

Then('Customer should receive {int} offers', function(offersNumber) {
  expect(this.lastResponse.data.length).to.equal(offersNumber)
})

Then('the offer should have an id, price, and estimated arrival time', function() {
  const offersWithMissingDetails = R.filter(
    o => !o.id || !o.unitPrice || !o.estimatedArrivalTime,
    this.lastResponse.data,
  )

  expect(offersWithMissingDetails).to.be.empty
})

Then('the offer should have the deliverer name, reputation, and last rating', function() {
  const deliverersWithMissingDetails = R.filter(
    o => !o.deliverer.name || !o.deliverer.reputation || !o.deliverer.lastRating,
    this.lastResponse.data,
  )

  expect(deliverersWithMissingDetails).to.be.empty
})

Then('offers should be ordered by estimated arrival time', function() {
  const arrivalTimes = R.map(o => o.estimated_arrival_time, this.lastResponse.data)
  const sortedArrivalTimes = R.sort((a, b) => a - b, arrivalTimes)

  expect(arrivalTimes).to.deep.equal(sortedArrivalTimes)
})

Then('Customer should receive zero offers', function() {
  expect(this.lastResponse.data.length).to.equal(0)
})

Then('Customer should receive {int} offer\\(s) for product {string}', function(
  offers,
  productCode,
) {
  expect(this.lastResponse.data.offersByProduct[productCode]).not.to.be.undefined
  expect(this.lastResponse.data.offersByProduct[productCode].offers).not.to.be.undefined
  expect(this.lastResponse.data.offersByProduct[productCode].offers.length).to.equal(offers)
  const offerId = this.lastResponse.data.offersByProduct[productCode].offers[0].id
  expect(this.lastResponse.data.offersById[offerId]).not.to.be.undefined
})

Then('Customer should receive zero offers for product {string}', function(productCode) {
  expect(this.lastResponse.data.offersByProduct[productCode]).to.be.undefined
})

Then('Customer should see {int} offer\\(s) for product {string}', function(offers, productCode) {
  expect(this.state.offersByProduct[productCode]).not.to.be.undefined
  expect(this.state.offersByProduct[productCode].offers).not.to.be.undefined
  expect(this.state.offersByProduct[productCode].offers.length).to.equal(offers)
  const offerId = this.state.offersByProduct[productCode].offers[0].id
  expect(this.state.offersById[offerId]).not.to.be.undefined
})

Then('Customer should see zero offers for product {string}', function(productCode) {
  expect(
    this.state.offersByProduct[productCode] === undefined ||
      this.state.offersByProduct[productCode].offers.length === 0,
  ).to.be.true
})

Then('Customer should receive product {string} in first place', function(productCode) {
  expect(this.lastResponse.data[0].code).to.equal(productCode)
})

Then('Customer should receive estimated price of {string} for product {string}', function(
  estimatedPrice,
  productCode,
) {
  expect(this.state.offersByProduct[productCode].estimatedPrice).not.to.be.undefined
  expect(this.state.offersByProduct[productCode].estimatedPrice).to.equal(estimatedPrice)
})
