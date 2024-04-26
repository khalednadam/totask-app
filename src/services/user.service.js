const { User, Board } = require("../models/index");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const googleStorage = require("../utils/googleStorage");

/**
 * Create a new user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email is taken");
  }
  if (await User.isUsernameTaken(userBody.username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Username is taken");
  }

  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  options.populate = options.populate ? `${options.populate}, favoriteBoards` : 'favoriteBoards';
  const users = await User.paginate(filter, options);
  return users;
};

/*
 * Search for users with email
 * @param {String} email
 * @param {Number} limit
 * @returns {Array<Users>} 
 */
const searchForUserByEmail = async (email, limit = 5) => {
  try {
    const users = await User.find({
      email: { $regex: email, $options: 'i' }
    }).limit(limit);
    return users;
  } catch (error) {
    // Handle the error appropriately
    console.error('Error searching for users by email:', error);
    throw error;
  }
}

/**
 * get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email }).populate(['favoriteBoards']);
};

/**
 * get user by id
 * @param {ObjectId} id - user id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id).populate(['favoriteBoards']);
};

/**
 * update user information by id
 * @param {ObjectId} id - user id
 * @param {Object} updateBody
 * @param {} file
 * @returns {Promise<Object>}
 */
const updateUserById = async (id, updateBody, file) => {
  const user = await getUserById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "user not found");
  }
  // if user updates the email and the email is already taken
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  if (file) {
    const imgUrl = await googleStorage.uploadToGoogleStorage(file.originalname, file.buffer);
    user.profilePhotoUrl = imgUrl;
  }
  user.updatedAt = new Date();
  Object.assign(user, updateBody);
  await user.save();
  return user;
};


/**
 * update user information by id
 * @param {ObjectId} id - user id
 * @returns {Promise<Object>}
 */
const deleteProfilePic = async (id) => {
  const user = await getUserById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "user not found");
  }
  await googleStorage.deleteFileFromGoogleStorage(user.profilePhotoUrl);
  user.profilePhotoUrl = null;
  user.updatedAt = new Date();
  await user.save();
  return user;
};

/**
 * delete user by id
 * @param {ObjectId} id - user id
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await user.deleteOne({ _id: user.id });
  return user;
};

/**
 *
 * @param {ObjectId} userId
 * @returns {Promise<Board[]>}
 */
const getCurrentUserFavBoards = async (userId) => {
  const user = await User.findById(userId, 'favoriteBoards').populate('favoriteBoards');
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
  }
  // const favoriteBoards = user.favoriteBoards;
  return user.favoriteBoards;
};

/**
 * add a board to favorites
 * @param {ObjectId} userId
 * @param {ObjectId} boardId
 * @returns {Promise<Board[]>}
 */
const addBoardToFavorite = async (userId, boardId) => {
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  await User.findByIdAndUpdate(userId, { $addToSet: { favoriteBoards: { _id: boardId } } });
  const favoriteBoard = await Board.findOne({ _id: boardId });
  return favoriteBoard;
};

/**
 * remove board from favorites
 * @param {ObjectId} userId
 * @param {ObjectId} boardToRemove
 * @returns {Promise<Board[]>}
 */
const removeBoardFromFavorite = async (userId, boardToRemove) => {
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  await User.findByIdAndUpdate(userId, { $pull: { favoriteBoards: boardToRemove } });
  const favoriteBoards = await getCurrentUserFavBoards(userId);
  return favoriteBoards;
};

/**
 * Query for users grouped by month
 * @returns {Promise<Array>}
 */
const queryUsersGroupedByMonth = async () => {
  const pipeline = [
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 }
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },

  ];

  const userCountsByMonthAndYear = await User.aggregate(pipeline);
  const formattedData = userCountsByMonthAndYear.map(entry => ({
    month: new Date(2000, entry._id.month - 1).toLocaleString('default', { month: 'long' }),
    year: entry._id.year,
    count: entry.count
  }));
  return formattedData;
};

module.exports = {
  createUser,
  queryUsers,
  getUserByEmail,
  getUserById,
  updateUserById,
  deleteUserById,
  addBoardToFavorite,
  removeBoardFromFavorite,
  getCurrentUserFavBoards,
  searchForUserByEmail,
  deleteProfilePic,
  queryUsersGroupedByMonth
};
