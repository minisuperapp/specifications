const config = require('../config')
const redis = require('thunk-redis')
const { Before, AfterAll } = require('cucumber')
const Bluebird = require('bluebird')
const redisClient = redis.createClient(config.redis_host, {
  usePromise: Bluebird,
  returnBuffers: false,
  maxAttempts: Infinity,
  retryMaxDelay: 15 * 1000,
  noDelay: true,
})

Before(async function (testCase) {
  return await redisClient.flushall()
})

AfterAll(async function () {
  return await redisClient.quit()
})
