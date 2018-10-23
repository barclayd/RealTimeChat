const express = require('express');
const socket = require('socket.io');
const app = express();
const port = 4000;
const server = app.listen(port, () => {
    console.log(`App is up and ready, listening on port ${port}`);
});

app.use(express.static('client'));

// socket set-up
const io = socket(server);

io.on('connection', (socket) => {
    console.log('User connected with socket id:', socket.id);
    // handle new chat message
    socket.on('chatMessage', (data) => {
        io.sockets.emit('chatMessage', data);
    });
    // handle typign
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    });

    // socket.on('disconnect', () => {
    //     console.log('User disconnected with socket id:', socket.id);
    // });
});
