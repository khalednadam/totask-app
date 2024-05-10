const httpStatus = require("http-status");
const nodemailer = require("nodemailer");
const ApiError = require("../utils/ApiError");
const userService = require("./user.service");
const { Token, User } = require("../models");
const { tokenTypes } = require("../config/tokens");
const { tokenService } = require(".");
const config = require("../config/config");

const logger = require("../config/logger");
const transport = nodemailer.createTransport(config.email.smtp);
if (config.env !== "test") {
  transport
    .verify()
    .then(() => {
      logger.info("Connected to the email server");
    })
    .catch(() => {
      logger.warn(
        "Unable to connect to email server. Make sure you have configured the SMTP options"
      );
    });
}
// TODO: add CSRF token

/**
 * login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) {
      throw new Error("Incorrect email");
      // throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email");
    }
    if (!(await user.isPasswordMatch(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
    }
    return user;
  } catch (error) {
    throw error; // Ensure the error is re-thrown
  }

  //   const subject = "Verify Email";
  //   const html = `
  // <h1>Hey ${user.name}, you signed in </h1>
  // <p>If this is wasn't you click this link </p>
  // `;
  //   const msg = { from: config.email.from, to: user.email, subject, html };
  // await transport.sendMail(msg);
  // return user;
};

/**
 * logges user out by finding the corresponding refresh token and removing it
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, "Not Found");
  }
  await Token.deleteOne(refreshTokenDoc);
  return refreshTokenDoc;
};

/**
 * refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshToken.remove();
    return tokenService.generateAuthToken(user);
  } catch (err) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
};

/**
 * reset password
 * @param {String} resetPassworToken
 * @param {string} newPassword
 */
const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken,
      tokenTypes.RESET_PASSWORD
    );
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (err) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed");
  }
};

/**
 * verify user's email
 * @param {String} verifyEmailToken
 */
const verifyEmail = async (verifyEmailToken) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(
      verifyEmailToken,
      tokenTypes.VERIFY_EMAIL
    );
    const user = await userService.getUserById(verifyEmailTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    console.log(user)
    // await userService.updateUserById(user.id, { isEmailVerified: true });
    await User.findByIdAndUpdate(user.id, { isEmailVerified: true });
  } catch (err) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Email verification failed");
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  resetPassword,
  verifyEmail,
};
