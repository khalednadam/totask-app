const mongoose = require("mongoose");
const { tokenTypes } = require("../config/tokens");
const { toJSON } = require("./plugins");

const schema = mongoose.Schema;
const tokenSchema = mongoose.Schema(
	{
		token: {
			type: String,
			required: true,
			index: true,
		},
		user: {
			type: mongoose.Schema.ObjectId,
			ref: "User",
			required: true,
		},
		type: {
			type: String,
			enum: [
				tokenTypes.ACCESS,
				tokenTypes.REFRESH,
				tokenTypes.RESET_PASSWORD,
				tokenTypes.VERIFY_EMAIL,
			],
			required: true,
		},
		expires: {
			type: Date,
			required: true,
		},
		blacklisted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

// plugin that converts mongoose to json
tokenSchema.plugin(toJSON);

/**
 * @typedef Token
 */
const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
