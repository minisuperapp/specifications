const { Given, When, Then } = require("cucumber")
const OffersRequest = require("support/requests/customer-api/offers")
const { expect } = require("chai")
const R = require("ramda")

When("I send request to get offers", async function() {
  const request = new OffersRequest.Builder().build()
  await this.send(request)
})

Then("I should receive at least one offer", function() {
  expect(this.lastResponse.data).not.to.be.empty
})

Then("all offers should have an id, price, and estimated arrival time", function() {
  const offersWithMissingDetails = R.compose(
    R.filter(o => !o.id),
    R.filter(o => !o.price),
    R.filter(o => !o.estimated_arrival_time),
  )(this.lastResponse.data)

  expect(offersWithMissingDetails).to.be.empty
})

Then("all offers should have the deliverer name, reputation, and last rating", function() {
  const deliverersWithMissingDetails = R.compose(
    R.filter(o => !o.deliverer.name),
    R.filter(o => !o.deliverer.reputation),
    R.filter(o => !o.deliverer.last_rating),
  )(this.lastResponse.data)

  expect(deliverersWithMissingDetails).to.be.empty
})

Then("offers should be ordered by estimated arrival time", function() {
  const arrivalTimes = R.map(
    o => o.estimated_arrival_time,
    this.lastResponse.data
  )
  const sortedArrivalTimes = R.sort((a, b) => a - b, arrivalTimes)

  expect(arrivalTimes).to.deep.equal(sortedArrivalTimes)
})
