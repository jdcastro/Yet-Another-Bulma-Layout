module.exports = function(grunt) {

  grunt.initConfig({
    concat: {
      options: {
        separator: '\n'
      },
      dist: {
        src: ['src/parts/head.html', 'src/parts/header.html', 'src/parts/main.html', 'src/parts/footer.html'],
        dest: 'src/index.html'
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/index.html': 'src/index.html'
        }
      }
    },
    sass: {
      options: {
        implementation: require('sass'),
        sourceMap: true
      },
      dist: {
        files: {
          'dist/css/style.css': 'src/bulma.sass'
        }
      }
    }, 
    cssmin: {
      options: {
        sourceMap: false, // Genera un mapa de los archivos CSS
        processImport: false, // Procesa los @import
        keepSpecialComments: 0, // Elimina los comentarios
        restructuring: true, // Optimiza el CSS
      },
      target: {
        files: {
          'dist/css/style.min.css': ['dist/css/style.css']
        }
      }
    },
    jsconcat: {
      options: {
        separator: '\n'
      },
      dist: {
        src: ['src/js/*.js'],
        dest: 'dist/js/script.js'
      }
    },
    watch: {
      scripts: {
        files: ['src/parts/*.html', 'src/bulma.sass', 'src/js/*.js'],
        tasks: ['concat', 'sass', 'cssmin', 'htmlmin'],
        options: {
          spawn: false,
        },
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['concat', 'sass', 'cssmin', 'htmlmin']);
};
