const { Given, When, Then } = require('cucumber')
const OffersRequest = require('support/requests/customer-api/offers')
const { expect } = require('chai')
const R = require('ramda')

When('I send request to get product offers', async function () {
  const request = new OffersRequest.Builder()
    .build()
  await this.send(request)
})

Then('all offers should have an id', function () {
  const offersWithNoEstimatedPrice = R.filter(o => !o.id, this.lastResponse.data)

  expect(offersWithNoEstimatedPrice).to.be.empty
})

Then('all offers should have a name', function () {
  const offersWithNoEstimatedPrice = R.filter(o => !o.name, this.lastResponse.data)

  expect(offersWithNoEstimatedPrice).to.be.empty
})

Then('all offers should have an estimated price', function () {
  const offersWithNoEstimatedPrice = R.filter(o => !o.estimated_price, this.lastResponse.data)

  expect(offersWithNoEstimatedPrice).to.be.empty
})

Then('all offers should have an estimated delivery time', function () {
  const offersWithNoEstimatedPrice = R.filter(o => !o.estimated_delivery_time, this.lastResponse.data)

  expect(offersWithNoEstimatedPrice).to.be.empty
})

Then('all offers should have an image url', function () {
  const offersWithNoEstimatedPrice = R.filter(o => !o.image_url, this.lastResponse.data)

  expect(offersWithNoEstimatedPrice).to.be.empty
})
