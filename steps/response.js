const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')

Then('Customer should receive successful response', function () {
  expect(this.lastResponse.success, JSON.stringify(this.lastResponse).substring(0,1000)).to.be.true
})

Then('Customer should receive unsuccessful response', function () {
  expect(this.lastResponse.success, JSON.stringify(this.lastResponse).substring(0,1000)).to.be.false
})

Then('Deliverer should receive successful response', function () {
  expect(this.lastResponse.success, JSON.stringify(this.lastResponse).substring(0,1000)).to.be.true
})

Then('Deliverer should receive a 401 error response', function () {
  expect(this.lastResponse.status, JSON.stringify(this.lastResponse)).to.equal(401)
})

Then('Deliverer should receive unsuccessful response', function () {
  expect(this.lastResponse.success, JSON.stringify(this.lastResponse)).to.be.false
})

Then('I should not receive unsuccessful response', function () {
  expect(this.lastResponse.success, JSON.stringify(this.lastResponse)).to.be.undefined ||
  expect(this.lastResponse.success, JSON.stringify(this.lastResponse)).to.be.true
})
