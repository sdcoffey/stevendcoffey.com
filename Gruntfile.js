module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      options: {
        mangle: true
      },
      target: {
        files: {
          'build/prod/js/terminal.min.js': ['build/prod/intermediate/terminal.js', 'js/typed.js']
        }
      },
    },
    preprocess: {
      prod: {
        options: {
          context: {
            NODE_ENV: 'prod'
          }
        },
        files: {
          'build/prod/index.html': 'index.html',
          'build/prod/intermediate/terminal.js': 'js/terminal.js'
        }
      },
      dev: {
        options: {
          context: {
            NODE_ENV: 'dev'
          }
        },
        files: {
          'build/dev/index.html': 'index.html',
          'build/dev/js/terminal.js': 'js/terminal.js'
        }
      }
    },
    copy: {
      prod: {
        files: [{
          expand: true,
          src: ['js/jquery.js'],
          dest: 'build/prod'
        }]
      },
      dev: {
        files: [{
          expand: true,
          src: ['js/jquery.js', 'js/typed.js'],
          dest: 'build/dev'
        }]
      },
    },
    sass: {
      options: {
        sourceMap: false,
      },
      prod: {
        files: {
          'build/prod/style/style.css': 'style/style.scss'
        }
      },
      dev: {
        files: {
          'build/dev/style/style.css': 'style/style.scss'
        }
      }
    }
  });

  var ENV = grunt.option('env') || 'dev';
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.registerTask('dev', ['preprocess:dev', 'sass:dev', 'copy:dev']);
  grunt.registerTask('prod', ['preprocess:prod', 'sass:prod', 'copy:prod', 'uglify']);
  grunt.registerTask('default', ['dev']);
}
