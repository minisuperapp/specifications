module.exports = {
  redis_host: process.env.REDISCLOUD_URL || 'localhost:16379',
  deliverer_api_host: `${process.env.DELIVERER_API_URL || 'http://localhost:3001'}`,
}
