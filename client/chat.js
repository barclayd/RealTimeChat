const socket = io.connect('http://localhost:4000');
// Query DOM
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const sendBtn = document.getElementById('send');
const output = document.getElementById('output');


// Emit events
sendBtn.addEventListener('click', () => {
    socket.emit('chatMessage', {
        message: message.value,
        handle: handle.value
    });
});

// Listen for events
socket.on('chatMessage', (data) => {
    output.innerHTML += '<p><strong>'+ data.handle +': </strong>'+ data.message+ '</p>';
});
