const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { commentService, cardService, boardService } = require("../services");
const { Card } = require("../models");

const createComment = catchAsync(async (req, res) => {
  const comment = await commentService.createComment({ ...req.body, user: req.session.user.id });
  const isMember = await boardService.checkIfUserIsMember(req.body.boardId, req.session.user.id);
  if (!isMember) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }
  const card = await Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { comments: { _id: comment.id } } })
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
  const card = await Card.findOneAndUpdate({ comment: req.params.commentId }, { $pull: { comments: { _id: req.params.commentId } } })
  res.status(httpStatus.OK).send(deletedComment);
})

module.exports = {
  createComment,
  getCommentById,
  updateCommentById,
  deleteCommentById
}
