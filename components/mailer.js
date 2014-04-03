var nodemailer = require('nodemailer');
var mongoskin = require('mongoskin');
var fs = require('fs');
var config = require('../lib/config.js');
var failEmail = fs.readFileSync(__dirname + '/../templates/failure_email.html');
var mailConf = false;

// Connection
var db = config.get('db');
var table = 'users';
var store = mongoskin.db(db.config.host, {
  username: db.config.user,
  password: db.config.pass,
  database: db.config.database,
  safe: false
});

// Mailer constructor
var Mailer = function (data) {
  var self = this;
  // Mailer is configured?
  if (config.get().hasOwnProperty('mailer')) {
    // Set mailConf
    mailConf = config.get('mailer');
    // Get users
    store.collection(table).find().toArray(function (err, list) {
      if (!err) {
        var users = [];
        for (var i=0, z=list.length; i<z; i++) {
          users.push(list[i].email);
        }
        // Append server from mailConf to data
        data.server = mailConf.server;
        // Render
        var message = self.render(failEmail, data);
        // Send
        self.send(message, users, mailConf);
      }
    });
  }
};

// Renders the template
Mailer.prototype.render = function (template, data) {
	var templateRender = function (i, match) {
		return data[match];
	};

	return template.toString().replace(/\{\{([^}]+)\}\}/g, templateRender);
};

Mailer.prototype.send = function (message, users, mailConf) {
  // Delete server from mailConf
  delete mailConf.server;

  // Setup mailOptions
  var mailOptions = {
    from: 'Avow-CI <'+mailConf.auth.user+'>',
    to: users.join(','),
    subject: 'BUILD FAILURE :: Avow-CI',
    html: message
  };

  // Setup transport with app mailer configuration
  var transport = nodemailer.createTransport('SMTP', mailConf);

  // Send notifation email
  transport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log('Message sent: ' + response.message);
    }
    // Close transport
    transport.close();
  });
};

module.exports = Mailer;