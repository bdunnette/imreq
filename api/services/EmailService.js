// EmailService.js - in api/services
var nodemailer = require('nodemailer');

exports.sendNotificationEmail = function (options) {
  var transport = nodemailer.createTransport("SMTP", {
    service: "GMail",
    auth: {
      user: sails.config.gmail.user, 
      pass: sails.config.gmail.pass 
    }
  });

  var opts = {
    "subject": "test!",
    "from": "dunn0172@umn.edu",
    "to": options.email,
    "text": "Requested images for U14-XYZ are ready!"
  }
  
  transport.sendMail(opts, function (err, response) {
    if(err){
      console.log(err);
    } else {
      console.log(response);
    }
  });
};