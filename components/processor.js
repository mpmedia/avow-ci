var readline = require('readline');
var spawn = require('child_process').spawn;
var ansi_up = require('ansi_up');
var fsx = require('fs-extra');
var fs = require('fs');

// Spawns and runs processes and logs output
var processor = function (task, id, callback) {
  // Get arguments, split command, setup vars
  var args = task.split(' ');
  var command = args[0];
  var cwd = __dirname + '/../temp/'+id;
  var stdout;
  var stderr;
  var proc;

  // Pushes output to log
  var trace = function (id, data) {
    fs.appendFileSync(__dirname + '/../logs/'+id+'.log', data + '\n');
  };

  // Create log
  fsx.createFileSync(__dirname + '/../logs/'+id+'.log');

  // Set arguments by shifting array
  args.shift();

  // Check command to apply appropriate color flags
  switch (command) {
  case 'npm':
    proc = spawn(command, [args, '--color', 'always'], { cwd: cwd });
    break;
  case 'grunt':
    if (args.length) {
      proc = spawn(command, [args, '--color'], { cwd: cwd });
    } else {
      proc = spawn(command, ['--color'], { cwd: cwd });
    }
    break;
  default:
    if (args.length) {
      proc = spawn(command, [args], { cwd: cwd });
    } else {
      proc = spawn(command, [], { cwd: cwd });
    }
  }

  // Set readLine listeners
  stdout = readline.createInterface({
    input: proc.stdout,
    terminal: false
  });
  stderr = readline.createInterface({
    input: proc.stderr,
    terminal: false
  });

  // Listen for stdout
  stdout.on('line', function (line) {
    trace(id, ansi_up.ansi_to_html(line));
  });

  // Listen for stderr
  stderr.on('line', function (line) {
    trace(id, ansi_up.ansi_to_html(line));
  });

  // Check status on close
  proc.on('close', function (code) {
    if (code === 0) {
      // Success
      callback(null);
    } else {
      // Failure
      callback('Process failed with code [' + code + ']');
    }
  });
};

module.exports = processor;