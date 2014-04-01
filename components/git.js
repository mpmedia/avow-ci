var git = require('gift');
var fsx = require('fs-extra');

var gitRunner = {

  // Fetches branches for repo
  branches: function (repo, cb) {
    var temp = __dirname + '/../temp/'+(+new Date());
    git.clone(repo, temp, function (err, repo) {
      if (err) {
        cb(err);
      } else {
        repo.remotes(function (err, heads) {
          if (err) {
            cb(err, false);
          } else {
            cb(false, heads);
          }
          // Cleanup
          fsx.remove(temp);
        });
      }
    });
  },

  // Clone a repo
  clone: function (repo, id, branch, cb) {

    id = id || +new Date();

    var temp = __dirname + '/../temp/'+id;
    var output = {};
    var commit;
    var checkout;

    // Run against master by default
    branch = branch || 'master';

    // Clone repo
    git.clone(repo, temp, function (err, repo) {
      if (err) {
        cb(err, false);
      } else {
        // Checkout specific branch
        checkout(repo);
      }
    });

    // Checkout branch
    checkout = function (repo) {
      repo.checkout(branch, function (err) {
        if (err) {
          cb(err, false);
          // Cleanup
          fsx.remove(temp);
        } else {
          // Get latest commit
          commit(repo);
        }
      });
    };

    // Get latest commit
    commit = function (repo) {
      repo.commits(branch, 1, function (err, commits) {
        if (err) {
          cb(err, false);
          // Cleanup
          fsx.remove(temp);
        } else {
          output.dir = temp;
          output.commits = commits[0];
          cb(false, output);
        }
      });
    };

  }

};

module.exports = gitRunner;