const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { PremiumRequest, Workspace } = require("../models");

/**
 * Creates a premium request asynchronously.
 * @async
 * @param {Object} requestBody - The request body to create the premium request.
 * @returns {Promise<Object>} A Promise that resolves to the created premium request object.
 */
const createPremiumRequest = async (requestBody) => {
  console.log()

  await Workspace.findByIdAndUpdate(requestBody.workspace, { premiumRequested: true });
  return PremiumRequest.create(requestBody);
}

/**
 * Retrieves a premium request by its ID asynchronously.
 * @async
 * @param {string} requestId - The ID of the premium request to retrieve.
 * @returns {Promise<Object|null>} A Promise that resolves to the premium request object if found, or null if not found.
 */
const getRequestById = async (requestId) => {
  return PremiumRequest.findById(requestId).populate(['workspace', 'user']);
}

/**
 * Queries premium requests asynchronously based on provided filters and options.
 * @async
 * @param {Object} filter - The filter criteria to apply to the query.
 * @param {Object} options - Additional options for the query, such as pagination and population.
 * @returns {Promise<Object>} A Promise that resolves to an object containing the paginated premium request results.
 */
const queryRequests = async (filter, options) => {
  options.populate = options.populate ? `${options.populate},user, workspace` : 'user, workspace';
  const requests = await PremiumRequest.paginate(filter, options);
  return requests;
}

/**
 * Accepts a premium request asynchronously.
 * @async
 * @param {string} requestId - The ID of the premium request to accept.
 * @returns {Promise<Object>} A Promise that resolves to the accepted premium request object.
 * @throws {ApiError} Throws an error if the request is not found.
 */
const acceptRequest = async (requestId) => {
  const request = await getRequestById(requestId);
  if (!request) {
    throw new ApiError(httpStatus.NOT_FOUND, "Request not found");
  }
  await Workspace.findByIdAndUpdate(request.workspace._id.toString(), { isPremium: true, premiumRequested: false });
  await deleteRequest(requestId);
  return request;
}

/**
 * Deletes a premium request asynchronously by its ID.
 * @async
 * @param {string} requestId - The ID of the premium request to delete.
 * @returns {Promise<Object|null>} A Promise that resolves to the deleted premium request object if found, or null if not found.
 */
const deleteRequest = async (requestId) => {
  const request = await PremiumRequest.findByIdAndDelete(requestId);
  await Workspace.findByIdAndUpdate(request.workspace._id.toString(), { premiumRequested: false });
  return request;
}

module.exports = {
  createPremiumRequest,
  getRequestById,
  queryRequests,
  acceptRequest,
  deleteRequest
}
