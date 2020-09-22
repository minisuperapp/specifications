const config = require('../config')
require('dotenv').config()
const redis = require('thunk-redis')
const { Before, After, AfterAll } = require('cucumber')
const Bluebird = require('bluebird')
const Knex = require('knex')
const KnexFile = require('./knexfile')
const knex = Knex(KnexFile)
const redisClient = redis.createClient(config.redis_host, {
  authPass: config.redis_pass,
  usePromise: Bluebird,
  returnBuffers: false,
  maxAttempts: Infinity,
  retryMaxDelay: 15 * 1000,
  noDelay: true,
})

Before(async function (testCase) {
  this.knex = knex
  this.currentProductOffers = {}
  this.delivererSockets = {}
  this.createCustomerSocket(config.mocks.customerLocation) // For socket exception detection
  this.createDelivererSocket('') // For socket exception detection
})

After(async function (testCase) {
  await redisClient.flushall()
  this.customerSockets.map(s => s.disconnect())
  Object.keys(this.delivererSockets).map(d => this.delivererSockets[d].disconnect())
  this.customerSockets = {}
  this.delivererSockets = {}
  this.socketExceptions.map(e => {
    throw new Error(e)
  })
  this.socketExceptions = []
  this.socketLocks = this.initSocketLocks
  this.state = this.initState
  await truncate_tables()
})

async function truncate_tables() {
  await knex.raw(
    `TRUNCATE TABLE 
    orders, 
    order_details, 
    order_times, 
    customer_addresses, 
    customer_locations, 
    customers, 
    deliverers,
    offers,
    tokens,
    product_wishes,
    deliverer_preferences CASCADE`,
  )
}

AfterAll(async function () {
  await redisClient.flushall()
  await truncate_tables()
  await knex.destroy()
  await redisClient.quit()
})
