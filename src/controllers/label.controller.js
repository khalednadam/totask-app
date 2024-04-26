const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { labelService, boardService, cardService } = require("../services");
const { Card } = require("../models");

const createLabel = catchAsync(async (req, res) => {
  const label = await labelService.createLabel(req.body);
  const board = await boardService.getBoardById(req.query.boardId);
  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, "Board not found");
  }

  // Add the label ID to the board's labels array
  board.labels.push(label.id);
  await board.save();
  res.status(httpStatus.CREATED).send(label);
})

const getLabelById = catchAsync(async (req, res) => {
  const label = await labelService.getLabelById(req.params.labelId);
  res.status(httpStatus.OK).send(label)
})

const updateLabelById = catchAsync(async (req, res) => {
  const updatedLabel = await labelService.updateLabelById(req.params.labelId, req.body);
  res.status(httpStatus.OK).send(updatedLabel);
})

const deleteLabelById = catchAsync(async (req, res) => {
  const deletedLabel = await labelService.deleteLabelById(req.params.labelId);
  // TODO: remove the label from cards
  const board = await boardService.getBoardById(req.query.boardId);
  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, "Board not found");
  }
  board.labels = board.labels.filter(label => label != req.params.labelId);
  await boardService.updateBoardById(board.id, { labels: board.labels }, req.session.user.id);
  await Card.updateMany(
    { board: board.id, labels: req.params.labelId },
    { $pull: { labels: req.params.labelId } }
  );
  res.status(httpStatus.OK).send(deletedLabel);
})

module.exports = {
  createLabel,
  getLabelById,
  updateLabelById,
  deleteLabelById
}
