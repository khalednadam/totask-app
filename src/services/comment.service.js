const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { Comment } = require("../models");

/**
 * creates a comment
 * @param {Object} commentBody
 * @returns {Promise}
 */
const createComment = async (commentBody) => {
  return Comment.create(commentBody);
}

/**
 * gets a comment by id
 * @param {ObjectId} commentId
 * @returns {Promise<Comment>}
 */
const getCommentById = async (commentId) => {
  return Comment.findById(commentId).populate("user");
}

/**
 * queries comments
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<queryResults>}
 */
const queryComments = async (filter, options) => {
  const comments = await Comment.paginate(filter, options);
  return comments;
}

/**
 * updates comment
 * @param {ObjectId} commentId
 * @param {Object} commentBody
 * @returns {Promise<Comment>}
 */
const updateCommentById = async (commentId, commentBody) => {
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, "Comment was not found");
  }
  comment.updatedAt = new Date();
  Object.assign(comment, commentBody);
  return await comment.save();
}

/**
 * deletes a comment
 * @param {ObjectId} commentId
 * @return {Promise<Comment>}
 */
const deleteComment = async (commentId) => {
  const comment = await getCommentById(commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, "Comment was not found");
  }
  await Comment.deleteOne({ _id: commentId });
  return comment;
}

module.exports = {
  createComment,
  getCommentById,
  queryComments,
  updateCommentById,
  deleteComment
}
