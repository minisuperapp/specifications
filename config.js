module.exports = {
  redis_host: process.env.REDISCLOUD_URL || 'localhost:16379',
  redis_pass: process.env.REDISCLOUD_PASS || '',
  customer_api_host: `${process.env.CUSTOMER_API_URL || 'http://localhost:3000'}`,
  deliverer_api_host: `${process.env.DELIVERER_API_URL || 'http://localhost:3001'}`,
  mocks: {
    customerLocation: {
      latitude: '28.1867048',
      longitude: '-105.4600849',
    },
  },
}
