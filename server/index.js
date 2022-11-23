const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// io.on('connection', (socket) => {
//   console.log(`User Connected: ${socket.id}`);
//   socket.on('send_message', (data) => {
//     socket.broadcast.emit('receive_message', data);
//   });
// });

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    console.log('join한 방번호는 ' + data);
    socket.join(data);
  });

  socket.on('send_message', (data) => {
    console.log('메세지온 것이 ' + data.message + ', 메세지 보낸놈 방번호는  ' + data.room);
    socket.to(data.room).emit('receive_message', data);
  });
});

server.listen(3001, () => {
  console.log('3001 port, SERVER is running');
});
