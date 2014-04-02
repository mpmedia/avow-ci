module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({

    // Get package JSON
    pkg: grunt.file.readJSON('package.json'),

    // JSBeautify
    jsbeautifier: {
      dev: {
        src: [
          'public/src/js/**/*.js',
          '!public/src/js/vendor/**/*.js'
        ],
        options: {
          config: '.jsbeautifyrc'
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

    // Compass
    compass: {
      main: {
        options: {
          sassDir: 'public/css/sass',
          cssDir: 'public/css',
          outputStyle: 'compressed',
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-compass');

  grunt.registerTask('default', ['jsbeautifier', 'jshint']);

};
