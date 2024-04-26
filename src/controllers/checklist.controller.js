const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { checklistService, boardService } = require("../services");
const config = require("../config/config");
const { Checklist } = require("../models");
const mongoose = require('mongoose')

const updateChecklistItem = catchAsync(async (req, res) => {
  const checklist = await checklistService.updateChecklistItem(req.body.checklistId, req.params.checklistItemId, req.body);
  res.status(httpStatus.OK).send(checklist);
})

const addChecklistItem = catchAsync(async (req, res) => {
  // get the highest position list item
  const highestPosItem = await Checklist.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(req.params.checklistId) } },
    { $unwind: "$checklistItems" }, // Convert array to separate documents
    { $sort: { "checklistItems.position": -1 } }, // Sort by position in descending order
    { $limit: 1 } // Take only the first item after sorting
  ]);
  const position = (highestPosItem[0]?.checklistItems?.position || 0) + parseFloat(config.POSITION_GAP);
  const updatedChecklist = await checklistService.addChecklistItem(req.params.checklistId, { ...req.body, position });
  res.status(httpStatus.OK).send(updatedChecklist);
})

const deleteChecklist = catchAsync(async (req, res) => {
  const checklist = await checklistService.deleteChecklist(req.params.checklistId);
  res.status(httpStatus.OK).send(checklist);
})

const deleteChecklistItem = catchAsync(async (req, res) => {
  const checklist = await checklistService.deleteChecklistItem(req.query.checklistId, req.params.checklistItemId);
  res.status(httpStatus.OK).send(checklist);
})

const updateChecklist = catchAsync(async (req, res) => {
  const checklist = await checklistService.updateChecklist(req.params.checklistId, req.body);
  res.status(httpStatus.OK).send(checklist);
})

module.exports = {
  addChecklistItem,
  updateChecklistItem,
  deleteChecklist,
  deleteChecklistItem,
  updateChecklist
}
