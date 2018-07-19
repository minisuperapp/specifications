const config = require('config')
let socket

const create = () => {
  const io = require('socket.io-client')
  socket = io(config.deliverer_api_host, { query: "is-test=true" })
  return socket
}

module.exports = {
  create
}
