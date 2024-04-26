const express = require("express");
const { checklistController } = require("../../controllers/index");
const router = express.Router();
const validate = require("../../middlewares/validate");
const { checklistValidation } = require("../../validations");
const authAndMembershipMiddleware = require("../../middlewares/authAndMembership");

router.delete("/:checklistId", validate(checklistValidation.deleteChecklist), authAndMembershipMiddleware, checklistController.deleteChecklist)
router.put("/:checklistId", validate(checklistValidation.updateChecklist), authAndMembershipMiddleware, checklistController.updateChecklist);
router.post("/item/:checklistId", validate(checklistValidation.addChecklistItem), authAndMembershipMiddleware, checklistController.addChecklistItem);
router.put("/item/:checklistItemId", authAndMembershipMiddleware, validate(checklistValidation.updateChecklistItem), checklistController.updateChecklistItem);
router.delete("/item/:checklistItemId", authAndMembershipMiddleware, validate(checklistValidation.deleteChecklistItem), checklistController.deleteChecklistItem);
module.exports = router;
