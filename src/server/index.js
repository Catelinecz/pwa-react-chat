const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = module.exports.io = require('socket.io')(server)

const PORT = process.env.PORT || 8080

const SocketManager = require('./SocketManager');
app.get('/', function (req, res) {
    res.sendFile(__dirname + '../../build/index.html');
});

io.on('connection', SocketManager);

app.listen(PORT, function(){
    console.log('Connected to port:' + PORT);
});
