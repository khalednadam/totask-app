const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { Board, List, User, Workspace } = require("../models/index");
const { workspaceService, userService } = require(".");

/**
 * create a new board and save it to the workspace
 * @param {Object} boardBody
 * @param {ObjectId} workspace
 * @param {ObjectId} userId
 * @returns {Promise<Board>}
 */
const createBoard = async (boardBody, userId) => {
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  if (!boardBody.workspace) {
    throw new ApiError(httpStatus.FORBIDDEN, "No Workspace was choosen");
  }
  const workspace = await workspaceService.getWorkspaceById(
    boardBody.workspace
  );
  if (workspace.boards.length >= 5 && !workspace.isPremium) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You have reached the limit for free plan");
  }
  const isAdmin = workspace.admins.some((admin) => admin._id.toString() === userId);
  if (
    workspace.canMemberAddBoards === false &&
    !isAdmin
  ) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You are not allowed to create boards"
    );
  }
  const isMember = workspace.members.some((member) => member._id.toString() === userId);
  if (!isMember) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You are not allowed to create boards"
    );
  }
  if (boardBody.isPrivate) {
    boardBody.members = [userId];
  } else {
    boardBody.members = workspace.members;
  }
  boardBody.createdBy = userId;
  const board = await Board.create(boardBody);
  function addBoardToWorkspace() {
    workspace.boards.push(board.id);
    return workspace.boards;
  }
  await workspaceService.updateWorkspaceById(
    boardBody.workspace,
    { boards: addBoardToWorkspace() },
    userId
  );
  return board;
};

/***
 * get board by id
 * @param {ObjectId} boardId
 * @returns {Promise<Board>}
 */
const getBoardById = async (boardId) => {
  return Board.findById(boardId)
    .populate({
      path: 'lists',
      options: { sort: { position: 1 } }
    })
    .populate(['members', 'labels']).populate({
      path: 'workspace',
      populate: {
        path: 'boards',
        model: Board
      },
      populate: {
        path: 'members',
        model: User
      }
    });
};

/***
 * query all boards
 * @param {Object} filter
 * @param {Object} options
 * @returns
 */
const queryBoards = async (filter, options) => {
  options.populate = options.populate ? `${options.populate}, members, createdBy, updatedBy, lists, workspace, labels` : 'members, createdBy, updatedBy, lists, workspace, labels';
  const boards = await Board.paginate(filter, options);
  return boards;
};

/**
 * update a board by id
 * @param {ObjectId} boardId
 * @param {Object} boardBody
 * @param {ObjectId} userId
 * @returns {Promise<Board>}
 */
const updateBoardById = async (boardId, boardBody, userId) => {
  const board = await getBoardById(boardId);
  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, "Board not found");
  }
  const isMember = await checkIfUserIsMember(boardId, userId);
  if (!isMember && board.isPrivate) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You are not allowed to modify this board"
    );
  }
  board.updatedAt = new Date();
  Object.assign(board, boardBody);
  await board.save();
  return board;
};

/***
 * delete board
 * @param {ObjectId} boardToDeleteId
 * @param {ObjectId} userId
 * @returns {Promise<Board>}
 */
const deleteBoardById = async (boardToDeleteId, userId) => {
  const board = await getBoardById(boardToDeleteId);
  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, "Board was not found");
  }
  const workspace = await workspaceService.getWorkspaceById(board.workspace);
  const isAdmin = await checkIfUserIsAdmin(boardToDeleteId, userId);
  if (!isAdmin) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to delete this board"
    );
  }
  function updateWorkspaceBoards() {
    const newBoards = workspace.boards.filter(
      (boardId) => boardId != boardToDeleteId
    );
    workspace.boards = newBoards;
    return workspace.boards;
  }
  await workspaceService.updateWorkspaceById(
    workspace.id,
    {
      boards: updateWorkspaceBoards(),
    },
    userId
  );
  // for (user in workspace.users) {
  // 	userService.removeBoardFromFavorite(user, boardToDeleteId);
  // }
  await Board.deleteOne({ _id: board.id });
  await List.deleteMany({ board: board.id })
  return board;
};

/***
 *
 * @param {ObjectId} boardId the id of the board
 * @param {ObjectId} memberId the id of the user that will be added
 * @param {ObjectId} adminId the id the user adding to the board (must be a workspace admin)
 * @returns {Promise<Board>}
 */
