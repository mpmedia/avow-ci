var mongoskin = require('mongoskin');
var fs = require('fs');
var clc = require('cli-color');
var passwordHash = require('password-hash');

// Get variables
var email = process.argv[2];
var password = process.argv[3];

// Ensure db_conf
if (fs.existsSync('./db_conf.json')) {
  var dbConf = JSON.parse(fs.readFileSync('./db_conf.json'));
} else {
  console.log(clc.redBright('CONFIG ERROR'));
  console.log(' >> No db_conf.json file.');
  process.exit(1);
}

// Connection
var table = 'users';
var store = mongoskin.db(dbConf.config.host, {
  username: dbConf.config.user,
  password: dbConf.config.pass,
  database: dbConf.config.database,
  safe: false
});

// Insert user
store.collection(table).find({ email: email }).limit(1).toArray(function (err, data) {
  if (err) {
    console.log(clc.redBright('CONFIG ERROR'));
    console.log(' >> Could not connect to database.');
    process.exit(1);
  } else {
    // Check that email doesn't already exist
    if (data.length === 0) {
      // Validate email and password
      if (/\S+@\S+\.\S+/.test(email) && password.length >= 6) {
        store.collection(table).insert({ email: email, password: passwordHash.generate(password) }, function (err, data) {
          if (err) {
            console.log(clc.redBright('CREATE ERROR'));
            console.log(' >> Could not create user account.');
            process.exit(1);
          } else {
            console.log(clc.greenBright('USER CREATED'));
            process.exit(0);
          }
        });
      } else {
        console.log(clc.redBright('CONFIG ERROR'));
        console.log(' >> Email must be valid and password must be at least 6 characters.');
        process.exit(1);
      }
    } else {
      console.log(clc.redBright('CONFIG ERROR'));
      console.log(' >> Email address already in use.');
      process.exit(1);
    }
  }
});