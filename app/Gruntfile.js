module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'client/css/style.css' : 'client/css/style.sass'
                }
            }
        },
        jade: {
            compile: {
                files: {
                    'client/pages/main.html': 'client/pages/main.jade'
                }
            }
        },
        watch: {
            css: {
                files: 'client/css/*.sass',
                tasks: ['sass']
            },
            jade : {
                files: 'client/pages/*.jade',
                tasks: ['jade']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.registerTask('default',['watch']);
    grunt.registerTask('build', ['sass', 'jade']);
}
