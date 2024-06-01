const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const schema = mongoose.Schema;

const checklistItemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
  position: {
    type: Number,
    default: 1024
    // required: true,
  }
});

const checklistSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    checklistItems: [checklistItemSchema],
    card: {
      type: schema.Types.ObjectId,
      ref: "Card",
    },
    checkedItemsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    strictPopulate: false,
  }
);

/**
 * @typedef Checklist
 */
checklistSchema.plugin(toJSON);
checklistSchema.plugin(paginate);
checklistItemSchema.plugin(toJSON);

// checklistSchema.pre('save', function(next) {
//   this.checklistItems.sort((a, b) => a.position - b.position);
//   next();
// });
//
// checklistSchema.pre('save', function(next) {
//   // Count the number of checked items
//   const checkedItemsCount = this.checklistItems.reduce((count, item) => {
//     return count + (item.isChecked ? 1 : 0);
//   }, 0);
//   // Update the checkedItemsCount field
//   this.checkedItemsCount = checkedItemsCount;
//
//   next();
// });
const Checklist = mongoose.model("Checklist", checklistSchema);

module.exports = Checklist;
