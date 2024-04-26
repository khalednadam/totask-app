const express = require("express");
const { labelController } = require("../../controllers");
const authAndMembershipMiddleware = require("../../middlewares/authAndMembership");
const router = express.Router();

router.post("/create", authAndMembershipMiddleware, labelController.createLabel);
router.get("/:labelId", authAndMembershipMiddleware, labelController.getLabelById);
router.put("/:labelId", authAndMembershipMiddleware, labelController.updateLabelById);
router.delete("/:labelId", authAndMembershipMiddleware, labelController.deleteLabelById);

module.exports = router;
