const express = require("express");
const validate = require("../../middlewares/validate");
const { listController } = require("../../controllers/index");
const { listValidation } = require("../../validations");
const router = express.Router();

router.post("/create", validate(listValidation.createList), listController.createList);
router.get("/listsOf/:boardId", validate(listValidation.getLists), listController.getListsByBoard);
router.get("/:listId", validate(listValidation.getList), listController.getListById);
router.put("/:listId", validate(listValidation.updateList), listController.updateListById);
router.delete("/:listId", validate(listValidation.deleteList), listController.deleteListById);
module.exports = router;
