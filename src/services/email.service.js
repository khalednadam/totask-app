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
  const subject = "Reset password";
  const resetPasswordURL = `${config.baseURL}/reset-password?token=${token}`;
  const text = `<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <h1 style="color: #333;">Password Reset</h1>
    <p style="color: #666; line-height: 1.6;">Dear user,</p>
    <p style="color: #666; line-height: 1.6;">To reset your password, click this link:</p>
    <p style="color: #666; line-height: 1.6;"><a href="${resetPasswordURL}" style="display: inline-block; padding: 10px 20px; background-color: #79AC78; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
    <p style="color: #666; line-height: 1.6;">If you did not request any password reset, then ignore this email.</p>
  </div>
</body>`;
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
  //   const text = `Dear user,
  // To verify your email, click on this link: ${verificationEmailURL}
  // If you did not create an account, then ignore this email.`;
  const text = `
  <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); font-family: Lato, Arial , sans-serif;">
    <h1 style="color: #333;">Email Verification</h1>
    <p style="color: #666; line-height: 1.6;">Dear user,</p>
    <p style="color: #666; line-height: 1.6;">To verify your email, click on this link:</p>
    <p style="color: #666; line-height: 1.6;"><a href="${verificationEmailURL}" style="display: inline-block; padding: 10px 20px; background-color: #79AC78; color: #fff; text-decoration: none; border-radius: 5px;">Verify Email</a></p>
    <p style="color: #666; line-height: 1.6;">If you did not create an account, then ignore this email.</p>
  </div>
`
  await sendEmail(to, subject, text);
};

module.exports = { sendEmail, sendResetPasswordEmail, sendVerificationEmail };
