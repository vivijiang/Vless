/* jshint node: true */

module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
  }
  var btoa = require('btoa')
  // Project configuration.
  grunt.initConfig({
      // Metadata.
      pkg: grunt.file.readJSON('package.json'),
      banner: '/*!\n' +
                ' * Vless v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
                ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' */\n\n',
      //jqueryCheck: 'if (typeof jQuery === "undefined") { throw new Error("Vless requires jQuery") }\n\n',

    // Task configuration.
    clean: {
      dist: ['dist']
    },

    less: {
        compile: {
            options: {
                strictMath: true
            },
            files: {
                'dist/css/<%= pkg.name %>.css': 'less/*.less'
            }
        }
    },
      minify: {
        options: {
          cleancss: true,
          report: 'min'
        },
        files: {
          'dist/css/<%= pkg.name %>.min.css': 'dist/css/<%= pkg.name %>.css',
        }
      },

      usebanner: {
          dist: {
              options: {
                  position: 'top',
                  banner: '<%= banner %>'
              },
              files: {
                  src: [
                    'dist/css/<%= pkg.name %>.css',
                    'dist/css/<%= pkg.name %>.min.css'
                  ]
              }
          }
      },

      csscomb: {
          sort: {
              options: {
                  sortOrder: '.csscomb.json'
              },
              files: {
                  'dist/css/<%= pkg.name %>.css': ['dist/css/<%= pkg.name %>.css']
              }
          }
      },
   
  });


  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

  // Docs HTML validation task
 // grunt.registerTask('validate-html', ['jekyll', 'validation']);

  //grunt.registerTask('test', testSubtasks);

  //// JS distribution task.
  //grunt.registerTask('dist-js', ['concat', 'uglify']);

  // CSS distribution task.
  grunt.registerTask('dist-css', ['less', 'csscomb', 'usebanner']);

  // Fonts distribution task.
  //grunt.registerTask('dist-fonts', ['copy']);

  // Full distribution task.
  grunt.registerTask('dist', ['clean', 'dist-css']);

  // Default task.
  grunt.registerTask('default', ['dist']);

  // Version numbering task.
  // grunt change-version-number --oldver=A.B.C --newver=X.Y.Z
  // This can be overzealous, so its changes should always be manually reviewed!
  grunt.registerTask('change-version-number', ['sed']);

  // task for building customizer
  //grunt.registerTask('build-customizer', 'Add scripts/less files to customizer.', function () {
  //  var fs = require('fs')

  //  function getFiles(type) {
  //    var files = {}
  //    fs.readdirSync(type)
  //      .filter(function (path) {
  //        return type == 'fonts' ? true : new RegExp('\\.' + type + '$').test(path)
  //      })
  //      .forEach(function (path) {
  //        var fullPath = type + '/' + path
  //        return files[path] = (type == 'fonts' ? btoa(fs.readFileSync(fullPath)) : fs.readFileSync(fullPath, 'utf8'))
  //      })
  //    return 'var __' + type + ' = ' + JSON.stringify(files) + '\n'
  //  }

  //  var files = getFiles('js') + getFiles('less') + getFiles('fonts')
  //  fs.writeFileSync('docs-assets/js/raw-files.js', files)
  //});
};
