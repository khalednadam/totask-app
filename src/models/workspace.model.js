const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const boardModel = require("./board.model"); // Require the board model within the function scope
const listModel = require("./list.model");
const schema = mongoose.Schema;

const workspaceSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
    },
    description: {
      type: String,
    },
    icon: {
      type: String,
    },
    admins: [
      {
        type: schema.Types.ObjectId,
        ref: "User",
      },
    ],
    members: [
      {
        type: schema.Types.ObjectId,
        ref: "User",
      },
    ],
    boards: [
      {
        type: schema.Types.ObjectId,
        ref: "Board",
      },
    ],
    canMemberAddBoards: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdBy: {
      type: schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    strictPopulate: false
  }
);
workspaceSchema.pre('deleteOne', async function(next) {
  try {
    const boardIds = this._conditions._id ? await boardModel.find({ workspace: this._conditions._id }).distinct('_id') : [];
    if (boardIds.length > 0) {
      await Promise.all([
        boardModel.deleteMany({ workspace: this._conditions._id }),
        listModel.deleteMany({ board: { $in: boardIds } })
      ]);
    }
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * @typedef Workspace
 */
workspaceSchema.plugin(toJSON);
workspaceSchema.plugin(paginate);
const Workspace = mongoose.model("Workspace", workspaceSchema);

// plugin to convert mongoose to JSON

module.exports = Workspace;
