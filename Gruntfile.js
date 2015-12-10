/*global module:false*/
module.exports = function(grunt) {
  require('time-grunt')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            '* <%= pkg.friendly_name %>\n' +
            '* v<%= pkg.version %>\n' +
            '* Last updated <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '* License: <%= pkg.license %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n": "" %>*/',

    // Sass
    sass: {
      dist: {
        options: {
          require: [
            'bourbon',
            'neat',
            'sass-globbing'
          ],
          banner: '<%= banner %>'
        },
        files: [{
          expand: true,
          flatten: true,
          cwd: 'assets/scss',
          src: ['**/*.scss', '!**/_*.scss'],
          dest: 'assets/css/',
          ext: '.css'
        }]
      }
    },

    // Coffeescript
    coffee: {
      dist: {
        files: [ {
          expand: true,
          flatten: true,
          cwd: 'assets/coffee',
          src: ['**/*.coffee'],
          dest: 'assets/javascript',
          ext: '.js'
        } ]
      }
    },

    // Image minification
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
        },
        files: [ {
          expand: true,
          flatten: true,
          cwd: 'assets/images/src',
          src: ['*.png', '*.jpg', '*.gif'],
          dest: 'assets/images'
        }]
      }
    },

    // SVG Minification
    svgmin: {
      dist: {
        options: {
          plugins: [
            { removeViewBox: false },
            { removeUselessStrokeAndFill: false },
            { removeEmptyAttrs: false }
          ]
        },
        files: [{
          expand: true,
          cwd: 'assets/images/svg',
          src: ['**/*.svg'],
          dest: 'assets/images'
        }]
      }
    },

    // Script concatenation
    concat: {
      dist: {
        options: {
          separator: ';'
        },
        files: {
          'assets/javascript/app.js': [
            '!assets/javascript/vendor/**/*.js',
            'assets/javascript/app.js'
          ]
        }
      }
    },

    // Script uglification
    uglify: {
      dist: {
        files: {
          'assets/javascript/app.min.js': [
            'assets/javascript/app.js'
          ]
        }
      }
    },

    // CSS minification
    cssmin: {
      dist: {
        files: {
          'assets/css/styles.min.css': [
            'assets/css/styles.css'
          ]
        },
        options: {
          banner: '<%= banner %>'
        }
      }
    },

    // Combine media queries
    combine_mq: {
      dist: {
        options: {
          expand: true,
          cwd: 'src',
          beautify: true,
          src: 'assets/css/styles.css',
          dest: 'assets/css/styles.css',
        }
      }
    },

    // Bump the version
    bump: {
      dist: {
        options: {
          commit: true,
          push: true,
          pushTo: 'origin',
          commitMessage: 'Version %VERSION%',
          commitFiles: [ '-a' ],
          createTag: true,
          tagName: 'v%VERSION%',
          tagMessage: 'Version %VERSION%',
          prereleaseName: 'beta',
          globalReplace: false
        },
        files: [ 'package.json' ]
      }
    },

    // Watch
    watch: {
      dist: {
        files: [
          'assets/scss/**/*.scss',
          'assets/coffee/**/*.coffee',
          'assets/images/**/*.png',
          'assets/images/**/*.jpg',
          'patterns/**/*.mustache',
          'patterns/**/*.json'
        ],
        tasks: [
          'sass',
          'coffee',
          'concat'
        ],
        options: {
          livereload: true
        }
      }
    }

  });

  // Plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-combine-mq');
  grunt.loadNpmTasks('grunt-bump');

  // Default
  grunt.registerTask('default', ['sass','coffee','concat','combine_mq']);

  // Images and SVGs
  grunt.registerTask('assets', ['imagemin','svgmin']);

  // Build
  grunt.registerTask('build', ['default','uglify','cssmin']);

  // Release
  grunt.registerTask('release', ['bump','build']);
};
