const config = require('config')
let socket

const create = (customer_session_token) => {
  const io = require('socket.io-client')
  socket = io(config.customer_api_host, {
    query: 'is-test=true',
    transportOptions: {
      polling: {
        extraHeaders: {
          cookie: `customer_session_token=${customer_session_token}`,
        },
      },
    },
  })
  return socket
}

module.exports = {
  create,
}
