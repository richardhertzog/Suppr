const nodemailer = require('nodemailer');
const config = require('../config');

// create reusable transporter object using the default SMTP transport
exports.sendMail = function(email, token, cb) {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.forgotUser,
      pass: config.forgotPassword
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: config.forgotUser, // sender address
    to: email, // list of receivers
    subject: 'Reset Password', // Subject line
    text: 'Reset password',
    html: '<div>' +
          '<p>You are receiving this because you (or someone else) have requested the reset of the password for your Suppr.io account.</p>' +
          '<p>Please click on the following link, or paste this into your browser to complete the process:</p>' +
          '<a href=' + config.client + '/auth/reset/' + token + '>Link to reset the password.</a>' +
          '<p>This link will expire in one hour.</p>' +
          '<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>' +
          '</div>'
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, cb);
};
