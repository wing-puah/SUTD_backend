const PORT = 3000;
const io = require('socket.io')(PORT);

console.log('Started server. Waiting for connections...');

io.on('connection', (socket) => {
  console.log('Connected!');
  socket.emit('message', 'Hello there!');

  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} disconnected!`);
  });

  setInterval(() => {
    const message = `The time now is ${new Date()}`;
    socket.emit('message', message);
  }, 1000);
});
