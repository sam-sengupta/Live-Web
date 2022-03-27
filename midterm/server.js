console.log("Hello!!!");

var express = require('express');
var app = express();

var port = process.env.PORT || 3000;
var server = app.listen(port);

app.use(express.static('public'));
var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', (socket) => {
    console.log("new connection!!" + socket.id);

    // Events & Handlers
    socket.on('pattern', (data) => {
        // From Server to Clients (except the client that sent this message)
        socket.broadcast.emit('pattern', data);

    });

    // Example - Send from Server to Clients
    // - No initiation from client
    // setInterval(() => {
    //     // Every Ten SEconds
    //     // From Server to Client / Clients 
    //     socket.emit("tenSeconds")
    // }, 3000)

    // From Client To Server To All Clients (4 Steps)
    // - 2 - Receive from client
    socket.on('pattern', (data) => {
        // 3a - send to other clients (including oneself)
        socket.emit("pattern", data)
        // 3b - send to other clients (excluding oneself) //
        // socket.broadcast.emit("pattern", data)
    })
});


