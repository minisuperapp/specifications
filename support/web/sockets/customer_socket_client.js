const config = require('config')
let socket

const create = (location) => {
  const io = require('socket.io-client')
  socket = io(config.customer_api_host, {
    query: `customerLocation=${JSON.stringify(location)}`,
  })
  return socket
}

module.exports = {
  create
}
