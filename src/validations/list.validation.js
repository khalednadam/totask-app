const Joi = require("joi");
const { objectId } = require("./custome.validation");

const createList = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    board: Joi.string().required().custom(objectId),
    position: Joi.number(),
  }),
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
}

const getLists = {
  params: Joi.object().keys({
    boardId: Joi.string().required().custom(objectId),
  }),
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
}

const getList = {
  params: Joi.object().keys({
    listId: Joi.string().required().custom(objectId),
  }),
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
}

const updateList = {
  params: Joi.object().keys({
    listId: Joi.string().required().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    position: Joi.number(),
    color: Joi.any()
  }),
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
}

const deleteList = {
  params: Joi.object().keys({
    listId: Joi.string().required().custom(objectId),
  }),
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
}

module.exports = {
  createList,
  getLists,
  getList,
  updateList,
  deleteList
}
