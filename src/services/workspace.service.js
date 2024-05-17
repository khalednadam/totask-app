const httpStatus = require("http-status");
const { Workspace, Board, Card } = require("../models/index");
const ApiError = require("../utils/ApiError");
const { userService, workspaceService } = require(".");

/**
 * creates a workspace
 * @param {Object} workspaceBody
 * @param {ObjectId} userId
 * @returns {Workspace}
 */
const createWorkspace = async (workspaceBody, userId) => {
  if (!userId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "please login");
  }
  workspaceBody.admins = [userId];
  workspaceBody.createdBy = userId;
  workspaceBody.updatedBy = userId;
  workspaceBody.members = [userId];
  return Workspace.create(workspaceBody);
};

/**
 * get a workspace by id
 * @param {ObjectId} workspaceId
 * @returns {Promise<Workspace>}
 */
const getWorkspaceById = async (workspaceId) => {
  return Workspace.findById(workspaceId).populate(['members', 'admins', 'boards']);
};

/**
 * update a workspace by id
 * @param {ObjectId} id
 * @param {Object} workspaceUpdateBody
 * @returns {Promise<Workspace>}
 */
const updateWorkspaceById = async (
  workspaceId,
  workspaceUpdateBody,
) => {
  const workspace = await getWorkspaceById(workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "workspace not found");
  }
  workspace.updatedAt = new Date();
  Object.assign(workspace, workspaceUpdateBody);
  await workspace.save();
  return workspace;
};

/**
 * delete a workspace by id
 * @param {ObjectId} workspaceId
 * @param {ObjectId} workspaceCreatorId
 * @returns {Promise<Workspace>}
 */
const deleteWorkspaceById = async (workspaceId, workspaceCreatorId) => {
  const workspace = await getWorkspaceById(workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "workspace not found");
  }
  if (workspace.createdBy.toString() !== workspaceCreatorId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized to delete this workspace"
    );
  }
  await Workspace.deleteOne({ _id: workspaceId });
  return workspace;
};

/**
 * Query for workspaces
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
const queryWorkspaces = async (filter, options) => {
  options.populate = options.populate ? `${options.populate}, admins, members, createBy, updatedBy, boards` : 'admins, members, createdBy, updatedBy, boards';
  const workspaces = await Workspace.paginate(filter, options);
  return workspaces;
};

/**
 * add a member to a workspace
 * @param {ObjectId} workspaceId
 * @param {ObjectId} userId
 * @param {ObjectId} adminId
 * @returns {Promise<Workspace>}
 */
const addMemberToWorkspace = async (workspaceId, emailOfUserToAdd, adminId) => {
  const workspace = await getWorkspaceById(workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workspace not found");
  }
  const isAdmin = await checkIfUserIsAdmin(workspaceId, adminId);
  if (!isAdmin || !adminId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You are not authroized to add a member to the workspace"
    );
  }
  if (!workspace.isPremium && workspace.members.length >= 5) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You have reached the limit for free plan");
  }
  const user = await userService.getUserByEmail(emailOfUserToAdd);
  // const userById = await userService.getUserById(user._id)
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "user is not fount");
  }
  if (!user.isEmailVerified) {
    throw new ApiError(httpStatus.NOT_FOUND, "User is not verified")
  }
  const userToAddId = user._id.toString();
  if (workspace.members.some((user) => user._id.toString() === userToAddId)) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "User is already in the workspace"
    );
  }
  function updateWorkspaceMembers() {
    workspace.members.push(user._id);
    return workspace.members;
  }
  await Board.updateMany(
    {
      workspace: workspaceId,
      isPrivate: false,
      // 'members.id': { $ne: user.id },
    },
    { $push: { members: { _id: user.id } } }
  );
  await updateWorkspaceById(
    workspaceId,
    { members: updateWorkspaceMembers() },
    adminId
  );
  return user;
};

