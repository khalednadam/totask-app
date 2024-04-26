const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const schema = mongoose.Schema;
const cardSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    list: {
      type: schema.Types.ObjectId,
      ref: "List",
      required: true
    },
    board: {
      type: schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    attachments: [{
      type: String,
    }],
    position: {
      type: Number,
      required: true,
      default: 0
    },
    cover: {
      type: String
    },
    startDate: {
      type: Date,
      default: null
    },
    endDate: {
      type: Date,
      default: null
    },
    description: {
      type: String,
    },
    assignees: [{
      type: schema.Types.ObjectId,
      ref: "User"
    }],
    labels: [{
      type: schema.Types.ObjectId,
      ref: "Label"
    }],
    comments: [{
      type: schema.Types.ObjectId,
      ref: "Comment"
    }],
    checklist: {
      type: schema.Types.ObjectId,
      ref: "Checklist"
    },
    isComplete: {
      type: Boolean,
      default: false
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
  });

/**
 * @typedef Card 
 */
cardSchema.plugin(toJSON);
cardSchema.plugin(paginate);
const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
