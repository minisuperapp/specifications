const { Given, When, Then } = require('cucumber')
const AddOfferRequest = require('support/requests/deliverer-api/offer/add')
const UpdateOfferLocationRequest = require('support/requests/deliverer-api/offer/update_location')
const { expect } = require('chai')
const R = require('ramda')

Given('Deliverer {string} adds a new offer for product {string}', async function(
  deliverer,
  productId,
) {
  const request = new AddOfferRequest.Builder(deliverer).withProductId(productId).build()
  await this.send(request)
})

Given(
  'Deliverer {string} adds a new offer for product {string} with location {string}, {string} and delivery radius of {int} KM',
  async function(deliverer, productId, latitude, longitude, deliveryRadius) {
    const request = new AddOfferRequest.Builder(deliverer)
      .withProductId(productId)
      .withDelivererLocationLatitude(latitude)
      .withDelivererLocationLongitude(longitude)
      .withDeliveryRadius(deliveryRadius)
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
  const request = new UpdateOfferLocationRequest.Builder(deliverer)
    .withLocationLatitude(latitude)
    .withLocationLongitude(longitude)
    .build()
  await this.send(request)
})
