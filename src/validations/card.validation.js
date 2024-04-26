const Joi = require("joi");
const { objectId } = require("./custome.validation");

const createCard = {
  body: Joi.object().keys({
    board: Joi.string().required().custom(objectId),
    list: Joi.string().required().custom(objectId),
    title: Joi.string().required(),
    description: Joi.any(),
    attachments: Joi.array(),
    position: Joi.any(),
    cover: Joi.string(),
    startDate: Joi.any(),
    endDate: Joi.any(),
    assignees: Joi.array(),
    labels: Joi.array(),
    commnets: Joi.array(),
    checklist: Joi.custom(objectId),
    isComplete: Joi.boolean()
  }),
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
}

const getCard = {
  params: Joi.object().keys({
    cardId: Joi.string().required().custom(objectId)
  }),
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
}

const getCards = {
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    title: Joi.string()
  }),
  params: Joi.object().keys({
    listId: Joi.string().required().custom(objectId)
  })
}

const updateCard = {
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
  params: Joi.object().keys({
    cardId: Joi.string().required().custom(objectId)
  }),
  body: Joi.object().keys({
    board: Joi.string().custom(objectId),
    list: Joi.string().custom(objectId),
    title: Joi.string(),
    description: Joi.any(),
    attachments: Joi.array(),
    position: Joi.any(),
    cover: Joi.string(),
    startDate: Joi.any(),
    endDate: Joi.any(),
    assignees: Joi.array(),
    labels: Joi.array(),
    commnets: Joi.array(),
    checklist: Joi.custom(objectId),
    isComplete: Joi.boolean()
  }),
  query: Joi.object().keys({
    list: Joi.any(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
}

const deleteCard = {
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
  params: Joi.object().keys({
    cardId: Joi.string().required().custom(objectId),
  })
}

module.exports = {
  createCard,
  getCard,
  getCards,
  updateCard,
  deleteCard,
}
