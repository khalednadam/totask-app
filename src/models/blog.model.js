const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const schema = mongoose.Schema;
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    text: {
      type: String,
      required: true,
      minlength: 50,
    },
    cover: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    strictPopulate: false,
  });

/**
 * @typedef Card 
 */
blogSchema.plugin(toJSON);
blogSchema.plugin(paginate);
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;

