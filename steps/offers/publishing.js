const { Given, When, Then } = require('cucumber')
const PublishOfferRequest = require('support/requests/deliverer-api/offer/publish')
const UpdateOfferLocationRequest = require('support/requests/deliverer-api/offer/update_location')
const { expect } = require('chai')
const R = require('ramda')

Given('Deliverer {string} publishes a new offer for product {string}', async function(
  deliverer,
  productCode,
) {
  const request = new PublishOfferRequest.Builder(deliverer).withProductCode(productCode).build()
  await this.send(request)
})

Given(
  'Deliverer {string} publishes a new offer for product {string} with price {string}',
  async function(deliverer, productCode, unitPrice) {
    const request = new PublishOfferRequest.Builder(deliverer)
      .withProductCode(productCode)
      .withUnitPrice(unitPrice)
      .build()
    await this.send(request)
  },
)

Given(
  'Deliverer {string} publishes a new offer for product {string} with price {string} with location {string}, {string} and delivery radius of {int} KM',
  async function(deliverer, productCode, unitPrice, latitude, longitude, delivererRadius) {
    const request = new PublishOfferRequest.Builder(deliverer)
      .withProductCode(productCode)
      .withUnitPrice(unitPrice)
      .withDelivererLocationLatitude(latitude)
      .withDelivererLocationLongitude(longitude)
      .withDeliveryRadius(delivererRadius)
      .build()
    await this.send(request)
  },
)

Given(
  'Deliverer {string} publishes a new offer for product {string} with location {string}, {string} and delivery radius of {int} KM',
  async function(deliverer, productCode, latitude, longitude, deliveryRadius) {
    const request = new PublishOfferRequest.Builder(deliverer)
      .withProductCode(productCode)
      .withDelivererLocationLatitude(latitude)
      .withDelivererLocationLongitude(longitude)
      .withDeliveryRadius(deliveryRadius)
      .build()
    await this.send(request)
  },
)

Given(
  'Deliverer {string} publishes a new offer for product {string} and available quantity of {string}',
  async function(deliverer, productCode, availableQuantity) {
    const request = new PublishOfferRequest.Builder(deliverer)
      .withProductCode(productCode)
      .withAvailableQuantity(availableQuantity)
      .build()
    await this.send(request)
  },
)

When('Deliverer {string} publishes a new offer', async function(deliverer) {
  const request = new PublishOfferRequest.Builder(deliverer).build()
  await this.send(request)
})

When('Deliverer {string} updates offer location', async function(deliverer) {
  const offerId = this.delivererOfferMap[deliverer]
  const request = new UpdateOfferLocationRequest.Builder(deliverer).withOfferId(offerId).build()
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
