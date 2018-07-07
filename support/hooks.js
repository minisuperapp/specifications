const config = require('../config')
require('dotenv').config()
const redis = require('thunk-redis')
const { BeforeAll, Before, After, AfterAll } = require('cucumber')
const Bluebird = require('bluebird')
const DelivererApiCleanRequest = require('./requests/deliverer-api/clean')
const apiRequester = require('support/api_requester')
const Knex = require('knex')
const KnexFile = require('./knexfile')
const knex = Knex(KnexFile)
const socket = require('./socket')
const redisClient = redis.createClient(config.redis_host, {
  usePromise: Bluebird,
  returnBuffers: false,
  maxAttempts: Infinity,
  retryMaxDelay: 15 * 1000,
  noDelay: true,
})

BeforeAll(async function() {
  socket.connect()
})

Before(async function(testCase) {
  this.currentProductOffers = {}
  this.sendCustomerLocation(this.currentLocation.latitude, this.currentLocation.longitude)
})

After(async function(testCase) {
  await redisClient.flushall()
  await knex('deliverers').del()
  return await knex('customers').del()
})

AfterAll(async function() {
  socket.disconnect()
  await redisClient.flushall()
  await knex('deliverers').del()
  await knex('customers').del()
  await knex.destroy()
  return await redisClient.quit()
})
