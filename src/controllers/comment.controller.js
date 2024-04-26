const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { commentService, cardService } = require("../services");
const { Card } = require("../models");

const createComment = catchAsync(async (req, res) => {
  const comment = await commentService.createComment(req.body);
  const card = await cardService.getCardById(req.params.cardId, req.session.user.id);
  if (!card) {
    throw new ApiError(httpStatus.NOT_FOUND, "Card was not found");
  }
  card.comments.push(comment.id);
  await card.save();
  res.status(httpStatus.OK).send(comment);
})

const getCommentById = catchAsync(async (req, res) => {
  const comment = await commentService.getCommentById(req.params.commentId);
  res.status(httpStatus.OK).send(comment);
})

const updateCommentById = catchAsync(async (req, res) => {
  const comment = await commentService.getCommentById(req.params.commentId);
  if (req.session.user.id != comment.user.id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not allowed to update this comment");
  }
  const updatedComment = await commentService.updateCommentById(req.params.commentId, req.body);
  res.status(httpStatus.OK).send(updatedComment);
})

const deleteCommentById = catchAsync(async (req, res) => {
  const comment = await commentService.getCommentById(req.params.commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, "Comment was not found");
  }
  if (req.session.user.id !== comment.user.id) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not allowed to delete this comment");
  }
  const deletedComment = await commentService.deleteComment(req.params.commentId);
  const card = await Card.findOne({ comments: req.params.commentId })
  if (!card) {
    throw new ApiError(httpStatus.NOT_FOUND, "Card was not found");
  }
  card.comments = card.comments.filter(comment => comment != req.params.commentId);
  await cardService.updateCardById(card.id, { comments: card.comments }, req.session.user.id);
  res.status(httpStatus.OK).send(deletedComment);
})

module.exports = {
  createComment,
  getCommentById,
  updateCommentById,
  deleteCommentById
}
