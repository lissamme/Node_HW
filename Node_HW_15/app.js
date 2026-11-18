const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("message", (message) => {
    if (typeof message !== "string" || !message.trim()) return;

    const text = message.trim().slice(0, 1000);
    console.log("Message received:", text);

    socket.emit("confirmation", "Server received your message: " + text);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
