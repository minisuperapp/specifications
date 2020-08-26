const { Given, When, Then } = require('cucumber')
const BestOfferAssigmentRequest = require('support/web/requests/customer-api/offers/assign_best')
const DiscardOfferAssigmentRequest = require('support/web/requests/customer-api/offers/discard_assigment')
const { expect } = require('chai')

Given(
  'Customer sends request to assign best offer for product {string} with quantity {string}',
  async function (product_code, quantity) {
    const request = new BestOfferAssigmentRequest.Builder()
      .withProductCode(product_code)
      .withQuantity(quantity)
      .build()
    await this.send(request)
  },
)

Given('Customer sends request to cancel last assigned offer', async function () {
  const request = new DiscardOfferAssigmentRequest.Builder()
    .withOfferId(this.state.customer.lastAssignedOfferId)
    .build()
  await this.send(request)
})

When('Customer sends request to assign best offer for product {string}', async function (
  product_code,
) {
  const request = new BestOfferAssigmentRequest.Builder().withProductCode(product_code).build()
  await this.send(request)
})

When('Customer sends request to assign best offer these products', async function (table) {
  const products = table.hashes()
  const builder = new BestOfferAssigmentRequest.Builder()
  products.forEach(product => {
    const { code, quantity } = product
    builder.withProductCodeAndQuantity(code, quantity)
  })
  const request = builder.build()
  await this.send(request)
})

Then(
  'Customer should receive an offer for product {string} from deliverer {string}',
  async function (product_code, deliverer_name) {
    const offers = Object.values(this.lastResponse.index)
    const offer = offers.find(offer => offer.product_code === product_code)
    expect(offer).not.to.be.undefined
    expect(offer.deliverer_name).to.equal(deliverer_name)
    expect(this.lastResponse.grouped_by_deliverer).not.to.be.undefined
    expect(this.lastResponse.grouped_by_deliverer.length).to.equal(2)
    expect(this.lastResponse.grouped_by_deliverer[0].length).to.equal(1)
    expect(this.lastResponse.grouped_by_deliverer[1].length).to.equal(1)

    expect(
      this.lastResponse.grouped_by_deliverer.find(grouped =>
        grouped.find(r => r.product_code === product_code),
      ),
    ).not.to.be.undefined
    expect(
      this.lastResponse.grouped_by_deliverer.find(grouped =>
        grouped.find(r => r.deliverer_name === deliverer_name),
      ),
    ).not.to.be.undefined
  },
)
