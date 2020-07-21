const { Given, When, Then } = require('cucumber')
const PublishOfferRequest = require('support/web/requests/deliverer-api/offers/publish')

Given('Deliverer {string} publishes a new offer for product {string}', async function(
  deliverer,
  product_code,
) {
  const request = new PublishOfferRequest.Builder(deliverer).withProductCode(product_code).build()
  await this.send(request)
})

Given(
  'Deliverer {string} publishes a new offer for product {string} with price {string}',
  async function(deliverer, product_code, unitPrice) {
    const request = new PublishOfferRequest.Builder(deliverer)
      .withProductCode(product_code)
      .withUnitPrice(unitPrice)
      .build()
    await this.send(request)
  },
)

Given(
  'Deliverer {string} publishes a new offer for product {string} with price {string} with location {string}, {string} and delivery radius of {int} M',
  async function(deliverer, product_code, unitPrice, latitude, longitude, delivererRadius) {
    const request = new PublishOfferRequest.Builder(deliverer)
      .withProductCode(product_code)
      .withUnitPrice(unitPrice)
      .withDelivererLocationLatitude(latitude)
      .withDelivererLocationLongitude(longitude)
      .withDeliveryRadius(delivererRadius)
      .build()
    await this.send(request)
  },
)

Given(
  'Deliverer {string} publishes a new offer for product {string} with location {string}, {string} and delivery radius of {int} M',
  async function(deliverer, product_code, latitude, longitude, deliveryRadius) {
    const request = new PublishOfferRequest.Builder(deliverer)
      .withProductCode(product_code)
      .withDelivererLocationLatitude(latitude)
      .withDelivererLocationLongitude(longitude)
      .withDeliveryRadius(deliveryRadius)
      .build()
    await this.send(request)
  },
)

Given(
  'Deliverer {string} publishes a new offer for product {string} with price {string} and available quantity of {string}',
  async function(deliverer, product_code, unitPrice, availableQuantity) {
    const request = new PublishOfferRequest.Builder(deliverer)
      .withProductCode(product_code)
      .withUnitPrice(unitPrice)
      .withAvailableQuantity(availableQuantity)
      .build()
    await this.send(request)
  },
)

Given(
  'Deliverer {string} publishes a new offer for product {string} and available quantity of {string}',
  async function(deliverer, product_code, availableQuantity) {
    const request = new PublishOfferRequest.Builder(deliverer)
      .withProductCode(product_code)
      .withAvailableQuantity(availableQuantity)
      .build()
    await this.send(request)
  },
)

When('Deliverer {string} publishes a new offer', async function(deliverer) {
  const request = new PublishOfferRequest.Builder(deliverer).build()
  await this.send(request)
})
