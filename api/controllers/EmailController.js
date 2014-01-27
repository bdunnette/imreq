/**
 * EmailController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var nodemailer = require('nodemailer');
module.exports = {

    send: function(req, res){
      console.log(sails.config.gmail);
      var params = req.params.all();
      console.log(params);
      
      if(!params.subject){
        res.send(500);
      }

      if(!params.message){
        res.send(500);
      }

      var transport = nodemailer.createTransport("SMTP", {
        service: "GMail",
        auth: {
            user: sails.config.gmail.user, 
            pass: sails.config.gmail.pass 
        }
      });

      var mailOptions = {
        from: params.from || 'nobody@umn.edu',
        to: params.to, 
        subject: params.subject,
        text: params.message       
      }

      transport.sendMail(mailOptions, function(err, response){
        if(err){
          res.send(500, "Error Sending " + err);
        }else{
          res.send(200, response);
        }
      });
    }
  };