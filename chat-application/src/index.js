const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const Filter = require("bad-words");
const { generateMessage } = require("./utils/messages");
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./utils/user");

const app = express();
const server = http.createServer(app);

const io = socketio(server);

const port = process.env.PORT || 3020;
const publicDirectoryPath = path.join(__dirname, "../public");

// let count = 0;

io.on("connection", (socket) => {
  console.log("New Web Socket Connection");

  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) {
      return callback(error);
    }
    socket.join(user.room);

    socket.emit("Message", generateMessage(user.username, "Welcome...!")); //sends to everyone
    socket.broadcast
      .to(user.room)
      .emit("Message", generateMessage(`${user.username} has joined...!`)); // send everone except the current user
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    callback();
  });

  //   socket.emit("countUpdated", count);

  socket.on("sendMsg", (msg, callback) => {
    const user = getUser(socket.id);
    const filter = new Filter();

    if (filter.isProfane(msg)) {
      return callback("Procifiancy is not allowed");
    }
    io.to(user.room).emit("Message", generateMessage(user.username, msg));
    callback();
  });

  socket.on("sendlocation", (coords, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("LocationMessage", {
      username: user.username,
      url: `https://google.com/maps?q=${coords.latitude},${coords.longitude}`,
      timestamp: new Date().getTime(),
    });
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        "Message",
        generateMessage(`${user.username} has left...!`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });

  //   socket.on("increment", () => {
  //     count++;
  //     //socket.emit("countUpdated", count); // cant get updated in other side soo
  //     io.emit("countUpdated", count);
  //   });
});

app.use(express.static(publicDirectoryPath));
server.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
