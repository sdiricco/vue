const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require("socket.io");
const CircularBuffer = require("circular-buffer");

var messageBuffer = new CircularBuffer(1000);

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors:{
    origins: '*'  
  }
});


const ADDRESS = process.env.ADDRESS || 'localhost';
const PORT = process.env.PORT || 5555;
const URL = `http://${ADDRESS}:${PORT}`;

app.use(cors());

app.get('/', (req, res) => {
  res.json({
    welcome: `Visit ${URL}/random to get a random number`
  });
});

app.get('/random', (req, res) => {
  setTimeout(() => {
    res.json({
      number: Math.random()
    });
  }, 500);
});

io.on('connection', (socket) => {

  console.log(`${socket.id} join..`);

  io.emit("newUserConnected", {id: socket.id});

  const allClients = [...io.sockets.sockets.keys()];
  io.emit("allUsers", {data: allClients});

  socket.emit("join", {id: socket.id});

  const messages = messageBuffer.toarray();
  socket.emit("allMessages", {data: messages})

  socket.on("message", ({message = ""} = {}) => {
    const data = {
      message: message,
      timestamp: new Date(),
      id: socket.id
    }
    messageBuffer.push(data);
    const messages = messageBuffer.toarray();
    io.emit("allMessages", {data: messages})
  })
  socket.on("disconnect", () => {
    const allClients = [...io.sockets.sockets.keys()];
    io.emit("allUsers", {data: allClients});
    console.log(`${socket.id} leave..`)
  });
});


server.listen(PORT, ADDRESS, () => {
  console.log(`Listening on ${URL}`);
});





