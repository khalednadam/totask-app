const express = require("express");
const validate = require("../../middlewares/validate");
const { boardController } = require("../../controllers/index");
const { boardValidation } = require("../../validations");
const checkCache = require("../../middlewares/redisCache");

const router = express.Router();

router.post("/create", validate(boardValidation.createBoard), boardController.createBoard);
router.delete("/:boardId", validate(boardValidation.deleteBoard), boardController.deleteBoard);
router.get("/of/:workspaceId", validate(boardValidation.getBoards), boardController.getBoardsByWorkspace);
router.get("/:boardId", validate(boardValidation.getBoard), boardController.getBoard);
router.put("/:boardId", boardController.updateBoard);
router.get("/isUserAdmin/:boardId", validate(boardValidation.checkUserStatus), boardController.checkIfUserIsAdmin);
router.get("/membersOf/:boardId", boardController.getAllMembers);
router.get("/workspaceMembersOf/:boardId", boardController.getWorkspaceMembersByBoardId);
module.exports = router;
