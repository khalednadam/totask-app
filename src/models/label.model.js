const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

// const schema = mongoose.Schema;
const labelSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      uppercase: true
    },
    // board: {
    //   type: schema.Types.ObjectId,
    //   ref: "Board",
    //   required: true,
    // },
    color: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true,
    strictPopulate: false
  });


/**
 * @typedef Label
 */
labelSchema.plugin(toJSON);
labelSchema.plugin(paginate);
const Label = mongoose.model("Label", labelSchema);

module.exports = Label;
