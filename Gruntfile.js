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
          src: ['style/**', "js/jquery.js"],
          dest: 'build/'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.registerTask('default', ['preprocess', 'copy', 'uglify']);
}
