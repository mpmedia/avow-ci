// Outputs content to terminal
var clc = require('cli-color');
var stdout = function (type, message) {
  switch (type) {
  case 'title':
    console.log(clc.blueBright('\n' + message));
    console.log('---------------------------------');
    break;
  case 'output':
    console.log(clc.greenBright('>> ' + message));
    break;
  case 'error':
    console.log(clc.redBright('!! ' + message));
    break;
  }
};

module.exports = stdout;
