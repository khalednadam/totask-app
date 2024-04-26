const httpStatus = require('http-status');
const { ApiError } = require('../utils/ApiError');
const { boardService } = require('../services');

const authAndMembershipMiddleware = async (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Please login' });
  }
  const boardId = req.query.boardId || req.body.boardId;
  if (!boardId) {
    return res.status(401).json({ message: 'boardId is required' });
  }
  const isMember = await boardService.checkIfUserIsMember(boardId, req.session.user.id);
  if (!isMember) {
    return res.status(401).json({ message: 'you are not a member of this board' });
  }
  next();
};

module.exports = authAndMembershipMiddleware;
