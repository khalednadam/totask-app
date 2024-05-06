const app = require("./app");
const logger = require("./config/logger");
const http = require("http");

// const redisAdapter = require('socket.io-redis');
// const Redis = require('ioredis');
// const redis = require('redis');
// const redisClient = redis.createClient();
// const redisClient = new Redis(/* Redis configuration */);
const server = http.createServer(app);
const io = require("socket.io")(3002, {
  cors: { origin: "*" }
});
// io.adapter(redisAdapter({
//   pubClient: redisClient,
//   subClient: redisClient.duplicate(), // Use a separate Redis client instance for subscription
// }));

// // redisClient.subscribe('updates');
// redisClient.on('connect', () => {
//   console.log('Connected to Redis');
// });
io.on("connection", (socket) => {
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
