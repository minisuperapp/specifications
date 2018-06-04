const { Given, When, Then } = require('cucumber')
const AddOfferRequest = require('support/requests/deliverer-api/offer/add')
const { expect } = require('chai')
const R = require('ramda')

Given('Deliverer {string} adds a new offer for product {int}', async function(
  deliverer,
  productId,
) {
  const request = new AddOfferRequest.Builder(deliverer).withProductId(productId).build()
  await this.send(request)
})

Given(
  'Deliverer {string} adds a new offer for product {int} with location {string}, {string} and delivery radius of {int} KM',
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
