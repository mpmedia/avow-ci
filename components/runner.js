var async = require('async');
var git = require('../lib/modules.js').components.git;
var fsx = require('fs-extra');

var runner = {

  // Kicks off build runner
  go: function (data) {
    // Get repo and branch from project data
    this.repo = data.project.repo;
    this.branch = data.project.branch;
    // Will store temp directory
    this.temp = null;
    // Will store config
    this.config = null;
    // Bet build id from new build
    this.build = data.build._id;
    // Set data-store for build
    this.buildData = data.buildDB;
    // Set sockets
    this.buildSocket = data.buildSocket;
    // Kickoff build
    this.run();
  },

  // Runs the processes
  run: function () {
    var self = this;
    async.series({

      // Clone into temporary
      clone: function (callback) {
        git.clone(self.repo, self.branch, function (err, data) {
          if (err) {
            callback(err);
          } else {
            // Set temp dir reference
            self.temp = data.dir;
            // Some cleanup
            delete data.commits.repo;
            delete data.commits.author;
            // Update build record with commit data
            self.updateBuildData({ commit: data.commits });
            callback(null);
          }
        });
      },

      // Get avow.json configuration
      config: function (callback) {
        fsx.readFile(self.temp+'/avow.json', 'utf8', function (err, data) {
          if (err) {
            callback(err);
          } else {
            self.updateBuildData({ config: JSON.parse(data) });
            self.config = JSON.parse(data);
            callback(null);
          }
        });
      }

    // Handle errors
    }, function (err) {
      var end = + new Date();
      if (err) {
        console.log(err);
        self.updateBuildData({ end: end, status: 1 });
      } else {
        // Log end of build
        self.updateBuildData({ end: + end, status: 0 });
      }
    });
  },

  // Updates build data record
  updateBuildData: function (data) {
    this.buildData.update({ '_id': this.build.toString() }, data, function (err, data) {
      if (err) {
        console.log(err);
      }
    });
  }

};

module.exports = runner;