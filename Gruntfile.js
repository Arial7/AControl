module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('grunt-task-loader')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        coffeelint: {
            options: {
                configFile: 'coffeelint.json'
            },
            client: [ 'src/client/**/*.coffee' ],
            server: [ 'src/server/**/*.coffee' ]
        },
        coffee: {
            client: {
                options: {
                    join: true
                },
                files: {
                    'bin/client/js/main.js' : [
                        'src/client/coffee/ui-elements.coffee',
                        'src/client/coffee/dialogs.coffee',
                        'src/client/coffee/main.coffee'
                    ]
                }
            },
            server: {
                options: {
                    join: false                
                },
                files: {
                    'bin/server.js'     : 'src/server/server.coffee',
                    'bin/planloader.js' : 'src/server/planloader.coffee',
                    'bin/serialmanager.js': 'src/server/serialmanager.coffee'
                }
            }
        },
        sass: {
            debug: {
                files: {
                    'bin/client/css/style.css' : 'src/client/sass/style.sass'
                }
            }
        },
        autoprefixer: {
            dist: {
                files: {
                    'bin/client/css/style.css' : 'bin/client/css/style.css'
                }
            }
        },
        watch: {
            css: {
                files: 'src/client/sass/*.sass',
                tasks: ['sass', 'autoprefixer']
            },
            coffee: {
                files: ['src/client/coffee/*.coffee', 'src/server/*.coffee'],
                tasks: ['newer:coffee']
            }
        }
    });
    grunt.registerTask('default',['watch']);
    grunt.registerTask('build', ['sass', 'autoprefixer', 'coffeelint', 'coffee']);
    grunt.registerTask('server', ['coffeelint:server', 'coffee:server']);
    grunt.registerTask('client', ['sass', 'autoprefixer', 'coffeelint:client',
        'coffee:client']);
}
