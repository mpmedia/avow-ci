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
    },

    // R.js
    requirejs: {
      main: {
        options: {
          name: "main",
          baseUrl: "public/src/js/",
          mainConfigFile: "public/src/js/main.js",
          out: "public/dist/js/main.js",
          optimize: "uglify",
          logLevel: 0
        }
      }
    },

    copy: {
      main: {
        files: [
          // CSS
          {
            expand: true,
            cwd: "public/src/styles/",
            src: ["**", "!public/src/styles/sass/**/*"],
            dest: "public/dist/styles"
          },
          // Assets
          {
            expand: true,
            cwd: "public/src/assets",
            src: ["**"],
            dest: "public/dist/assets"
          },
          // JS
          {
            expand: true,
            cwd: "public/src/js",
            src: ["**"],
            dest: "public/dist/js"
          },
          // Individual files
          {
            expand: true,
            cwd: "public/src/",
            src: ["index.html"],
            dest: "public/dist"
          }
        ]
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks("grunt-contrib-requirejs");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-bower-task");

  grunt.registerTask('default', ['bower', 'jsbeautifier', 'jshint', 'copy', 'requirejs']);

};
