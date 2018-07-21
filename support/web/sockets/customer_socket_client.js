const config = require('config')
const io = require('socket.io-client')

let socket

const connect = (customerLocation) => {
  socket = io(config.customer_api_host, {
    query: `customerLocation=${JSON.stringify(customerLocation)}`,
  })
}

const emit = (event, data) => {
  socket.emit(event, data)
}

const on = (event, func) => {
  socket.on(event, func)
}

const disconnect = () => {
  if (socket) {
    socket.disconnect()
  }
}

module.exports = {
  connect,
  emit,
  on,
  disconnect,
}
