const R = require('ramda')
const { Given, When, Then } = require('cucumber')
const OffersListRequest = require('support/web/requests/customer-api/offers/search_for_one_product')
const OffersGroupedByProductRequest = require('support/web/requests/customer-api/offers/search_for_all_products')
const GetDelivererOffersRequest = require('support/web/requests/deliverer-api/offers/offers')
const { expect } = require('chai')

Given(
  'Customer sends request to get offers grouped by product with location {string}, {string}',
  async function (latitude, longitude) {
    const request = new OffersGroupedByProductRequest.Builder()
      .withCustomerLocationLatitude(latitude)
      .withCustomerLocationLongitude(longitude)
      .build()
    await this.send(request)
  },
)

When('Customer sends request to get offers grouped by product', async function () {
  const request = new OffersGroupedByProductRequest.Builder().build()
  await this.send(request)
})

When('Customer sends request to get offers for product {string}', async function (product_code) {
  const request = new OffersListRequest.Builder().withProductCode(product_code).build()
  await this.send(request)
})

When(
  'Customer sends request to get offers for product {string} with location {string}, {string}',
  async function (product_code, latitude, longitude) {
    const request = new OffersListRequest.Builder()
      .withProductCode(product_code)
      .withCustomerLocationLatitude(latitude)
      .withCustomerLocationLongitude(longitude)
      .build()
    await this.send(request)
  },
)

When(
  'Customer sends request to get offers for product {string} and quantity {string}',
  async function (product_code, quantity) {
    const request = new OffersListRequest.Builder()
      .withProductCode(product_code)
      .withQuantity(quantity)
      .build()
    await this.send(request)
  },
)

When('Deliverer {string} sends request to get published offers', async function (deliverer) {
  const request = new GetDelivererOffersRequest.Builder(deliverer).build()
  await this.send(request)
})

Then('Customer should receive one offer', function() {
  expect(this.lastResponse.list.length).to.equal(1)
})

Then('Customer should receive {int} offers', function(offersNumber) {
  expect(this.lastResponse.list.length).to.equal(offersNumber)
})

Then('the offer should have an id, and unit price', function () {
  expect(this.lastResponse.list.id).not.to.be.undefined
  expect(this.lastResponse.list.unitPrice).not.to.be.undefined
})

Then('the offer unit price for product {string} should be {string}', function (
  product_code,
  unit_price,
) {
  const offers = this.lastResponse.index
  const offer = Object.values(offers)[0]
  expect(offer.unit_price).to.equal(unit_price)
})

Then('the offer should have the deliverer reputation', function () {
  const offers = Object.values(this.lastResponse.index)
  expect(offers[0].deliverer_reputation).not.to.be.undefined
})

Then('all offers should have an id, and price', function() {
  const offersWithMissingDetails = R.filter(o => !o.id || !o.unit_price, this.lastResponse.list)

  expect(offersWithMissingDetails).to.be.empty
})

Then('all offers should have the deliverer reputation', function() {
  const deliverersWithMissingDetails = R.filter(
    o => o.deliverer_reputation === undefined,
    this.lastResponse.list,
  )

  expect(deliverersWithMissingDetails).to.be.empty
})

Then('the deliverer name should be {string}', function(name) {
  const deliverer = this.lastResponse.list[0].deliverer_name

  expect(deliverer).to.equal(name)
})

Then('offers should be ordered by estimated arrival time', function () {
  const offers = Object.values(this.lastResponse.index)
  const arrivalTimes = R.map(o => o.estimated_arrival_time, offers)
  const sortedArrivalTimes = R.sort((a, b) => a - b, arrivalTimes)

  expect(arrivalTimes).to.deep.equal(sortedArrivalTimes)
})

Then('Customer should receive zero offers', function() {
  expect(this.lastResponse.list.length).to.equal(0)
})

Then('Customer should receive {int} offers for product {string}', function (offers, product_code) {
  expect(this.lastResponse.data.offersByProduct[product_code]).not.to.be.undefined
  expect(this.lastResponse.data.offersByProduct[product_code].offers).not.to.be.undefined
  expect(this.lastResponse.data.offersByProduct[product_code].offers.length).to.equal(offers)
  const offerId = this.lastResponse.data.offersByProduct[product_code].offers[0].code
  expect(this.lastResponse.data.offersById[offerId]).not.to.be.undefined
})

Then('Customer should receive zero offers for product {string}', function (product_code) {
  expect(this.lastResponse.data.offersByProduct[product_code]).to.be.undefined
})

Then('Customer should see {int} offer\\(s) for product {string}', async function (
  offers,
  product_code,
) {
  await this.awaitOn(() => this.state.customer.offersByProduct[product_code])
  expect(this.state.customer.offersByProduct[product_code]).not.to.be.undefined
  expect(this.state.customer.offersByProduct[product_code].offers).not.to.be.undefined
  expect(this.state.customer.offersByProduct[product_code].offers.length).to.equal(offers)
  const offerId = this.state.customer.offersByProduct[product_code].offers[0].id
  expect(this.state.customer.offersById[offerId]).not.to.be.undefined
})

Then('Customer should see zero offers for product {string}', function (product_code) {
  expect(
    this.state.customer.offersByProduct[product_code] === undefined ||
      this.state.customer.offersByProduct[product_code].offers.length === 0,
  ).to.be.true
})

Then('Customer should receive product {string} in first place', function (product_code) {
  expect(this.lastResponse.data[0].code).to.equal(product_code)
})

Then('Customer should receive lowest unit price of {string} for product {string}', function (
  estimatedPrice,
  product_code,
) {
  expect(this.state.customer.offersByProduct[product_code].lowestUnitPrice).not.to.be.undefined
  expect(this.state.customer.offersByProduct[product_code].lowestUnitPrice).to.equal(estimatedPrice)
})

Then('Customer should receive estimated time of arrival for product {string}', function (
  product_code,
) {
  expect(this.state.customer.offersByProduct[product_code].estimatedTimeOfArrival).not.to.be
    .undefined
})

Then(
  'Customer should receive estimated time of arrival between {int} and {int} for product {string}',
  function (min, max, product_code) {
    expect(this.state.customer.offersByProduct[product_code].estimatedTimeOfArrival).not.to.be
      .undefined
    expect(
      Number.parseInt(this.state.customer.offersByProduct[product_code].estimatedTimeOfArrival),
    ).to.be.within(min, max)
  },
)

Then(
  'Deliverer {string} should get {int} offer for product {string} with price {string}',
  function (deliverer, offers, product_code, price) {
    expect(this.lastResponse.data[product_code]).not.to.be.undefined
    expect(this.lastResponse.data[product_code].unit_price).to.equal(price)
  },
)

Then(
  'Deliverer {string} should get {int} offer for product {string} with available quantity {int}',
  function (deliverer, offers, product_code, available_quantity) {
    expect(this.lastResponse.data[product_code]).not.to.be.undefined
    expect(this.lastResponse.data[product_code].available_quantity).to.equal(available_quantity)
  },
)

Then('Deliverer {string} should get zero offers for product {string}', function (
  deliverer,
  product_code,
) {
  expect(this.lastResponse.data[product_code]).to.be.undefined
})
