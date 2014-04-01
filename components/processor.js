var readline = require("readline");
var spawn = require("child_process").spawn;
var ansi_up = require("ansi_up");

// Spawns and runs processes and logs output
var Processor = function (process) {
  // Get arguments, split command, setup vars
  var args = process.split(" "),
    command = args[0],
    stdout,
    stderr,
    proc;

  // Set arguments by shifting array
  args.shift();

  // Check command to apply appropriate color flags
  switch (command) {
  case "npm":
    proc = spawn(command, [args, "--color", "always"], {
      cwd: config.app.temp + build.state.cwd
    });
    break;
  case "grunt":
    if (args.length) {
      proc = spawn(command, [args, "--color"], {
        cwd: config.app.temp + build.state.cwd
      });
    } else {
      proc = spawn(command, ["--color"], {
        cwd: config.app.temp + build.state.cwd
      });
    }
    break;
  default:
    if (args.length) {
      proc = spawn(command, [args], {
        cwd: config.app.temp + build.state.cwd
      });
    } else {
      proc = spawn(command, [], {
        cwd: config.app.temp + build.state.cwd
      });
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
  stdout.on("line", function (line) {
    trace(build, ansi_up.ansi_to_html(line));
  });

  // Listen for stderr
  stderr.on("line", function (line) {
    trace(build, ansi_up.ansi_to_html(line));
  });

  // Check status on close
  proc.on("close", function (code) {
    if (code === 0) {
      // Success
      callback(null);
    } else {
      // Failure
      callback("Process failed with code [" + code + "]");
    }
  });
};

return Processor;