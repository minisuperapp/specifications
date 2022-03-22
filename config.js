module.exports = {
  redis_host: process.env.REDISCLOUD_URL || 'localhost:16379',
  redis_pass: process.env.REDISCLOUD_PASS || '',
  customer_api_host: `${process.env.CUSTOMER_API_URL || 'http://localhost:3000'}`,
  deliverer_api_host: `${process.env.DELIVERER_API_URL || 'http://localhost:3001'}`,
  api_functions_host: `${process.env.API_FUNCTIONS_URL || 'http://localhost:3003'}`,
  sam_api_host: `${process.env.SAM_API_URL || 'http://localhost:4001'}`,
  mocks: {
    customerLocation: {
      latitude: '28.1867348',
      longitude: '-105.4608849',
    },
  },
}
