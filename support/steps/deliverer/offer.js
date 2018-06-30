const { Given, When, Then } = require('cucumber')
const AddOfferRequest = require('support/requests/deliverer-api/offer/add')
const UpdateOfferLocationRequest = require('support/requests/deliverer-api/offer/update_location')
const { expect } = require('chai')
const R = require('ramda')

Given('Deliverer {string} adds a new offer for product {string}', async function(
  deliverer,
  productCode,
) {
  const request = new AddOfferRequest.Builder(deliverer).withProductCode(productCode).build()
  await this.send(request)
})

Given(
  'Deliverer {string} adds a new offer for product {string} with location {string}, {string} and delivery radius of {int} KM',
  async function(deliverer, productCode, latitude, longitude, deliveryRadius) {
    const request = new AddOfferRequest.Builder(deliverer)
      .withProductCode(productCode)
      .withDelivererLocationLatitude(latitude)
      .withDelivererLocationLongitude(longitude)
      .withDeliveryRadius(deliveryRadius)
      .build()
    await this.send(request)
  },
)

Given(
  'Deliverer {string} adds a new offer for product {string} and available quantity of {string}',
  async function(deliverer, productCode, availableQuantity) {
    const request = new AddOfferRequest.Builder(deliverer)
      .withProductCode(productCode)
      .withAvailableQuantity(availableQuantity)
      .build()
    await this.send(request)
  },
)

When('Deliverer {string} adds a new offer', async function(deliverer) {
  const request = new AddOfferRequest.Builder(deliverer).build()
  await this.send(request)
})

When('Deliverer {string} updates offer location', async function(deliverer) {
  const request = new UpdateOfferLocationRequest.Builder(deliverer).build()
  await this.send(request)
})

When('Deliverer {string} updates offer location to {string}, {string}', async function(
  deliverer,
  latitude,
  longitude,
) {
  const offerId = this.delivererOfferMap[deliverer]
  const request = new UpdateOfferLocationRequest.Builder(deliverer)
    .withOfferId(offerId)
    .withLocationLatitude(latitude)
    .withLocationLongitude(longitude)
    .build()
  await this.send(request)
})
