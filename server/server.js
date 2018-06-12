const path = require('path');
const http = require('http');
const express = require('express');
const socketIO =  require('socket.io');

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);

var io = socketIO(server);

io.on('connection',(socket) => {
    console.log('new user connected');

    socket.emit('newMessage', 
    {from: 'Admin',
    text: "Welcome to the chat app",
    createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
    from: 'admin',
    text:  'new user joined chat',
    createdAt: new Date().getTime()
});

socket.on('createMessage', (message) => {
    console.log('created new message',message);
     io.emit('newMessage',{
         from: message.from,
         text: message.text,
         createdAt: new Date().getTime()
     })
    // socket.broadcast.emit('newMessage', {
    //     from:  message.from,
    //     text:  message.text,
    //     createdAt: new Date().getTime()
    //})
    });


socket.on('disconnect', () => {
    console.log('User was disconnected');
});

});

app.use(express.static(publicPath));

const port = process.env.PORT || 3000;

server.listen(port ,() => {
    console.log(`Started on port ${port}`);
});
