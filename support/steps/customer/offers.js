const { Given, When, Then } = require('cucumber')
const OffersRequest = require('support/requests/customer-api/offers')
const { expect } = require('chai')
const R = require('ramda')

When('Customer send request to get offers for product {int}', async function(productId) {
  const request = new OffersRequest.Builder().withProductId(productId).build()
  await this.send(request)
})

When(
  'Customer send request to get offers for product {int} with location {string}, {string}',
  async function(productId, latitude, longitude) {
    const request = new OffersRequest.Builder()
      .withProductId(productId)
      .withCustomerLocationLatitude(latitude)
      .withCustomerLocationLongitude(longitude)
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
    o => !o.id || !o.price || !o.estimated_arrival_time,
    this.lastResponse.data,
  )

  expect(offersWithMissingDetails).to.be.empty
})

Then('the offer should have the deliverer name, reputation, and last rating', function() {
  const deliverersWithMissingDetails = R.filter(
    o => !o.deliverer.name || !o.deliverer.reputation || !o.deliverer.last_rating,
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
