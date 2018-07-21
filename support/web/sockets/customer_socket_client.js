const config = require('config')
const io = require('socket.io-client')

let socket

const connect = () => {
  socket = io(config.customer_api_host, {
    query: `customerLocation=${JSON.stringify(config.mocks.customerLocation)}`,
  })
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
  connect,
  emit,
  on,
  disconnect,
}
