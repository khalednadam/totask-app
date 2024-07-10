const express = require("express");
require('express-async-errors');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");
const passport = require("passport");
const { jwtStrategy } = require("./config/passport");
const routes = require("./routes/v1/index");
const session = require("express-session");
const config = require("./config/config");
const compression = require("compression");
const { userService, workspaceService } = require("./services");
const path = require("path");
const { User } = require("./models");
const localStrategy = require("passport-local");
const { app } = require("./socket");
const ApiError = require("./utils/ApiError");
// const Redis = require('ioredis');

const { doubleCsrf } = require('csrf-csrf');

app.use(passport.initialize());
app.use(express.json());
app.use(compression());

// CORS configuration
const corsOptions = {
  origin: config.CLIENT_URL,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.set("trust proxy", 1); // trust first proxy

app.use(
  session({
    name: "totask.sid",
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    cookie: {
      sameSite: config.env === 'production' ? 'none' : 'lax',
      secure: config.env === 'production',
      httpOnly: true,
      maxAge: 60 * 60 * 1000 * 24 * 30,
    },
    store: MongoStore.create({ mongoUrl: config.mongoose.url }),
  })
);

app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(cookieParser());

// CSRF Protection
const { doubleCsrfProtection, generateToken } = doubleCsrf({
  getSecret: () => config.csrfSecret,
  cookieName: 'csrf-token',
  cookieOptions: {
    sameSite: 'lax',
    secure: config.env === "production",
    httpOnly: true,
  },
  size: 64,
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
  getTokenFromRequest: (req) => req.headers['x-csrf-token'],
});

// Apply doubleCsrfProtection middleware
app.get('/v1/csrf-token', (req, res) => {
  const csrfToken = generateToken(req, res);
  res.status(200).json({ csrfToken });
});
app.use(doubleCsrfProtection);
app.use("/v1", doubleCsrfProtection, routes);

// Endpoint to get CSRF token


const frontendPath = path.join(__dirname, "../client/dist/");
app.use(express.static(frontendPath));
app.get('/*', function (req, res) {
  res.sendFile(path.join(frontendPath));
});

// Error handling
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).json({ message: 'Invalid CSRF token' });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'An unexpected error occurred!',
    });
  }
});

module.exports = app;
