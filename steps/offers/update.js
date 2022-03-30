const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')
const DeleteOfferRequest = require('support/web/requests/deliverer-api/offers/delete')

Given('Customer subscribes to get offers updates', async function () {
  await this.subscribeToTopic()
})

Given(
  'Customer subscribes to get offers updates with location {string}, {string}',
  async function (latitude, longitude) {
    const socket = this.createCustomerSocket()
    socket.emit('subscribe_for_offers_updates', { latitude, longitude })
    await this.sleep(300)
  },
)

When('Deliverer {string} deletes the last published offer', async function (deliverer) {
  const request = new DeleteOfferRequest.Builder(deliverer)
    .withOfferId(this.lastResponse.data.code)
    .build()
  await this.send(request)
})

Then(
  'the offer location for product {string} should be updated to {string}, {string}',
  async function (product, latitude, longitude) {
    await this.awaitOn(() => this.state.customer.offersByProduct[product])
    const offerId = this.state.customer.offersByProduct[product].offers[0].id
    await this.awaitOn(() => this.state.customer.offersById[offerId])
    await this.awaitForSocket('updateOfferLocation')
    expect(this.state.customer.offersById[offerId]).not.to.be.undefined
    expect(this.state.customer.offersById[offerId].latitude).to.equal(latitude)
    expect(this.state.customer.offersById[offerId].longitude).to.equal(longitude)
  },
)
