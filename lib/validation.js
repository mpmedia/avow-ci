// Validation function for checking data against models.
// This is loaded into the controller during initialization as a new
// object with the model already set.

var config = require('../config.js');

var validation = function (data, cb) {

  // Passed in through binding to data source
  var model = this.model;

  var failures = [];
  var regEx = config.regEx;
  var validJSON;
  var processNode;
  var result;
  var traverseNodes;

  // Tests for valid JSON
  validJSON = function (value) {
    try {
      JSON.parse(value);
    } catch (e) {
      return false;
    }
    return true;
  };

  // Tests, or calls test, on node
  processNode = function (value, valid) {
    switch (valid) {
    case 'string':
      result = (typeof value === 'string') ? true : false;
      break;
    case 'number':
      result = (typeof value === 'number') ? true : false;
      break;
    case 'boolean':
      result = (typeof value === 'boolean' || value === 'true' || value === 'false') ? true : false;
      break;
    case 'array':
      result = (Object.prototype.toString.call(value) === '[object Array]') ? true : false;
      break;
    case 'json':
      result = validJSON(value);
      break;
    default:
      result = (regEx.hasOwnProperty(valid)) ? config.regEx[valid].test(value) : false;
    }
    return result;
  };

  // Recursively traverses nodes in the data and model objects
  traverseNodes = function (obj, model, fn) {
    for (var i in obj) {
      if (model.hasOwnProperty(i)) {
        // If node is an object resulre
        if (obj[i] !== null && typeof (obj[i]) === 'object' && Object.prototype.toString.call(obj[i]) !== '[object Array]') {
          traverseNodes(obj[i], model[i], fn);
        } else {
          // Process node
          if (!fn(obj[i], model[i])) {
            // On failure, result gets added to array of failures
            failures.push(i);
          }
        }
      } else {
        // Node does not exist in model
        failures.push(i);
      }
    }
  };

  // Call function to traverse
  traverseNodes(data, model, processNode);

  // Check for failures, fire callback
  if (failures.length) {
    cb(true, failures);
  } else {
    cb(null);
  }

};

module.exports = validation;
