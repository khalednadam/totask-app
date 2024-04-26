const Joi = require("joi");
const { objectId } = require("./custome.validation");

const deleteChecklist = {
  query: Joi.object().keys({
    boardId: Joi.string().required().custom(objectId),
  }),
  params: Joi.object().keys({
    checklistId: Joi.string().required().custom(objectId),
  }),
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
}

const addChecklistItem = {
  body: Joi.object().keys({
    title: Joi.string().required(),
  }),
  query: Joi.object().keys({
    boardId: Joi.string().required().custom(objectId),
  }),
  params: Joi.object().keys({
    checklistId: Joi.string().required().custom(objectId),
  }),
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
}

const updateChecklistItem = {
  body: Joi.object().keys({
    checklistId: Joi.string().required().custom(objectId),
    isChecked: Joi.boolean(),
    title: Joi.string(),
    position: Joi.number()
  }),
  query: Joi.object().keys({
    boardId: Joi.string().required().custom(objectId),
  }),
  params: Joi.object().keys({
    checklistItemId: Joi.string().required().custom(objectId),
  }),
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
}

const deleteChecklistItem = {
  query: Joi.object().keys({
    boardId: Joi.string().required().custom(objectId),
    checklistId: Joi.string().required().custom(objectId),
  }),
  params: Joi.object().keys({
    checklistItemId: Joi.string().required().custom(objectId),
  }),
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
}

const updateChecklist = {
  body: Joi.object().keys({
    name: Joi.string()
  }),
  query: Joi.object().keys({
    boardId: Joi.string().required().custom(objectId),
  }),
  params: Joi.object().keys({
    checklistId: Joi.string().required().custom(objectId),
  }),
  session: Joi.object().keys({
    user: Joi.object().keys({
      id: Joi.string().required().custom(objectId),
    }),
  }),
}
module.exports = {
  deleteChecklist,
  deleteChecklistItem,
  updateChecklist,
  updateChecklistItem,
  addChecklistItem
}
