var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

//app.use(express.static(__dirname + '/public'));

const SocketManager = require('./SocketManager');

app.get('/', function (req, res) {
    res.render('src/index')
})

io.on('connection', SocketManager);

server.listen(port, () => {
    console.log("Connected to port: " + port);
});