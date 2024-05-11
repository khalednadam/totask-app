const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const schema = mongoose.Schema;
const listSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    board: {
      type: schema.Types.ObjectId,
      required: true,
      ref: "Board",
    },
    position: {
      type: Number,
      required: true,
      default: 0
    },
    cards: [
      {
        type: schema.Types.ObjectId,
        ref: "Card",
      },
    ],
    color: {
      type: String,
      default: null
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
)
/**
 * @typedef List
 */
listSchema.plugin(toJSON);
listSchema.plugin(paginate);
const List = mongoose.model("List", listSchema);

module.exports = List;
