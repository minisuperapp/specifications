const config = require('../config')
const redis = require('thunk-redis')
const { Before } = require('cucumber')
const Bluebird = require('bluebird')
const redisClient = redis.createClient(config.redis_host, {
  usePromise: Bluebird,
  returnBuffers: false,
  maxAttempts: Infinity,
  retryMaxDelay: 15 * 1000,
  noDelay: true,
})

Before(async function (testCase) {
  var world = this
  return await redisClient.flushall()
})
