module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('grunt-task-loader')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coffee: {
            compile: {
                files: {
                    'client/js/main.js'    : 'client/src/coffee/main.coffee',
                    'client/js/dialogs.js' : 'client/src/coffee/dialogs.coffee'
                }
            }
        },
        sass: {
            debug: {
                files: {
                    'client/css/style.css' : 'client/src/sass/style.sass'
                }
            }
        },
        autoprefixer: {
            dist: {
                files: {
                    'client/css/style.css' : 'client/css/style.css'
                }
            }
        },
        watch: {
            css: {
                files: 'client/src/sass/*.sass',
                tasks: ['sass', 'autoprefixer']
            },
            coffee: {
                files: 'client/src/coffee/*.coffee',
                tasks: ['coffee']
            }
        }
    });
    grunt.registerTask('default',['watch']);
    grunt.registerTask('build', ['sass', 'autoprefixer', 'coffee']);
}
