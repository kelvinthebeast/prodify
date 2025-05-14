const nodemailer = require('nodemailer');

module.exports.sendMail = (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nhan.thanhle1308@gmail.com',
      pass: 'bhpu wyxq zggp dvfu'
    },
    tls: {
      rejectUnauthorized: false,
    }
  });
  const mailOptions = {
    from: 'nhan.thanhle1308@gmail.com',
    to: email,
    subject: subject,
    html: html
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      // do something useful
    }
  });
};