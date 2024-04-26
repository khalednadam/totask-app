const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { Checklist } = require("../models/index");

/**
 * creates a checklist
 * @param {Object} checklistBody
 * @param {ObjectId} userId
 * @returns {Promise<Checklist>}
 */
const createChecklist = async (checklistBody) => {
  return Checklist.create(checklistBody);
}

/**
 * gets a checklist by id
 * @param {ObjectId} checklistId
 * @returns {Promise<Checklist>}
 */
const getChecklistById = async (checklistId) => {
  return Checklist.findById(checklistId);
}

/**
 * query checklists
 * @param {Object} filter  Mongo filter
 * @param {Object} options  Query options
 * @returns {Promise<QueryResult>}
 */
const queryChecklists = async (filter, options) => {
  const checklists = await Checklist.paginate(filter, options);
  return checklists;
}

/**
 * deletes checklist by id
 * @param {ObjectId} checklistId
 * @returns {Object<Checklist>}
 */
const deleteChecklist = async (checklistId) => {
  const checklist = await getChecklistById(checklistId);
  await Checklist.deleteOne({ _id: checklist.id });
  return checklist;
}

/**
 * updates a checklist
 * @param {ObjectId} checklistId
 * @param {Object} checklistUpdatedBody
 * @returns {Promise<Object>} 
 */
const updateChecklist = async (checklistId, checklistUpdatedBody) => {
  const checklist = await getChecklistById(checklistId);
  if (!checklist) {
    throw new ApiError(httpStatus.NOT_FOUND, "checklist was not found");
  }
  checklist.updatedAt = new Date();
  Object.assign(checklist, checklistUpdatedBody);
  await checklist.save();
  return checklist;
}

/**
 * update checklist item 
 * @param {ObjectId} checklistId
 * @param {ObjectId} checklistItemId
 * @param {Object} checklistUpdatedBody 
 * @return {Object<Checklist>}
 */
const updateChecklistItem = async (checkListId, checklistItemId, checklistItemBody) => {
  const checklist = await getChecklistById(checkListId);
  if (!checklist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Checklist was not found");
  }
  const checklistItem = await checklist.checklistItems.find((item) => item._id == checklistItemId);
  Object.assign(checklistItem, checklistItemBody);

  await checklist.save();
  if (checklist && checklist.checklistItems) {
    checklist.checklistItems.sort((a, b) => a.position - b.position);
  }
  return checklist;
}

/**
 * add checklist item 
 * @param {ObjectId} checklistId
 * @param {Object} checklistUpdatedBody 
 * @return {Object<Checklist>}
 */
const addChecklistItem = async (checklistId, checklistItemBody) => {
  const checklist = await getChecklistById(checklistId);
  if (!checklist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Checklist was not found");
  }
  checklist.checklistItems.push(checklistItemBody);
  checklist.save();
  return checklist;
}

/**
 * deletes a checklist item
 * @param {ObjectId} checklistId
 * @param {ObjectId} checklistItemId
 * @returns {Object<Checklist>}
 */
const deleteChecklistItem = async (checklistId, checklistItemId) => {
  let checklist = await getChecklistById(checklistId);
  checklist.checklistItems = checklist.checklistItems.filter(item => item.id !== checklistItemId);
  checklist = checklist.save();
  return checklist;
}

module.exports = {
  createChecklist,
  getChecklistById,
  queryChecklists,
  deleteChecklist,
  updateChecklist,
  updateChecklistItem,
  addChecklistItem,
  deleteChecklistItem,
}
