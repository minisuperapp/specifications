const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')
const R = require('ramda')

Then(
  'the offer location for product {string} should be updated to {string}, {string}',
  async function(product, latitude, longitude) {
    await this.awaitOn(() => this.state.customer.offersByProduct[product])
    const offerId = this.state.customer.offersByProduct[product].offers[0].id
    await this.awaitOn(() => this.state.customer.offersById[offerId])
    await this.awaitForSocket('updateOfferLocation')
    expect(this.state.customer.offersById[offerId]).not.to.be.undefined
    expect(this.state.customer.offersById[offerId].latitude).to.equal(latitude)
    expect(this.state.customer.offersById[offerId].longitude).to.equal(longitude)
  },
)
