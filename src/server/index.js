var app = require('http').createServer()
var io = module.exports.io = require('socket.io')(app);

const SocketManager = require('./SocketManager');
const PORT = process.env.PORT || 3001;

io.on('connection', SocketManager);

app.listen(PORT, function(){
    console.log('Connected to port:' + PORT);
});
