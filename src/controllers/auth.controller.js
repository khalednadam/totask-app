const httpStatus = require("http-status");

const {
  userService,
  tokenService,
  authService,
  emailService,
  workspaceService,
} = require("../services/index");
const catchAsync = require("../utils/catchAsync");
const { tokenTypes } = require("../config/tokens");
const ApiError = require("../utils/ApiError");

/**
 * register a user using createUser service
 */
const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const workspace = await workspaceService.createWorkspace(
    {
      name: `${user.name}'s workspace`,
      createdBy: user.id
    },
    user.id
  );
  // user.workspaces = [workspace._id];
  // console.log(workspace);
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(
    user.id
  );
  await emailService.sendVerificationEmail(user.email, verifyEmailToken);
  res.status(httpStatus.CREATED).send({ user });
});

/**
 * Login with email and password
 */
const emailAndPasswordLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);

  const tokens = await tokenService.generateAuthToken(user);
  const sessionUser = {
    id: user.id,
    role: user.role,
    username: user.username,
    name: user.name,
    email: user.email,
    workspaces: user.workspaces,
    boards: user.boards,
    cards: user.cards,
    refreshToken: tokens.refresh.token,
    accessToken: tokens.access.token,
    profilePhotoUrl: user.profilePhotoUrl,
    favoriteBoards: user.favoriteBoards,
    isEmailVerified: user.isEmailVerified
  };
  req.session.user = sessionUser;
  // req.session.save();
  req.session.save((err) => {
    if (err) {
      console.error("Error saving session:", err);
      return res.status(500).send({ message: "Internal server error" });
    }
    res.send({
      user: user.id,
      tokens: tokens,
    });
  });

  // res.send({
  //   user: user.id,
  //   tokens: tokens,
  // });
});

/**
 * Logout
 */
const logout = catchAsync(async (req, res) => {
  await authService.logout(req.session.user.refreshToken);
  req.session.destroy();
  res.clearCookie("totask.sid");
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * refresh auth tokens
 */
const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

/**
 * send re-set password email
 */
const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email
  );
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * reset password
 */
const resetPassword = catchAsync(async (req, res) => {
  // const resetPasswordToken = await tokenService.generateResetPasswordToken(
  //   req.body.email
  // );
  const verifiedToken = await tokenService.verifyToken(req.query.token, tokenTypes.RESET_PASSWORD);
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * change password
 */
const changePassword = catchAsync(async (req, res) => {
  const user = await authService.loginUserWithEmailAndPassword(req.body.email, req.body.password);
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "wrong password");
  }
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email
  );
  await authService.resetPassword(resetPasswordToken, req.body.newPassword);
  res.status(httpStatus.NO_CONTENT).send();
})

/**
 * send verification email
 */
const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(
    req.session.user.id
  );
  await emailService.sendVerificationEmail(req.session.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * verify email
 */
const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token.toString());
  const sessionUser = {
    ...req.session.user,
    isEmailVerified: true
  };
  req.session.user = sessionUser;
  req.session.save();
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  emailAndPasswordLogin,
  logout,
  refreshTokens,
  forgotPassword,
  sendVerificationEmail,
  verifyEmail,
  resetPassword,
  changePassword
};
