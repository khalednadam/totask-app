// const Redis = require("ioredis");
// // Create a Redis client instance
// const redisClient = new Redis({
//   // Redis server configuration options if needed
//   // e.g., host, port, password
// });

// // Check if Redis connection is successful
// redisClient.on('connect', () => {
//   console.log('Connected to Redis');
// });

// // Handle Redis connection errors
// redisClient.on('error', (err) => {
//   console.error('Error connecting to Redis:', err);
// });

// Make the Redis client available to other parts of your application

const checkCache = (req, res, next) => {

  const { redisClient } = req;
  const cacheKey = req.originalUrl;

  redisClient.get(cacheKey, (err, cachedData) => {
    if (err) {
      console.error('Error fetching from Redis cache:', err);
      return next();
    }

    if (cachedData) {
      // Data found in cache, send it as response
      console.log('data in cache')
      return res.json(JSON.parse(cachedData));
    } else {
      console.log('not in cache')
      // Data not found in cache, proceed with the request
      next();
    }
  });
};

module.exports = checkCache;
