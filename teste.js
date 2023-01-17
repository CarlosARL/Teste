const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
    //console.log(`New client connected: ${socket.id}`)
    var data = "CARLOS LOSADA JUNIOR";
    {
        io.emit('data', data);
        console.log(data)
        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${data}`)
        })
    }
})

server.listen(3000, () => {
    console.log('Server listening on port 3000')
})
