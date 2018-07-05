const io = require('socket.io-client')

let socket

const connect = () => {
  socket = io(`${process.env.DELIVERER_API_URL || 'http://localhost:3001'}`)
}

const emit = (event, data) => {
  socket.emit(event, data)
}

const on = (event, func) => {
  socket.on(event, func)
}

const disconnect = () => {
  socket.disconnect()
}

module.exports = {
  connect, emit, on, disconnect
}
