const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { commentService, cardService, boardService, emailService } = require("../services");
const { Card } = require("../models");
const { baseURL } = require("../config/config");

const createComment = catchAsync(async (req, res) => {
  const comment = await commentService.createComment({ ...req.body, user: req.session.user.id });
  const isMember = await boardService.checkIfUserIsMember(req.body.boardId, req.session.user.id);
  if (!isMember) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }
  const card = await Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { comments: { _id: comment.id } } }).populate('assignees')
  const createMsg = (name) => {
    const msg = `
  <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <h1 style="color: #333;">${req.session.user.name} added a new comment</h1>
    <p style="color: #666; line-height: 1.6;">Hello ${name},</p>
    <p style="color: #666; line-height: 1.6;">${req.session.user.name} added a new comment to the card <strong>${card.title}</strong></p>
    <p style="text-align: center;">
      <a href="${baseURL}/w/${card.boardId}" style="display: inline-block; padding: 10px 20px; background-color: #6DB193; color: #fff; text-decoration: none; border-radius: 5px;">Go to Board</a>
    </p>
    <p style="color: #666; line-height: 1.6;">If you have any questions or need assistance, feel free to reach out to us.</p>
    <p style="color: #666; line-height: 1.6;">Best regards,<br> Totask Team</p>
  </div>
  `
    return msg;
  }
  for (let assignee of card.assignees) {
    if (assignee._id != req.session.user.id) {
      await emailService.sendEmail(assignee.email, 'New comment', createMsg(assignee.name));
    }
  }
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
