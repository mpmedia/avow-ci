// Handles loading of modules and provides object accessible throughout
// the application containing the modules loaded on startup

var fs = require('fs');
var stdout = require('./stdout');

var modules = {

  // Initializes the modules by loading them into the object
  load: function (type) {
    var self = this;
    var title = type.toUpperCase();
    var titleSingular = title;
    var dir = (type === 'lib') ? './' : '../' + type + '/';
    var scan = (type === 'lib') ? __dirname : type;

    // Set title singular for stdout
    if (title.substr(title.length - 1) === 'S') {
      titleSingular = title.substr(0, title.length - 1);
    }

    // Ensure an onject exists
    if (!self.hasOwnProperty(type)) {
      self[type] = {};
    }

    // Print out message
    stdout('title', 'LOADING ' + title);

    // Loop through files
    fs.readdirSync(scan).forEach(function (file) {
      // Don't include this file as it would be kinda redundant
      if (file !== 'modules.js') {
        // Make sure it's a javascript file
        if (file.split('.').pop() === 'js') {
          // Assign the property back to self with type and name (sans .js)
          self[type][file.replace('.js', '')] = require(dir + file);
          stdout('output', titleSingular + ' Loaded: ' + file);
        }
      }
    });
  }
};

module.exports = modules;
