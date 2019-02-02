const R = require('ramda')
const { Given, When, Then } = require('cucumber')
const OffersListRequest = require('support/web/requests/customer-api/offers/search_for_one_product')
const OffersGroupedByProductRequest = require('support/web/requests/customer-api/offers/search_for_all_products')
const ProviderOffersGroupedByProductRequest = require('support/web/requests/deliverer-api/offers/grouped_by_product')
const { expect } = require('chai')

Given(
  'Customer sends request to get offers grouped by product with location {string}, {string}',
  async function(latitude, longitude) {
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
  const request = new OffersListRequest.Builder().withProductCode(productCode).build()
  await this.send(request)
})

When(
  'Customer sends request to get offers for product {string} with location {string}, {string}',
  async function(productCode, latitude, longitude) {
    const request = new OffersListRequest.Builder()
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
    const request = new OffersListRequest.Builder()
      .withProductCode(productCode)
      .withQuantity(quantity)
      .build()
    await this.send(request)
  },
)

When('Deliverer {string} sends request to get published offers', async function(deliverer) {
  const request = new ProviderOffersGroupedByProductRequest.Builder(deliverer).build()
  await this.send(request)
})

Then('Customer should receive one offer', function() {
  expect(this.lastResponse.data.length).to.equal(1)
})

Then('Customer should receive {int} offers', function(offersNumber) {
  expect(this.lastResponse.data.length).to.equal(offersNumber)
})

Then('the offer should have an id, and unit price', function() {
  expect(this.lastResponse.data.id).not.to.be.undefined
  expect(this.lastResponse.data.unitPrice).not.to.be.undefined
})

Then('the offer unit price should be {string}', function(unitPrice) {
  const offer = this.lastResponse.data.length ? this.lastResponse.data[0] : this.lastResponse.data
  expect(offer.unitPrice).to.equal(unitPrice)
})

Then('the offer should have the deliverer reputation, and last rating', function() {
  expect(this.lastResponse.data.deliverer.reputation).not.to.be.undefined
  expect(this.lastResponse.data.deliverer.lastRating).not.to.be.undefined
})

Then('all offers should have an id, and price', function() {
  const offersWithMissingDetails = R.filter(o => !o.id || !o.unitPrice, this.lastResponse.data)

  expect(offersWithMissingDetails).to.be.empty
})

Then('all offers should have the deliverer reputation, and last rating', function() {
  const deliverersWithMissingDetails = R.filter(
    o => o.deliverer.reputation === undefined || !o.deliverer.lastRating,
    this.lastResponse.data,
  )

  expect(deliverersWithMissingDetails).to.be.empty
})

Then('the deliverer name should be {string}', function(name) {
  const deliverer = this.lastResponse.data.length
    ? this.lastResponse.data[0].deliverer
    : this.lastResponse.data.deliverer

  expect(deliverer.name).to.equal(name)
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

Then('Customer should see {int} offer\\(s) for product {string}', async function(
  offers,
  productCode,
) {
  await this.awaitOn(() => this.state.customer.offersByProduct[productCode])
  expect(this.state.customer.offersByProduct[productCode]).not.to.be.undefined
  expect(this.state.customer.offersByProduct[productCode].offers).not.to.be.undefined
  expect(this.state.customer.offersByProduct[productCode].offers.length).to.equal(offers)
  const offerId = this.state.customer.offersByProduct[productCode].offers[0].id
  expect(this.state.customer.offersById[offerId]).not.to.be.undefined
})

Then('Customer should see zero offers for product {string}', function(productCode) {
  expect(
    this.state.customer.offersByProduct[productCode] === undefined ||
    this.state.customer.offersByProduct[productCode].offers.length === 0,
  ).to.be.true
})

Then('Customer should receive product {string} in first place', function(productCode) {
  expect(this.lastResponse.data[0].code).to.equal(productCode)
})

Then('Customer should receive lowest unit price of {string} for product {string}', function(
  estimatedPrice,
  productCode,
) {
  expect(this.state.customer.offersByProduct[productCode].lowestUnitPrice).not.to.be.undefined
  expect(this.state.customer.offersByProduct[productCode].lowestUnitPrice).to.equal(estimatedPrice)
})

Then('Customer should receive estimated time of arrival for product {string}', function(
  productCode,
) {
  expect(this.state.customer.offersByProduct[productCode].estimatedTimeOfArrival).not.to.be
    .undefined
})

Then(
  'Customer should receive estimated time of arrival between {int} and {int} for product {string}',
  function(min, max, productCode) {
    expect(this.state.customer.offersByProduct[productCode].estimatedTimeOfArrival).not.to.be
      .undefined
    expect(
      Number.parseInt(this.state.customer.offersByProduct[productCode].estimatedTimeOfArrival),
    ).to.be.within(min, max)
  },
)
