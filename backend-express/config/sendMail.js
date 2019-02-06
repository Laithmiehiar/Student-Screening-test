var nodemailer = require('nodemailer');


const sendMail = function sendM(to, subject , email ){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'festusiipito@gmail.com',
          port:465,
          pass: `${process.env.EM_PASS}`
        }
      });
      
      var mailOptions = {
        from: 'festusiipito@gmail.com',
        to:to,
        subject: subject,
        html: email
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });


}

module.exports = sendMail;


