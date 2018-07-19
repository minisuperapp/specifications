const config = require('../config')
require('dotenv').config()
const redis = require('thunk-redis')
const { BeforeAll, Before, After, AfterAll } = require('cucumber')
const Bluebird = require('bluebird')
const DelivererApiCleanRequest = require('./web/requests/deliverer-api/clean')
const apiRequester = require('./web/api_requester')
const Knex = require('knex')
const KnexFile = require('./knexfile')
const knex = Knex(KnexFile)
const customerSocket = require('./web/sockets/customer_socket_client')
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
  await knex('orders').truncate()
  await knex('order_times').truncate()
  await knex('customers').truncate()
  await knex('deliverers').truncate()
})

AfterAll(async function() {
  customerSocket.disconnect()
  await redisClient.flushall()
  await knex('orders').truncate()
  await knex('order_times').truncate()
  await knex('customers').truncate()
  await knex('deliverers').truncate()
  await knex.destroy()
  await redisClient.quit()
})
