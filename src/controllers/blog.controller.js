const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { blogService } = require("../services");

const createBlogPost = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  if (req.session.user.role !== 'admin') {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You need to be system admin to create new blog post.");
  }
  const blogPost = await blogService.createBlogPost(req.body, req.file);
  res.status(httpStatus.OK).send(blogPost);
})

const updateBlogPost = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  if (req.session.user.role !== 'admin') {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You need to be system admin to create new blog post.");
  }
  const blogPost = await blogService.updateBlogPost(req.params.blogPostId, req.body, req.file);
  res.send(blogPost);
})

const deleteBlogPostById = catchAsync(async (req, res) => {
  if (!req.session.user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  if (req.session.user.role !== 'admin') {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You need to be system admin to create new blog post.");
  }
  await blogService.deleteBlogPost(req.params.blogPostId);
  res.status(httpStatus.NO_CONTENT).send();
})

const getBlogPostById = catchAsync(async (req, res) => {
  const blogPost = await blogService.getBlogPostById(req.params.blogPostId);
  res.send(blogPost);
})

const getBlogPosts = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ["sort", "limit", "page"]);
  const blogPosts = await blogService.queryBlogPosts(filter, options);
  res.send(blogPosts);
})

module.exports = {
  createBlogPost,
  updateBlogPost,
  deleteBlogPostById,
  getBlogPostById,
  getBlogPosts
}
