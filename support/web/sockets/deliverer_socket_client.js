const config = require('config')
let socket

const create = deliverer_session_token => {
  const io = require('socket.io-client')
  socket = io(config.deliverer_api_host, {
    query: 'is-test=true',
    transportOptions: {
      polling: {
        extraHeaders: {
          cookie: `deliverer_session_token=${deliverer_session_token}`,
        },
      },
    },
  })
  return socket
}

module.exports = {
  create,
}
