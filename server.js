const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

const path = require("path");

// Serve de index.html vanuit de rootmap
app.use(express.static(path.join(__dirname)));

io.on("connection", (socket) => {
  console.log("Gebruiker verbonden");

  socket.on("join", (username) => {
    console.log(`${username} is aangesloten`);
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

const PORT = process.env.PORT || 10000;
http.listen(PORT, () => {
  console.log(`Chat server draait op poort ${PORT}`);
});
