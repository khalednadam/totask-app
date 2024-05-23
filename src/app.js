const express = require("express");
require('express-async-errors');
const cors = require("cors");
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");
const passport = require("passport");
const { jwtStrategy } = require("./config/passport");
const routes = require("./routes/v1/index");
const session = require("express-session");
const config = require("./config/config");
const compression = require("compression")
const { userService, workspaceService } = require("./services");
const path = require("path");
const { User } = require("./models");
const localStrategy = require("passport-local");
const { app } = require("./socket");
// const Redis = require('ioredis');

app.use(passport.initialize());
app.use(express.json());
app.use(compression());
// Create a Redis client instance
// const redisClient = new Redis({
// Redis server configuration options if needed
// e.g., host, port, password
// });

// Check if Redis connection is successful
// redisClient.on('connect', () => {
//   console.log('Connected to Redis');
// });

// Handle Redis connection errors
// redisClient.on('error', (err) => {
//   console.error('Error connecting to Redis:', err);
// });

// Make the Redis client available to other parts of your application
// app.set('redisClient', redisClient);

// app.use((req, res, next) => {
//   req.redisClient = redisClient;
//   next();
// });

const corsOptions = {
  origin: config.CLIENT_URL,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);
app.set("trust proxy", 1); // trust first proxy




app.use(
  session({
    name: "totask.sid",
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    cookie: {
      sameSite: config.env === 'production' ? 'none' : false,
      secure: config.env === 'production',
      httpOnly: true,
      maxAge: 60 * 60 * 1000 * 24 * 30,
      // partitioned: true
    },
    store: MongoStore.create({ mongoUrl: config.mongoose.url }),
  })
);

app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use("/v1", routes);
const frontendPath = path.join(__dirname, "../client/dist/");
// Serve index.html for all non-static routes
app.use(express.static(frontendPath));
app.get('/*', function(req, res) {
  res.sendFile(path.join(frontendPath));
});


module.exports = app;
