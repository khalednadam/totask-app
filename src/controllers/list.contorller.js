const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { listService, boardService } = require("../services");
const config = require("../config/config");
const { Board } = require("../models");
const { io } = require("../socket");

// const io = require("socket.io")(3002, {
//   cors: { origin: "*" }
// });
const createList = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const isUserMember = await boardService.checkIfUserIsMember(
    req.body.board,
    req.session.user.id
  );
  if (!isUserMember) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You need to be part of the workspace to be able to view this content "
    );
  }
  const highestPosList = await listService.queryLists({ board: req.body.board }, { sortBy: "position:desc", limit: 1 });
  const position = (highestPosList.results[0]?.position || 0) + parseFloat(config.POSITION_GAP);
  const list = await listService.createList({ ...req.body, position: position }, req.session.user.id);
  // console.log(list);
  // io.on("connection", (sd) => {
  //   console.log(sd);
  // })
  // await Board.updateOne({ _id: req.body.board }, { $push: { lists: { _id: list.id } } })
  const filter = {
    board: req.body.board,
  };
  const options = pick({ ...req.query, limit: 100 }, ["sortBy", "limit", "page"]);
  const lists = await listService.queryLists(filter, options);
  // console.log(lists);
  io.emit("update-lists", lists);
  res.status(httpStatus.CREATED).send();
});

const getListsByBoard = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const filter = {
    board: req.params.boardId,
  };
  const isUserMember = await boardService.checkIfUserIsMember(
    req.params.boardId,
    req.session.user.id
  );
  if (!isUserMember) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You need to be part of the workspace to be able to view this content "
    );
  }
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const lists = await listService.queryLists(filter, options);
  res.status(httpStatus.OK).send(lists);
});

const getListById = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const list = await listService.getListById(req.params.listId);
  const isUserMember = await boardService.checkIfUserIsMember(
    list.board,
    req.session.user.id
  );
  if (!isUserMember) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You need to be part of the workspace to be able to view this content "
    );
  }
  res.status(httpStatus.OK).send(list)
});

const updateListById = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const list = await listService.getListById(req.params.listId);
  const isUserMember = await boardService.checkIfUserIsMember(
    list.board,
    req.session.user.id
  );
  if (!isUserMember) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You need to be part of the workspace to be able to view this content "
    );
  }
  const isPremium = await boardService.isWorkspacePremium(list.board);
  if (!isPremium) {
    req.body.color = null;
  }
  const newList = await listService.updateListById(req.params.listId, req.body);

  const filter = {
    board: newList.board,
  };
  const options = pick({ ...req.query, limit: 100 }, ["sortBy", "limit", "page"]);
  const lists = await listService.queryLists(filter, options);
  io.emit("update-lists", lists);
  res.status(httpStatus.OK).send(newList);
})

const deleteListById = catchAsync(async (req, res) => {
  const deletedList = await listService.deleteListById(req.params.listId);
  const board = await boardService.getBoardById(deletedList.board);
  await boardService.updateBoardById(deletedList.board, { listCount: board.listCount - 1 }, req.session.user.id)
  const filter = {
    board: deletedList.board,
  };
  const options = pick({ ...req.query, limit: 100 }, ["sortBy", "limit", "page"]);
  const lists = await listService.queryLists(filter, options);
  io.emit("update-lists", lists);
  res.status(httpStatus.OK).send(deletedList);
})

module.exports = {
  createList,
  getListsByBoard,
  getListById,
  updateListById,
  deleteListById
};
