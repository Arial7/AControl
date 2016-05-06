module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('grunt-task-loader')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coffee: {
            compile: {
                options: {
                    join: true
                },
                files: {
                    'client/js/main.js' : [
                        'client/src/coffee/ui-elements.coffee',
                        'client/src/coffee/dialogs.coffee',
                        'client/src/coffee/main.coffee'
                    ],
                    'server/server.js'     : 'server/src/server.coffee',
                    'server/log.js'        : 'server/src/log.coffee',
                    'server/planloader.js' : 'server/src/planloader.coffee',
                    'server/serialmanager.js': 'server/src/serialmanager.coffee'
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
                files: ['client/src/coffee/*.coffee', 'server/src/*.coffee'],
                tasks: ['newer:coffee']
            }
        }
    });
    grunt.registerTask('default',['watch']);
    grunt.registerTask('build', ['sass', 'autoprefixer', 'coffee']);
}
