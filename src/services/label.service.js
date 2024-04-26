const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { Label } = require("../models");

/**
 * creates a label
 * @param {Object} labelBody
 * @returns {Promise}
 */
const createLabel = async (labelBody) => {
  return Label.create(labelBody);
}

/**
 * gets a label by id
 * @param {ObjectId} labelId
 * @returns {Promise<Label>}
 */
const getLabelById = async (labelId) => {
  const label = await Label.findById(labelId);
  return label;
}

/**
 * queries labels
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<queryResults>}
 */
const queryLabels = async (filter, options) => {
  const labels = await Label.paginate(filter, options);
  return labels;
}

/**
 * udpates label by id
 * @param {ObjectId} labelId
 * @param {Object} labelBody
 * returns {Promise<Label>}
 */
const updateLabelById = async (labelId, labelBody) => {
  const label = await getLabelById(labelId);
  label.updatedAt = new Date();
  Object.assign(label, labelBody);
  return await label.save();
}

/**
 * deletes a label by id
 * @param {ObjectId} labelId
 * @returns {Promise<Label>}
 */
const deleteLabelById = async (labelId) => {
  const label = await getLabelById(labelId);
  await Label.deleteOne({ _id: labelId });
  return label;
}

module.exports = {
  createLabel,
  getLabelById,
  queryLabels,
  updateLabelById,
  deleteLabelById
}
