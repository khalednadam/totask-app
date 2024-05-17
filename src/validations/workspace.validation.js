const Joi = require("joi");
const { objectId, username } = require("./custome.validation");

const createWorkspace = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    type: Joi.string(),
    description: Joi.string(),
  }),
};

const getWorkspace = {
  params: Joi.object().keys({
    workspaceId: Joi.string().required().custom(objectId),
  }),
};

const getAllWorkspaces = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const addRemoveMember = {
  body: Joi.object().keys({
    userEmail: Joi.string().required().email(),
  }),
  params: Joi.object().keys({
    workspaceId: Joi.string().required().custom(objectId),
  }),
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
};

const getMembers = {
  params: Joi.object().keys({
    workspaceId: Joi.string().required().custom(objectId),
  }),
};

const getWorkspacesForUser = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
};

const modifyUserRole = {
  body: Joi.object().keys({
    workspaceId: Joi.string().required().custom(objectId),
    member: Joi.string().required().custom(objectId),
  }),
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
};

const deleteWorkspace = {
  params: Joi.object().keys({
    workspaceId: Joi.string().required().custom(objectId),
  }),
};

const updateWorkspace = {
  body: Joi.object().keys({
    canMemberAddBoards: Joi.bool().required()
  }),
  params: Joi.object().keys({
    workspaceId: Joi.string().required().custom(objectId),
  }),
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
}

module.exports = {
  createWorkspace,
  getWorkspace,
  getAllWorkspaces,
  addRemoveMember,
  getMembers,
  getWorkspacesForUser,
  modifyUserRole,
  deleteWorkspace,
  updateWorkspace
};
