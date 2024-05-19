const httpStatus = require("http-status");
const pick = require("../utils/pick");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const { boardService, workspaceService, userService } = require("../services");
const { User } = require("../models");

const createBoard = catchAsync(async (req, res) => {
  if (!req.body.name || req.body.name.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Board Name cannot be empty");
  }

  if (!req.body.description || req.body.description.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Board description cannot be empty");
  }

  if (!req.body.backgroundColor || req.body.backgroundColor.length === 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Board background color cannot be empty");
  }

  const board = await boardService.createBoard(req.body, req.session.user.id);
  res.status(httpStatus.CREATED).send(board);
});

const deleteBoard = catchAsync(async (req, res) => {
  await boardService.deleteBoardById(req.params.boardId, req.session.user.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const getBoardsByWorkspace = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const filter = {
    workspace: req.params.workspaceId,
    $or: [{ 'members': req.session.user.id }],
    closed: req.query.isClosed,
  };
  if (req.query.name && req.query.name.trim().length > 1) {
    filter.name = { $regex: req.query.name, $options: 'i' }; // Case-insensitive regex search
  }
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const boards = await boardService.queryBoards(filter, options);
  // req.redisClient.set(req.originalUrl, JSON.stringify(boards), 'EX', 100);
  res.send(boards);
});

const updateBoard = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please login");
  }
  const isAdmin = await boardService.checkIfUserIsAdmin(req.params.boardId, req.session.user.id);
  if (!isAdmin) {
    throw new ApiError(httpStatus.FORBIDDEN, "You can't update this board because you're not an admin of the workspace");
  }
  const workspace = await workspaceService.getWorkspaceById(req.body.workspace);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workspace was not found")
  }
  if (!req.body.isPrivate) {
    req.body.members = workspace.members
  }
  if (req.body.isPrivate && !req.body.members?.includes(req.session.user.id)) {
    req.body.members.push(req.session.user.id);
  }
  const board = await boardService.updateBoardById(
    req.params.boardId,
    req.body,
    req.session.user.id
  );
  res.status(httpStatus.OK).send(board);
});

const getBoard = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const board = await boardService.getBoardById(req.params.boardId);
  // if (!board) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "The board was not found");
  // }
  // const workspace = await workspaceService.getWorkspaceById(board.workspace);
  // // if (board.isPrivate && !board.members.includes(req.session.user.id)) {
  // //   throw new ApiError(
  // //     httpStatus.FORBIDDEN,
  // //     "You're not a member of this board"
  // //   );
  // // }
  const isMember = await boardService.checkIfUserIsMember(req.params.boardId, req.session.user.id);
  const isAdmin = await boardService.checkIfUserIsAdmin(req.params.boardId, req.session.user.id);
  if (board.isPrivate && !isMember) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You need to be part of the workspace to view this board"
    );
  }
  const user = await User.findById(req.session.user.id, 'favoriteBoards');
  const isFavorite = user.favoriteBoards.includes(board._id);
  res.status(httpStatus.OK).send({ ...board._doc, isAdmin, isFavorite });
});

const addMemberToBoard = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const board = await boardService.addMemberToBoard(
    req.body.boardId,
    req.body.memberId,
    req.session.user.id
  );
  res.status(httpStatus.OK).send(board);
});

const removeMemberFromBoard = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const board = await boardService.removeMemberFromBoard(
    req.body.boardId,
    req.body.memberId,
    req.session.user.id
  );
  res.status(httpStatus.OK).send(board);
});


const checkIfUserIsAdmin = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please login");
  }
  const isAdmin = await boardService.checkIfUserIsAdmin(req.params.boardId, req.session.user.id);
  res.send(isAdmin);
})

const getAllMembers = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate")
  }
  const members = await boardService.getBoardMembers(req.params.boardId, req.session.user.id);
  res.status(httpStatus.OK).send(members)
})

const getWorkspaceMembersByBoardId = catchAsync(async (req, res) => {
  if (!req.session.user.id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const members = await boardService.getWorkspaceMembersByBoardId(req.params.boardId, req.session.user.id);
  res.status(httpStatus.OK).send(members)
})


module.exports = {
  createBoard,
  deleteBoard,
  getBoardsByWorkspace,
  updateBoard,
  getBoard,
  addMemberToBoard,
  removeMemberFromBoard,
  checkIfUserIsAdmin,
  getAllMembers,
  getWorkspaceMembersByBoardId
};
