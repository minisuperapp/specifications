const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')

Then(
  'Customer should receive single error message with property {string} and message {string}',
  function(property, message) {
    expect(this.lastResponse.errors.length).to.equal(1)
    expect(
      this.lastResponse.errors[0].property,
      JSON.stringify(this.lastResponse).substring(0, 1000),
    ).to.equal(property)
    expect(
      this.lastResponse.errors[0].message,
      JSON.stringify(this.lastResponse).substring(0, 1000),
    ).to.equal(message)
  },
)