/**
 * remove a member from a workspace
 * @param {ObjectId} workspaceId
 * @param {ObjectId} userToRemoveEmail
 * @param {ObjectId} adminId
 * @returns {Promise<Workspace>}
 */
const removeUserFromWorkspace = async (
  workspaceId,
  emailOfUserToRemove,
  adminId
) => {
  const workspace = await getWorkspaceById(workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workspace not found");
  }
  const isAdmin = await checkIfUserIsAdmin(workspaceId, adminId);
  if (!isAdmin) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You are not authroized to add a member to the workspace"
    );
  }
  const user = await userService.getUserByEmail(emailOfUserToRemove);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "user is not fount");
  }
  const userToRemoveId = user.id;
  const isMember = await checkIfUserIsMember(workspaceId, userToRemoveId)
  if (!isMember) {
    throw new ApiError(httpStatus.FORBIDDEN, "User is not in the workspace");
  }
  function updateWorkspaceMembers() {
    const newMembers = workspace.members.filter(
      (member) => member.id != userToRemoveId
    );
    workspace.members = newMembers;
    return workspace.members;
  }
  await updateWorkspaceById(
    workspaceId,
    { members: updateWorkspaceMembers() },
    adminId
  );
  const boards = await Board.find({ workspace: workspaceId });

  for (const board of boards) {
    // Remove the user from the board members
    board.members = board.members.filter(memberId => memberId !== userToRemoveId.toString());
    await board.save();
    const cards = await Card.find({ board: board.id });

    for (const card of cards) {
      card.assignees = card.assignees.filter(memberId => memberId !== userToRemoveId.toString());
      await card.save();
    }
  }
  return user;
};

/**
 * gets all the members regardless of their role
 * @async
 * @param {ObjectId} workspaceId
 * @param {ObjectId} userId
 * @returns {Array}
 */
const getAllMembers = async (workspaceId, userId) => {
  const workspace = await getWorkspaceById(workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workspace was not found");
  }
  const isMember = await checkIfUserIsMember(workspaceId, userId);
  if (!isMember) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You are not allowed to see the members of this workspace"
    );
  }
  const members = workspace.members;
  return members.filter((member) => member.id != userId);
};


/**
 * get the members in the workspace
 * @param {ObjectId} workspaceId
 * @param {ObjectId} userId
 * @returns {Promise<Object[]>}
 */
const getWorkspaceMembers = async (workspaceId, userId) => {
  const workspace = await getWorkspaceById(workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workspace was not found");
  }
  const isMember = await checkIfUserIsMember(workspaceId, userId);
  if (!isMember) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You are not allowed to see the members of this workspace"
    );
  }

  return workspace.members;
};

/**
 * get workspace admins
 * @param {ObjectId} workspaceId
 * @param {ObjectId} userId
 * @returns {Promise<Object[]>}
 */
const getWorkspaceAdmins = async (workspaceId, userId) => {
  const workspace = await getWorkspaceById(workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workspace was not found");
  }
  const isMember = await checkIfUserIsMember(workspaceId, userId)
  if (!isMember) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You are not allowed to see the members of this workspace"
    );
  }
  return workspace.members;
};

/**
 * promote a member to an admin
 * @param {ObjectId} workspaceId
 * @param {ObjectId} memberToPromoteId
 * @param {ObjectId} adminId
 */
const promoteMemberToAdmin = async (
  workspaceId,
  memberToPromoteId,
  adminId
) => {
  const workspace = await getWorkspaceById(workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workspace was not found");
  }
  if (!adminId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const isAdmin = await checkIfUserIsAdmin(workspaceId, adminId);
  if (!isAdmin) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You need to be an admin to promote member to admin"
    );
  }
  const isUserMember = await checkIfUserIsMember(workspaceId, userId);
  if (!isUserMember) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "You need to add the user to the workspace first"
    );
  }
  const isMemberToPromoteAdmin = await checkIfUserIsAdmin(workspaceId, memberToPromoteId);
  if (isMemberToPromoteAdmin) {
    throw new ApiError(
      httpStatus.METHOD_NOT_ALLOWED,
      "Member is already an admin"
    );
  }
  function promoteMember() {
    workspace.admins.push(memberToPromoteId);
    return workspace.admins;
  }
  const newWorkspace = await updateWorkspaceById(
    workspaceId,
    {
      admins: promoteMember(),
    },
    adminId
  );
  return newWorkspace;
};

