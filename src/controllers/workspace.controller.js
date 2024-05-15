const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { workspaceService } = require("../services");

const createWorkspace = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please login")
  }
  const workspace = await workspaceService.createWorkspace(
    req.body,
    req.session.user.id
  );
  res.status(httpStatus.CREATED).send(workspace);
});

const getWorkspace = catchAsync(async (req, res) => {
  const workspace = await workspaceService.getWorkspaceById(
    req.params.workspaceId
  );
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workspace was not found");
  }
  // const isMember = await workspaceService.checkIfUserIsMember(workspace._id, req.session.user.id);
  const isAdmin = await workspaceService.checkIfUserIsAdmin(workspace._id, req.session.user.id);
  res.send({ ...workspace._doc, isAdmin });
});

const updateWorkspace = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please login");
  }
  const isAdmin = await workspaceService.checkIfUserIsAdmin(req.params.workspaceId, req.session.user.id) || req.session.user.role === 'admin';
  if (!isAdmin) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You need to be admin to be able to update this worksapce");
  }
  const workspace = await workspaceService.updateWorkspaceById(
    req.params.workspaceId,
    req.body,
  );
  res.status(httpStatus.OK).send(workspace);
});

const getWorkspacesForUserId = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const filter = { members: req.session.user.id };
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const workspaces = await workspaceService.queryWorkspaces(filter, options);
  res.send(workspaces);
});

const getAllWorkspaces = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["members", "name"]);
  if (req.query.name && req.query.name.trim().length > 1) {
    filter.name = { $regex: req.query.name, $options: 'i' };
  }
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await workspaceService.queryWorkspaces(filter, options);
  res.send(result);
});

const addMemberToWorkspace = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const workspace = await workspaceService.addMemberToWorkspace(
    req.params.workspaceId,
    req.body.userEmail,
    req.session.user.id
  );
  res.status(httpStatus.OK).send(workspace);
});

const removeUserFromWorkspace = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const user = await workspaceService.removeUserFromWorkspace(
    req.params.workspaceId,
    req.body.userEmail,
    req.session.user.id
  );
  res.status(httpStatus.OK).send(user);
});

const getWorkspaceMembers = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const users = await workspaceService.getWorkspaceMembers(
    req.params.workspaceId,
    req.session.user.id
  );
  res.status(httpStatus.OK).send(users);
});

const getWorkspaceAdmins = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const users = await workspaceService.getWorkspaceAdmins(
    req.params.workspaceId,
    req.session.user.id
  );
  res.status(httpStatus.OK).send(users);
});

const getWorkspacesAsAdmin = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const filter = { admins: req.session.user.id };
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const workspaces = await workspaceService.queryWorkspaces(filter, options);
  res.status(httpStatus.OK).send(workspaces);
});

const getWorkspacesAsMember = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const filter = {
    members: req.session.user.id,
    admins: { $nin: [req.session.user.id] },
  };
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const workspaces = await workspaceService.queryWorkspaces(filter, options);

  res.status(httpStatus.OK).send(workspaces);
});

const promoteMemberToAdmin = catchAsync(async (req, res) => {
  const promote = await workspaceService.promoteMemberToAdmin(
    req.body.workspaceId,
    req.body.memberToPromoteId,
    req.session.user.id
  );
  res.status(httpStatus.OK).send(promote);
});

const removeWrokspaceAdmin = catchAsync(async (req, res) => {
  const newWorkspace = await workspaceService.removeWorkspaceAdmin(
    req.body.workspaceId,
    req.body.adminToRemoveId,
    req.session.user.id
  );
  res.status(httpStatus.OK).send(newWorkspace);
});

const deleteWorkspace = catchAsync(async (req, res) => {
  await workspaceService.deleteWorkspaceById(
    req.params.workspaceId,
    req.session.user.id
  );
  res.status(httpStatus.NO_CONTENT).send();
});

const canMemberAddBoards = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const newWorkspace = await workspaceService.changeCanMemberAddBoards(
    req.body.canMemberAddBoards,
    req.params.workspaceId,
    req.session.user.id
  );
  res.status(httpStatus.OK).send(newWorkspace);
});

const getAllMembers = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const members = await workspaceService.getAllMembers(
    req.params.workspaceId,
    req.session.user.id
  );
  res.status(httpStatus.OK).send(members);
});

const checkIfUserIsAdmin = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please login");
  }
  const isAdmin = await workspaceService.checkIfUserIsAdmin(req.params.workspaceId, req.session.user.id);
  res.status(httpStatus.OK).send(isAdmin);
})

module.exports = {
  createWorkspace,
  getWorkspacesForUserId,
  getAllWorkspaces,
  addMemberToWorkspace,
  removeUserFromWorkspace,
  getWorkspaceMembers,
  getWorkspaceAdmins,
  getWorkspacesAsAdmin,
  getWorkspacesAsMember,
  promoteMemberToAdmin,
  removeWrokspaceAdmin,
  getWorkspace,
  deleteWorkspace,
  updateWorkspace,
  canMemberAddBoards,
  getAllMembers,
  checkIfUserIsAdmin
};
