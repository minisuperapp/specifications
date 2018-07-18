let socket

const create = () => {
  const io = require('socket.io-client')
  socket = io(`${process.env.DELIVERER_API_URL || 'http://localhost:3001'}`)
  return socket
}

module.exports = {
  create
}
