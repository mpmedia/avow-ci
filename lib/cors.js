// Define CORS policy middleware
var config = require('./config.js');
var cors = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', config.get('cors.origin'));
  res.header('Access-Control-Allow-Methods', config.get('cors.methods'));
  res.header('Access-Control-Allow-Headers', config.get('cors.headers'));
  next();
};

module.exports = cors;