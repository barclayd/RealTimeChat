const express = require('express');
const webSocket = require('socket.io');
const app = express();
const port = 4000;
const server = app.listen(port, () => {
    console.log(`App is up and ready, listening on port ${port}`);
});

app.use(express.static('client'));

// webSocket set-up
const io = webSocket(server);

io.on('connection', (socket) => {
    console.log('User connected with socket id:', socket.id);

    socket.on('chatMessage', (data) => {
        io.sockets.emit('chatMessage', data);
    });

    // socket.on('disconnect', () => {
    //     console.log('User disconnected with socket id:', socket.id);
    // });
});
