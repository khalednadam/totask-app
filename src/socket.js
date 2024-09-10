const logger = require("./config/logger");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const app = express();
const config = require("./config/config");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [config.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
})
io.on("connection", (socket) => {
  console.log("Hello from the socket.");
  socket.on("subscribe", (board) => {
    socket.join(board);
    // console.log("Joined to ", board);
  });
  socket.on("update-lists", (payload) => {
    io.to(payload.boardId).emit("update-lists")
    // io.to(payload.boardId).emit("update-lists", payload.lists);
  });
  socket.on("unsubscribe", (boardId) => {
    socket.leave(boardId);
    // console.log("left from: ", boardId);
  });
  // socket.to.broadcast.emit('change-in-board');
  // socket.on("update-lists", (payload) => {
  //   io.to(payload.boardId).emit("update-lists");
  // });
  socket.on("change-board-info", (msg) => {
    io.to(msg).emit("change-board-info", msg);
  });

  socket.on("update-cards", (msg, listId) => {
    io.to(msg).emit("update-cards", listId);
  });

  socket.on("update-card", (cardId) => {
    io.to(cardId).emit("update-card", cardId);
  });

  socket.on("delete-card", (cardId) => {
    io.to(cardId).emit("delete-card", cardId);
  });

  // test
  logger.info("socket connected");
  socket.on("disconnect", () => {
    logger.info("socket disconnected");
  });
  socket.on("join_workspace", (workspace) => {
    socket.join(workspace);
    console.log(workspace);
  });
});

module.exports = { io, app, server };
