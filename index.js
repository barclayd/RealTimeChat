const express = require('express');
const webSocket = require('socket.io');
const app = express();
const port = 4000;
const server = app.listen(port, () => {
    console.log(`App is up and ready, listening on port ${port}`);
});

app.use(express.static('public'));

// webSocket set-up
const io = webSocket(server);

io.on('connection', (socket) => {
    console.log('A user connected with socket id:', socket.id);
    socket.on('disconnect', () => {
        console.log('A user disconnected with socket id:', socket.id);
    });
});
