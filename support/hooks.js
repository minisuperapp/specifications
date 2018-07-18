const config = require('../config')
require('dotenv').config()
const redis = require('thunk-redis')
const { BeforeAll, Before, After, AfterAll } = require('cucumber')
const Bluebird = require('bluebird')
const DelivererApiCleanRequest = require('./requests/deliverer-api/clean')
const apiRequester = require('support/tools/api_requester')
const Knex = require('knex')
const KnexFile = require('./knexfile')
const knex = Knex(KnexFile)
const customerSocket = require('./customer_socket')
const redisClient = redis.createClient(config.redis_host, {
  usePromise: Bluebird,
  returnBuffers: false,
  maxAttempts: Infinity,
  retryMaxDelay: 15 * 1000,
  noDelay: true,
})

BeforeAll(async function() {
  customerSocket.connect()
})

Before(async function(testCase) {
  this.currentProductOffers = {}
  this.sendCustomerLocation(this.currentLocation.latitude, this.currentLocation.longitude)
})

After(async function(testCase) {
  await redisClient.flushall()
  Object.keys(this.delivererSockets).map(d => this.delivererSockets[d].disconnect())
  await knex('deliverers').del()
  await knex('orders').del()
  await knex('order_times').del()
  await knex('customers').del()
})

AfterAll(async function() {
  customerSocket.disconnect()
  await redisClient.flushall()
  await knex('deliverers').del()
  await knex('orders').del()
  await knex('order_times').del()
  await knex('customers').del()
  await knex.destroy()
  await redisClient.quit()
})
