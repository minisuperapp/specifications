const config = require('../config')
const redis = require('thunk-redis')
const { Before, AfterAll } = require('cucumber')
const Bluebird = require('bluebird')
const CustomerApiCleanRequest = require('./requests/customer-api/clean')
const apiRequester = require('support/api_requester')
const redisClient = redis.createClient(config.redis_host, {
  usePromise: Bluebird,
  returnBuffers: false,
  maxAttempts: Infinity,
  retryMaxDelay: 15 * 1000,
  noDelay: true,
})

Before(async function (testCase) {
  // await apiRequester.send(new CustomerApiCleanRequest.Builder().build())
  return await redisClient.flushall()
})

AfterAll(async function () {
  // await apiRequester.send(new CustomerApiCleanRequest.Builder().build())
  return await redisClient.quit()
})
