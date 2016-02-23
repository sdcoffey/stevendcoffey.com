module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      options: {
        mangle: true
      },
      target: {
        files: {
          'build/js/terminal.min.js': ['js/terminal.js', 'js/typed.js']
        }
      },
    },
    processhtml: {
      target : {
        files: {
          'build/index.html': ['index.html']
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
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.registerTask('default', ['uglify', 'processhtml', 'copy']);
}
