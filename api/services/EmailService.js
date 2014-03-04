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
    "subject": "Images for " + options.specimenID,
    "from": sails.config.gmail.user,
    "to": options.email,
    "text": "Requested " + options.modality + " images for specimen #" + options.specimenID + " are ready.\n\n" + options.link
  }
  
  transport.sendMail(opts, function (err, response) {
    if(err){
      console.log(err);
    } else {
      console.log(response);
    }
  });
};