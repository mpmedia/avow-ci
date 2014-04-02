module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({

    // Get package JSON
    pkg: grunt.file.readJSON('package.json'),

    // Ensure that dependencies are up-to-date
    bower: {
      install: {
        options: {
          install: true,
          copy: false
        }
      }
    },

    // JSBeautify
    jsbeautifier: {
      dev: {
        src: [
          "public/src/js/**/*.js",
          "!public/src/js/vendor/**/*.js"
        ],
        options: {
          config: ".jsbeautifyrc"
        }
      }
    },

    // JSHint
    jshint: {
      dozer: {
        options: {
          jshintrc: '.jshintrc',
          jshintignore: '.jshintignore'
        },
        files: {
          src: ['index.js', 'lib/**/*.js', 'public/src/js']
        }
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks("grunt-bower-task");

  grunt.registerTask('default', ['bower', 'jsbeautifier', 'jshint']);

};
