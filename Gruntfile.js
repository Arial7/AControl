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
        autoprefixer: {
            dist: {
                files: {
                    'client/css/style.css' : 'client/css/style.css'
                }
            }
        },
        watch: {
            css: {
                files: 'client/css/*.sass',
                tasks: ['sass', 'autoprefixer']
            }
        }
    });
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default',['watch']);
    grunt.registerTask('build', ['sass', 'autoprefixer']);
}
