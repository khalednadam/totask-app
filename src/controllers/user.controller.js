const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService, tokenService, authService } = require("../services");

/**
 * create a user
 */
const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

/**
 * get users
 */
const getUsers = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sort", "limit", "page"]);
  if (req.session.user.role !== 'admin') {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You need to be admin to access");
  }
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const searchUsers = catchAsync(async (req, res) => {
  const users = await userService.searchForUserByEmail(req.query.email, req.query.limit = 5);
  res.send(users);
})

/**
 * get a user
 */
const getUser = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please login");
  }
  if (req.session.user.id !== req.params.userId && req.session.user.role !== 'admin') {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized to perform this action");
  }
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(user);
});

/**
 * update a user
 */
const updateUser = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please login");
  }
  if (req.session.user.id !== req.params.userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized to perform this action");
  }
  if (req.file) {
    const user = await userService.updateUserById(req.params.userId, req.body, req.file);

    // Update session user with new profile photo URL
    req.session.user.profilePhotoUrl = user.profilePhotoUrl;

  } else {
    // If no file was uploaded, update user without changing profile photo
    const user = await userService.updateUserById(req.params.userId, req.body);
  }
  const user = await userService.updateUserById(req.params.userId, req.body, req.file);
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
  };
  req.session.user = sessionUser;
  req.session.save();

  res.send(user);
});

/**
 * update own info
 */
const updateLoggedInUser = catchAsync(async (req, res) => {
  if (res.session.user.id === req.params.userId) {
    await userService.updateUserById(req.params.userId, req.query.body);
    res.send(user);
  } else {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }
});

/**
 * delete a user
 */
const deleteUser = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please login");
  }
  const user = await userService.getUserById(req.session.user.id);
  if (!(await user.isPasswordMatch(req.body.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  if (req.session.user.id !== req.params.userId && req.session.user.role !== 'admin') {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized to perform this action");
  }
  await authService.logout(req.session.user.refreshToken)
  await userService.deleteUserById(req.params.userId);
  res.clearCookie("totask.sid");
  res.status(httpStatus.NO_CONTENT).send();
});

/**
 * get currently logged in user from the session
 */
const getCurrentUser = catchAsync(async (req, res) => {
  res.status(httpStatus.OK).send(req.session.user);
});

const addBoardToFavorite = catchAsync(async (req, res) => {
  const favoriteBoards = await userService.addBoardToFavorite(
    req.session.user.id,
    req.body.boardId
  );
  res.status(httpStatus.OK).send(favoriteBoards);
});

const removeBoardFromFavorite = catchAsync(async (req, res) => {
  const favoriteBoards = await userService.removeBoardFromFavorite(
    req.session.user.id,
    req.body.boardId
  );
  res.status(httpStatus.OK).send(favoriteBoards);
});

const getMyFavoriteBoards = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const favoriteBoards = await userService.getCurrentUserFavBoards(
    req.session.user.id
  );
  res.status(httpStatus.OK).send(favoriteBoards);
});


/**
 * update a user
 */
const deleteProfilePic = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please login");
  }
  if (req.session.user.id !== req.params.userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized to perform this action");
  }
  // If no file was uploaded, update user without changing profile photo
  const user = await userService.deleteProfilePic(req.params.userId);
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
  };
  req.session.user = sessionUser;
  req.session.save();

  res.send(user);
});


/**
 * get users grouped by month
 */
const getUsersGroupedByMonth = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  if (req.session.user.role !== 'admin') {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You need to be admin to access");
  }

  // Fetch users grouped by month
  const usersByMonth = await userService.queryUsersGroupedByMonth();

  res.send(usersByMonth);
});

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getCurrentUser,
  updateLoggedInUser,
  addBoardToFavorite,
  removeBoardFromFavorite,
  getMyFavoriteBoards,
  searchUsers,
  deleteProfilePic,
  getUsersGroupedByMonth
};
