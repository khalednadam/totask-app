const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { Blog } = require("../models/index");
const googleStorage = require("../utils/googleStorage");

/**
 * Create a new blog post.
 * @async
 * @param {Object} blogBody - The body of the blog post containing its content and metadata.
 * @param {Object} file - The file object representing the cover image for the blog post.
 * @returns {Promise<Object>} A Promise that resolves to the newly created blog post object.
 * @throws {Error} Throws an error if there is an issue with the creation process.
 */
const createBlogPost = async (blogBody, file) => {
  const coverUrl = await googleStorage.uploadToGoogleStorage(file.originalname, file.buffer);
  blogBody.cover = coverUrl;
  return Blog.create(blogBody);
}

/**
 * Get a blog post by its ID.
 * @async
 * @param {string} blogPostId - The ID of the blog post to retrieve.
 * @returns {Promise<Object>} A Promise that resolves to the blog post object.
 * @throws {ApiError} Throws an ApiError with a NOT_FOUND status if the specified blog post ID does not exist.
 */
const getBlogPostById = async (blogPostId) => {
  const post = await Blog.findById(blogPostId);
  if (!post) {
    throw new ApiError(httpStatus.NOT_FOUND, "Blog post was not found");
  }
  return post;
}

/**
 * query blog posts
 * @async
 * @param {Object} filter
 * @param {Object} options
 * @returns  {Promise<Object>}
 */
const queryBlogPosts = async (filter, options) => {
  const blogPosts = await Blog.paginate(filter, options);
  return blogPosts
}

/**
 * updates a blog post by its id
 * @async
 * @param {ObjectId} blogPostId
 * @param {Object} newBlogPostBody
 * @param {Object} file
 * @returns {Promise<Object>}
 * @throws {ApiError}
 */
const updateBlogPost = async (blogPostId, newBlogPostBody, file) => {
  const post = await getBlogPostById(blogPostId);
  Object.assign(post, newBlogPostBody)
  if (file) {
    await googleStorage.deleteFileFromGoogleStorage(post.cover);
    const newCover = await googleStorage.uploadToGoogleStorage(file.originalname, file.buffer);
    post.cover = newCover;
  }
  post.updatedAt = new Date();
  return await post.save();
}

/**
 * Delete a blog post by its ID.
 * @async
 * @param {string} blogPostId - The ID of the blog post to delete.
 * @returns {Promise<Object>} A Promise that resolves to the result of the deletion operation.
 */
const deleteBlogPost = async (blogPostId) => {
  return await Blog.deleteOne({ _id: blogPostId });
}

module.exports = {
  createBlogPost,
  getBlogPostById,
  queryBlogPosts,
  updateBlogPost,
  deleteBlogPost
}
