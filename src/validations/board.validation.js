const Joi = require("joi");
const { objectId } = require("./custome.validation");

const createBoard = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    backgroundColor: Joi.string().required(),
    description: Joi.string(),
    workspace: Joi.string().required().custom(objectId),
    members: Joi.array(),
    isPrivate: Joi.boolean().required()
  }),
};

const getBoard = {
  params: Joi.object().keys({
    boardId: Joi.string().required().custom(objectId),
  }),
};

const getBoards = {
  params: Joi.object().keys({
    workspaceId: Joi.string().required().custom(objectId),
  }),
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    name: Joi.string().required(),
    isClosed: Joi.boolean(),
  }),
};

const updateBoard = {
  params: Joi.object().keys({
    boardId: Joi.string().required().custom(objectId),
  }),
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
};

const manageBoardMembers = {
  body: Joi.object().keys({
    boardId: Joi.string().required().custom(objectId),
    memberId: Joi.string().required().custom(objectId),
  }),
};

const udpatePrivacy = {
  body: Joi.object().keys({
    isPrivate: Joi.boolean().required(),
  }),
  params: Joi.object().keys({
    boardId: Joi.string().required().custom(objectId),
  }),
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
};

const deleteBoard = {
  params: Joi.object().keys({
    boardId: Joi.string().required().custom(objectId),
  }),
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
};

const checkUserStatus = {
  params: Joi.object().keys({
    boardId: Joi.string().required().custom(objectId)
  }),
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
}

module.exports = {
  createBoard,
  getBoard,
  getBoards,
  updateBoard,
  manageBoardMembers,
  udpatePrivacy,
  deleteBoard,
  checkUserStatus
};
