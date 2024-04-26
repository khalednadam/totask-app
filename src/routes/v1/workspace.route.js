const express = require("express");
const { workspaceValidation } = require("../../validations");
const router = express.Router();
const { workspaceController } = require("../../controllers/index");
const validate = require("../../middlewares/validate");

router.post(
  "/create",
  validate(workspaceValidation.createWorkspace),
  workspaceController.createWorkspace
);

router.get(
  "/my",
  validate(workspaceValidation.getWorkspacesForUser),
  workspaceController.getWorkspacesForUserId
);

router.get(
  "/myAdminWorkspaces",
  validate(workspaceValidation.getWorkspacesForUser),
  workspaceController.getWorkspacesAsAdmin
);

router.get(
  "/myMemberWorkspaces",
  validate(workspaceValidation.getWorkspacesForUser),
  workspaceController.getWorkspacesAsMember
);

router.get(
  "/usersOf/:workspaceId",
  validate(workspaceValidation.getMembers),
  workspaceController.getWorkspaceMembers
);

router.get(
  "/adminsOf/:workspaceId",
  validate(workspaceValidation.getMembers),
  workspaceController.getWorkspaceAdmins
);

router.put(
  "/promoteMemberToAdmin",
  validate(workspaceValidation.modifyUserRole),
  workspaceController.promoteMemberToAdmin
);

router.put(
  "/removeWorkspaceAdmin",
  validate(workspaceValidation.modifyUserRole),
  workspaceController.removeWrokspaceAdmin
);

router.post(
  "/addUserTo/:workspaceId",
  validate(workspaceValidation.addRemoveMember),
  workspaceController.addMemberToWorkspace
);

router.put(
  "/removeUserFrom/:workspaceId",
  validate(workspaceValidation.addRemoveMember),
  workspaceController.removeUserFromWorkspace
);

router
  .route("/")
  .get(validate(workspaceValidation.getAllWorkspaces), workspaceController.getAllWorkspaces);

router
  .route("/:workspaceId")
  .get(validate(workspaceValidation.getWorkspace), workspaceController.getWorkspace)
  .delete(validate(workspaceValidation.deleteWorkspace), workspaceController.deleteWorkspace)
  .put(workspaceController.updateWorkspace);

router.put(
  "/changeAccess/:workspaceId",
  validate(workspaceValidation.updateWorkspace),
  workspaceController.canMemberAddBoards
);

router.get(
  "/getAllMembers/:workspaceId",
  validate(workspaceValidation.getMembers),
  workspaceController.getAllMembers
);

router.get("/isUserAdmin/:workspaceId",
  workspaceController.checkIfUserIsAdmin);

module.exports = router;
