/**
 * check if objectId is a valid id
 * @param {*} value
 * @param {*} helpers
 * @returns
 */
const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

/**
 * check if password is more than 8 characters and containe at least on letter and one digit
 * @param {*} value
 * @param {*} helpers
 * @returns
 */
const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message("Password must be at least 8 characters");
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-z]/)) {
    return helpers.message(
      "password must contain at least 1 letter and 1 number"
    );
  }
  return value;
};

/**
 * check if username is valid
 * @param {*} value
 * @param {*} helpers
 * @returns
 */
const username = (value, helpers) => {
  if (value.length < 1 || value.length > 30) {
    return helpers.message(
      "username must be at least 2 characters and not more than 30 characters"
    );
  }
  if (
    !value.match(/^[a-zA-Z0-9](?!.*[._]{2})[a-zA-Z0-9._]{0,28}[a-zA-Z0-9]$/)
  ) {
    return helpers.message(
      "user name is not valid. You can only use letters and "
    );
  }
  return value;
};
module.exports = {
  objectId,
  password,
  username,
};
