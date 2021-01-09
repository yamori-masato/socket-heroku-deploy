const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
let io = require('socket.io')(server)
const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

server.listen(PORT, () => {
  console.log('起動しました', 'http://localhost:', PORT)
})

io.sockets.on('connection', (socket) => {
  console.log('[接続]:', socket.client.id)

  socket.on('send', (data) => {
    io.emit('send', { msg: data.msg })
  })

  // disconnected
  socket.on('disconnect', () => {
    console.log('[切断]:', socket.client.id)
  })
})
