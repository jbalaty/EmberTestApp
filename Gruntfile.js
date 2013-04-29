module.exports = function (grunt) {

    // external libs
    var fs = require('fs');

    // Project configuration.
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    hostname:'*',
                    port: 1981,
                    base: './app/public/',
                    keepalive: true
                }
            }
        }
    });
    // Default task.
    grunt.registerTask('default', '');
    grunt.loadNpmTasks('grunt-contrib-connect');
};