const addMemberToBoard = async (boardId, memberId, adminId) => {
  if (!adminId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const board = await getBoardById(boardId);
  const workspace = await workspaceService.getWorkspaceById(board.workspace);
  if (!workspace.admins.includes(adminId)) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You're not allowed to add members to the board"
    );
  }
  if (!workspace.members.includes(memberId)) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "User must be added to the workspace first"
    );
  }
  function addMember() {
    board.members.push(memberId);
    return board.members;
  }
  const newBoard = await updateBoardById(
    boardId,
    { members: addMember() },
    adminId
  );
  return newBoard;
};

/***
 *
 * @param {ObjectId} boardId
 * @param {ObjectId} memberToRemove
 * @param {ObjectId} adminId
 * @returns {Promise<Board>}
 */
const removeMemberFromBoard = async (boardId, memberToRemove, adminId) => {
  if (!adminId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const board = await getBoardById(boardId);
  const workspace = await workspaceService.getWorkspaceById(board.workspace);
  if (!workspace.admins.includes(adminId)) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You're not allowed to remove members to the board"
    );
  }

  function removeMember() {
    let newMembers = board.members.filter(
      (memberId) => memberId !== memberToRemove
    );
    board.members = newMembers;
    return board.members;
  }
  const newBoard = await updateBoardById(
    boardId,
    { members: removeMember() },
    adminId
  );
  return newBoard;
};

/**
 * checks if the user is a member of a workspace
 * @param {ObjectId} boardId
 * @param {ObjectId} userId
 * @returns {Boolean}
 */
const checkIfUserIsMember = async (boardId, userId) => {
  // const board = await getBoardById(boardId);
  // if (!board) {
  // throw new ApiError(httpStatus.NOT_FOUND, "The board was not found")
  // }
  // const workspace = await workspaceService.getWorkspaceById(board.workspace.id);
  // if (!workspace) {
  // throw new ApiError(httpStatus.NOT_FOUND, "The workspace was not found")
  // }
  // const isBoardMember = board.members.some((member) => member.id === userId)
  // if (!isBoardMember) {
  // throw new ApiError(httpStatus.UNAUTHORIZED, "You are not a member of this board")
  // }
  const board = await Board.findById(boardId, 'members');
  const isBoardMember = board.members.includes(userId);
  if (!isBoardMember) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not a member of this board");
  }
  return true;
};


/**
 * checks if the user is a member of a workspace
 * @param {ObjectId} boardId
 * @param {ObjectId} userId
 * @returns {Boolean}
 */
const checkIfUserIsAdmin = async (boardId, userId) => {
  const board = await Board.findById(boardId, 'workspace');
  // const workspace = await Workspace.findById(board.workspace, 'admins');

  // const board = await getBoardById(boardId);
  // if (!board) {
  //   return false;
  // }
  // const workspace = await workspaceService.getWorkspaceById(board.workspace);
  // if (!workspace) {
  //   return false;
  // }
  const isAdmin = await workspaceService.checkIfUserIsAdmin(board.workspace, userId);
  if (!isAdmin) {
    return false;
  }
  return true;
}

/**
 * gets all members of board
 * @param {ObjectId} boardId
 * @param {ObjectId} userId
 * @returns {Array<User>} 
 */
const getBoardMembers = async (boardId, userId) => {
  const board = await getBoardById(boardId);
  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, "Board was not found");
  }
  const isMember = await checkIfUserIsMember(boardId, userId);
  if (!isMember) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized to see the member list");
  }
  return board.members
}


/**
 * Gets the workspace members for the baord
 * @param {ObjectId} boardId
 * @param {ObjectId} userId
 * @returns {Array<User>} 
 */
const getWorkspaceMembersByBoardId = async (boardId, userId) => {
  const board = await getBoardById(boardId);
  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, "Board was not found");
  }
  const isMember = await checkIfUserIsMember(boardId, userId);
  if (!isMember) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authroized to see the member of this board");
  }
  console.log('workspace id: ', board.workspace._id);
  const workspaceMembers = await workspaceService.getWorkspaceMembers(board.workspace._id, userId);
  return workspaceMembers
}

const isWorkspacePremium = async (boardId) => {
  const workspace = await Board.findById(boardId, 'workspace').populate('workspace');
  return workspace.workspace.isPremium;
}

module.exports = {
  createBoard,
  getBoardById,
  queryBoards,
  updateBoardById,
  deleteBoardById,
  addMemberToBoard,
  removeMemberFromBoard,
  checkIfUserIsMember,
  checkIfUserIsAdmin,
  getBoardMembers,
  getWorkspaceMembersByBoardId,
  isWorkspacePremium
};
