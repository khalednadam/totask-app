const express = require("express");
const { commentController } = require("../../controllers");
const authAndMembershipMiddleware = require("../../middlewares/authAndMembership");
const router = express.Router();

router.post("/:cardId/create", authAndMembershipMiddleware, commentController.createComment);
router.get("/:commentId", authAndMembershipMiddleware, commentController.getCommentById);
router.put("/:commentId", authAndMembershipMiddleware, commentController.updateCommentById);
router.delete("/:commentId", authAndMembershipMiddleware, commentController.deleteCommentById);

module.exports = router;
