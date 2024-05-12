const mongoose = require("mongoose");
const { toJSON, paginate } = require("./plugins");

const schema = mongoose.Schema;
const premiumRequestSchema = mongoose.Schema(
  {
    workspace: {
      type: schema.Types.ObjectId,
      required: true,
      ref: "Workspace"
    },
    user: {
      type: schema.Types.ObjectId,
      required: true,
      ref: "User"
    }
  },
  {
    timestamps: true,
    strictPopulate: false,
  });

/**
 * @typedef PremiumRequest 
 */
premiumRequestSchema.plugin(toJSON);
premiumRequestSchema.plugin(paginate);
const PremiumRequest = mongoose.model("PremiumRequest", premiumRequestSchema);

module.exports = PremiumRequest;
