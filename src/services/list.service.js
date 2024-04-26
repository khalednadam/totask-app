const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { List, Card } = require("../models/index")


/**
 * creates a new list
 * @param {Object} listBody
 * @param {ObjectId} userId
 * @returns {List}
 */
const createList = async (listBody, userId) => {
  listBody.createdBy = userId;
  listBody.updatedBy = userId;
  return List.create(listBody);
}

/**
 * get a list by id
 * @param {ObjectId} listId
 * @returns {Promise<List>}
 */
const getListById = async (listId) => {
  return List.findById(listId);
}

/**
 * update a list by id
 * @param {ObjectId} listId
 * @param {Object} listUpdatedBody
 * @returns {Promise<List>}
 */
const updateListById = async (listId, listUpdatedBody) => {
  const list = await getListById(listId);
  if (!list) {
    throw new ApiError(httpStatus.NOT_FOUND, "List was not found");
  }
  list.updatedAt = new Date();
  Object.assign(list, listUpdatedBody);
  await list.save();
  return list;
}

/**
 * query lists
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const queryLists = async (filter, options) => {
  const lists = await List.paginate(filter, options);
  return lists;
}

/**
 * delete a list
 * @param {ObjectId} listId
 * @returns {Object<List>}
 */
const deleteListById = async (listId) => {
  const list = await getListById(listId);
  await List.deleteOne({ _id: list.id });
  await Card.deleteMany({ list: list.id })
  return list;
}

module.exports = {
  createList,
  getListById,
  updateListById,
  queryLists,
  deleteListById
}
