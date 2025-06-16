const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.get('/', (req, res) => {
  res.send('Fatbikeclub Chat Server is running');
});

io.on('connection', (socket) => {
  console.log('Gebruiker verbonden:', socket.id);

  socket.on('join', (username) => {
    console.log(`${username} is verbonden met de chat.`);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Gebruiker ontkoppeld:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Chat server draait op poort ${PORT}`);
});