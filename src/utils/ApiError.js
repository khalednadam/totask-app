// class ApiError extends Error {
//   constructor(statusCode, message, isOperational = true, stack = "") {
//     super(message);
//     this.statusCode = statusCode;
//     this.message = message; // Set the message property
//     this.isOperational = isOperational;
//     if (stack) {
//       this.stack = stack;
//     } else {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
module.exports = ApiError;
