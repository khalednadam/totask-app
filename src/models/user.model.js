const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { toJSON, paginate } = require("./plugins");
const passportLocalMongoose = require("passport-local-mongoose");

const schema = mongoose.Schema;
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (
          !value.match(
            /^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{0,28}[a-zA-Z0-9]$/
          )
        ) {
          throw new Error("Invalid user name");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user",
    },
    profilePhotoUrl: {
      type: String,
      default: null,
    },
    workspaces: [
      {
        type: schema.Types.ObjectId,
        ref: "Workspace",
      },
    ],
    boards: [
      {
        type: schema.Types.ObjectId,
        ref: "Board",
      },
    ],
    cards: [
      {
        type: schema.Types.ObjectId,
        ref: "Card",
      },
    ],
    favoriteBoards: [
      {
        type: schema.Types.ObjectId,
        ref: "Board",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// plugin to convert mongoose to JSON
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * check if email is taken
 * @param {string} email
 * @param {ObjectId} excludeUserId
 * @returns {Promise<Boolean>}
 */
userSchema.statics.isEmailTaken = async function(email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * check if username is taken
 * @param {string} userName
 * @param {ObjectId} excludeUserId
 * @returns {Promise<Boolean>}
 */
userSchema.statics.isUsernameTaken = async function(username, excludeUserId) {
  const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * check if the entered password matches with the user's password
 * @param {string} password
 * @returns {Promise<Boolean>}
 */
userSchema.methods.isPasswordMatch = async function(password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

/**
 * checks if the password is changed and runs before saving the document
 */
userSchema.pre("save", async function(next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
