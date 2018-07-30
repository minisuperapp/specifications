const R = require('ramda')
const config = require('config')
const { Given, When, Then } = require('cucumber')
const { expect } = require('chai')

Given('Customer subscribes to get offers updates', async function() {
  const socket = this.createCustomerSocket()
  socket.emit('subscribe_for_offers_updates', config.mocks.customerLocation)
  await this.sleep(300)
})

Given('Customer subscribes to get offers updates with location {string}, {string}', async function(
  latitude,
  longitude,
) {
  const socket = this.createCustomerSocket()
  socket.emit('subscribe_for_offers_updates', { latitude, longitude })
  await this.sleep(300)
})

Given('Customer subscribes to get order updates', async function() {
  const socket = this.createCustomerSocket()
  socket.emit('subscribe_for_order_updates', this.lastPlacedOrderId)
  await this.sleep(300)
})

Given('Customer disconnects subscription for updates', async function() {
  await this.sleep(200)
  const lastCustomerSocket = this.customerSockets[this.customerSockets.length - 1]
  lastCustomerSocket.disconnect()
})