/**
 * remove a member from the adminship
 * @param {ObjectId} workspaceId
 * @param {ObjectId} adminToRemoveId
 * @param {ObjectId} removerId
 */
const removeWorkspaceAdmin = async (
  workspaceId,
  adminToRemoveId,
  removerId
) => {
  const workspace = await getWorkspaceById(workspaceId);
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Workspace was not found");
  }
  if (!removerId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  if (workspace.createdBy != removerId) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      "Only workspace creator can remove admins"
    );
  }
  const isAdmin = await checkIfUserIsAdmin(workspaceId, adminId);
  if (!isAdmin) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin was not found");
  }
  function updateWorkspaceAdmins() {
    const newAdmins = workspace.admins.filter(
      (adminId) => adminId != adminToRemoveId
    );
    workspace.admins = newAdmins;
    return workspace.admins;
  }
  const newWorkspace = await updateWorkspaceById(
    workspaceId,
    {
      admins: updateWorkspaceAdmins(),
    },
    removerId
  );
  return newWorkspace;
};

/**
 *
 * @param {Boolean} canMemberAddBoards
 * @param {ObjectId} workspaceId
 * @param {ObjectId} currentUserId
 * @returns
 */
const changeCanMemberAddBoards = async (
  canMemberAddBoards,
  workspaceId,
  currentUserId
) => {
  if (!currentUserId) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please autheticate");
  }
  const workspace = await getWorkspaceById(workspaceId);
  const isAdmin = await checkIfUserIsAdmin(workspaceId, currentUserId);
  if (!isAdmin) {
    throw new ApiError(
      httpStatus.FORBIDDEN,
      "You can't change the settings of this workspace"
    );
  }
  function updateCanMemberAddBoards() {
    return (workspace.canMemberAddBoards = canMemberAddBoards);
  }
  const newWorkspace = await updateWorkspaceById(
    workspaceId,
    {
      canMemberAddBoards: updateCanMemberAddBoards(),
    },
    currentUserId
  );
  return newWorkspace;
};

/*
 * checks if a given user is admin in workspace or not
 * @param {ObjectId} workspaceId
 * @param {ObjectId} userId
 * @returns {Boolean}
 */
const checkIfUserIsAdmin = async (workspaceId, userId) => {
  const workspace = await Workspace.findById(workspaceId, 'admins');
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Worksapce was not found");
  }
  const isAdmin = workspace.admins.includes(userId);
  if (isAdmin) {
    return true;
  }
  return false;
}

/*
 * checks if a given user is member in workspace or not
 * @param {ObjectId} workspaceId
 * @param {ObjectId} userId
 * @returns {Boolean}
 */
const checkIfUserIsMember = async (workspaceId, userId) => {
  const workspace = await Workspace.findById(workspaceId, 'members');
  if (!workspace) {
    throw new ApiError(httpStatus.NOT_FOUND, "Worksapce was not found");
  }
  const isMember = workspace.members.includes(userId);
  if (isMember) {
    return true;
  }
  return false;
}

module.exports = {
  createWorkspace,
  getWorkspaceById,
  updateWorkspaceById,
  deleteWorkspaceById,
  queryWorkspaces,
  addMemberToWorkspace,
  removeUserFromWorkspace,
  getWorkspaceMembers,
  getWorkspaceAdmins,
  promoteMemberToAdmin,
  removeWorkspaceAdmin,
  changeCanMemberAddBoards,
  getAllMembers,
  checkIfUserIsAdmin,
  checkIfUserIsMember
};
