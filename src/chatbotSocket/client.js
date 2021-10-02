const io = require('socket.io-client');

const socket = io(process.env.SOCKET_URL);

socket.on('connect', () => {
  console.log(`Client ${socket.id} connected!`);
});

socket.on('message', (message) => {
  console.log(message);
});
