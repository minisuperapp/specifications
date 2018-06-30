const config = require('../config')
require('dotenv').config()
const redis = require('thunk-redis')
const { Before, AfterAll } = require('cucumber')
const Bluebird = require('bluebird')
const DelivererApiCleanRequest = require('./requests/deliverer-api/clean')
const apiRequester = require('support/api_requester')
const io = require('socket.io-client')
const socket = io(`${process.env.CUSTOMER_API_URL || 'http://localhost:3000'}`)
const Knex = require('knex')
const KnexFile = require('./knexfile')
const knex = Knex(KnexFile)
const redisClient = redis.createClient(config.redis_host, {
  usePromise: Bluebird,
  returnBuffers: false,
  maxAttempts: Infinity,
  retryMaxDelay: 15 * 1000,
  noDelay: true,
})

Before(async function(testCase) {
  socket.emit('socketping')
  socket.on('socketpong', () => {
    console.log('received, sending...')
  })
  await knex('deliverers').del()
  return await redisClient.flushall()
})

AfterAll(async function() {
  socket.disconnect()
  await knex('deliverers').del()
  await knex.destroy()
  return await redisClient.quit()
})
