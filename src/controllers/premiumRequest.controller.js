const { ApiError } = require("@google-cloud/storage");
const catchAsync = require("../utils/catchAsync");
const httpStatus = require("http-status");
const { premiumRequestService } = require("../services");
const pick = require("../utils/pick");

const createPremiumRequest = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  const request = await premiumRequestService.createPremiumRequest(req.body);
  res.status(httpStatus.CREATED).send(request);
});

const getRequest = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  if (req.session.user.role !== 'admin') {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You cannot view this request")
  }
  const request = await premiumRequestService.getRequestById(req.params.requestId);
  res.status(httpStatus.OK).send(request);
});

const queryRequests = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  if (req.session.user.role !== 'admin') {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You cannot view this request")
  }
  const filter = pick(req.query, ["user", "workspace"]);
  const options = pick(req.query, ["sort", "limit", "page"]);
  const requests = await premiumRequestService.queryRequests(filter, options);
  res.status(httpStatus.OK).send(requests);
});

const acceptRequest = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  if (req.session.user.role !== 'admin') {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You cannot view this request")
  }
  const request = await premiumRequestService.acceptRequest(req.params.requestId);
  res.status(httpStatus.OK).send(request);
});

const deleteRequest = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  if (req.session.user.role !== 'admin') {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You cannot view this request")
  }
  const request = await premiumRequestService.deleteRequest(req.params.requestId);
  res.status(httpStatus.OK).send(request);
});

module.exports = {
  createPremiumRequest,
  getRequest,
  queryRequests,
  deleteRequest,
  acceptRequest
}
