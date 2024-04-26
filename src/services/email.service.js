const nodemailer = require("nodemailer");
const config = require("../config/config");
const logger = require("../config/logger");

const transport = nodemailer.createTransport(config.email.smtp);
if (config.env !== "test") {
  transport
    .verify()
    .then(() => {
      logger.info("Connected to the email server");
    })
    .catch(() => {
      logger.warn(
        "Unable to connect to email server. Make sure you have configured the SMTP options"
      );
    });
}

/**
 * send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 */
const sendEmail = async (to, subject, html) => {
  const msg = { from: config.email.from, to, subject, html };
  await transport.sendMail(msg);
};

/**
 * send reset password email
 * @param {string} to
 * @param {string} token
 */
const sendResetPasswordEmail = async (to, token) => {
  // console.log(config.baseURL);
  // TODO: add frontend app URL in config
  const frontendURL = `http://localhost:5173`
  const subject = "Reset password";
  const resetPasswordURL = `${frontendURL}/reset-password?token=${token}`;
  const text = `Dear user, 
  To reset your password, click this link: ${resetPasswordURL}
  If you did not request any password reset, then ignore this email.`;
  await sendEmail(to, subject, text);
};

/**
 * send verification email
 * @param {string} to
 * @param {string} token
 */
const sendVerificationEmail = async (to, token) => {
  const subject = "Verify Email";
  const verificationEmailURL = `${config.baseURL}/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailURL}
If you did not create an account, then ignore this email.`;
  await sendEmail(to, subject, text);
};

module.exports = { sendEmail, sendResetPasswordEmail, sendVerificationEmail };
