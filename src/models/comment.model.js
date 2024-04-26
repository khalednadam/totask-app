const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const schema = mongoose.Schema;
const commentSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 2,
  },
  user: {
    type: schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
},
  {
    timestamps: true,
    strictPopulate: false
  });

/**
 * @typedef Comment
 */
commentSchema.plugin(toJSON);
commentSchema.plugin(paginate);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
