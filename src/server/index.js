const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = module.exports.io = require('socket.io')(server);

const PORT = process.env.PORT || 8080;

const SocketManager = require('./SocketManager');

app.use(express.static(path.join(__dirname, '../../build')));
app.get('/', (req, res, next) => {
    res.sendFile(__dirname + './index.html');
});

io.on('connection', SocketManager);

server.listen(PORT, function(){
    console.log('Connected to port:' + PORT);
});
