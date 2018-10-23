const socket = io.connect('http://localhost:4000');
// Query DOM

const [ message, handle, sendBtn, output, feedback ] = [
    document.getElementById('message'),
    document.getElementById('handle'),
    document.getElementById('send'),
    document.getElementById('output'),
    document.getElementById('feedback')];

// Send chat message when button is clicked
sendBtn.addEventListener('click', () => {
        socket.emit('chatMessage', {
            message: message.value,
            handle: handle.value
        });
        message.value = '';
});

// send chat message when return key is pressed
message.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        socket.emit('chatMessage', {
            message: message.value,
            handle: handle.value
        });
        message.value = '';
    }
});


// Listen for keypress in message field
message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});

// Listen for end of user typing a message field

// Listen for new chat messages
socket.on('chatMessage', (data) => {
    // flush out user is typing message after displaying sent message
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong>${data.handle}</strong>: ${data.message}</p>`;
});

// Listen for users typing a new message
socket.on('typing', (data) => {
    feedback.innerHTML = `<p><em>${data} is typing...</em></p>`;
});
