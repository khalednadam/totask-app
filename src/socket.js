const app = require("./app");
const logger = require("./config/logger");
const http = require("http");
const server = http.createServer();
const io = require("socket.io")(server, {
  cors: { origin: "https://totask.app" }
});
io.on("connection", (socket) => {
  console.log("Hello from the socket.")
  socket.on("subscribe", (board) => {
    socket.join(board);
    console.log("Joined to ", board);
  })
  socket.on("unsubscribe", (boardId) => {
    socket.leave(boardId)
    console.log("left from: ", boardId);
  })
  // socket.to.broadcast.emit('change-in-board');
  socket.on('update-lists', (msg) => {
    io.to(msg).emit('update-lists', msg);
  });
  socket.on('change-board-info', (msg) => {
    io.to(msg).emit('change-board-info', msg);
  });

  socket.on('update-cards', (msg, listId) => {
    io.to(msg).emit('update-cards', listId);
  });

  socket.on('update-card', (cardId) => {
    io.to(cardId).emit('update-card', cardId);
  })

  socket.on('delete-card', (cardId) => {
    io.to(cardId).emit('delete-card', cardId);
  })

  // test
  logger.info("socket connected");
  socket.on("disconnect", () => {
    logger.info("socket disconnected");
  });
  socket.on("join_workspace", workspace => {
    socket.join(workspace);
    console.log(workspace);
  });
});

module.exports = io;
