const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");
const listModel = require("./list.model");

const schema = mongoose.Schema;
const boardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    backgroundColor: {
      type: String,
      required: true,
      default: "default",
    },
    backgroundImage: {
      type: String,
    },
    description: {
      type: String,
      required: false,
    },
    workspace: {
      type: schema.Types.ObjectId,
      required: true,
      ref: "Workspace",
    },
    closed: {
      type: Boolean,
      required: true,
      default: false,
    },
    lists: [
      {
        type: schema.Types.ObjectId,
        ref: "List",
      },
    ],
    listCount: {
      type: Number,
      default: 0,
      required: true
    },
    labels: [
      {
        type: schema.Types.ObjectId,
        ref: "Label"
      }
    ],
    members: [
      {
        type: schema.Types.ObjectId,
        ref: "User",
      },
    ],
    onlyAdminsEdit: {
      type: Boolean,
      default: false,
    },
    isPrivate: {
      type: Boolean,
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
    strictPopulate: false,
  }
);


boardSchema.pre('deleteOne', async function(next) {
  try {
    await listModel.deleteMany({ board: this._conditions._id });
    next();
  } catch (error) {
    next(error);
  }
});


/**
 * @typedef Board
 */
boardSchema.plugin(toJSON);
boardSchema.plugin(paginate);
const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
