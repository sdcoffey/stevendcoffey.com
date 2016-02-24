module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      options: {
        mangle: true
      },
      target: {
        files: {
          'build/js/terminal.min.js': ['build/intermediate/terminal.js', 'js/typed.js']
        }
      },
    },
    preprocess: {
      options: {
        context: {
          DEBUG: false
        }
      },
      multifile: {
        files: {
          'build/index.html': 'index.html',
          'build/intermediate/terminal.js': 'js/terminal.js'
        }
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          src: ['js/jquery.js'],
          dest: 'build/'
        }]
      }
    },
    sass: {
      options: {
        sourceMap: false,
      },
      dist: {
        files: {
          'build/style/style.css': 'style/style.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.registerTask('default', ['preprocess', 'sass', 'copy', 'uglify']);
}
