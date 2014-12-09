/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    app : {
      paths : {
        vendor : "assets/libs/",
        css    : "assets/css/",
        js     : "assets/js/",
        sass   : "sass/",
        bower  : "bower_components/"
      }
    },
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> - <%= pkg.author.ref %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    copy : {
      angular_map: {
        src: '<%= app.paths.bower %>angular/angular.min.js.map',
        dest: '<%= app.paths.vendor %>angular.min.js.map'
      }
    },
    concat: {
      angular: {
        src: [
          '<%= app.paths.bower %>angular/angular.min.js'
        ],
        dest: '<%= app.paths.vendor %>angular.js'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'inline'
        },
        files: {
          '<%= app.paths.css %>main.css': '<%= app.paths.sass %>main.scss'
        }
      }
    },
    watch: {
      sass: {
        files: ['sass/**.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task.
  grunt.registerTask('default', ['sass', 'concat', 'copy', 'watch']);

};
