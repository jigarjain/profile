/*!
 * Grunt file
 */

/*jshint node:true */
module.exports = function ( grunt ) {
    grunt.loadNpmTasks( 'grunt-contrib-csslint' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-less' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );
    grunt.loadNpmTasks( 'grunt-jscs' );

    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),
        jshint: {
            options: {
                jshintrc: true
            },
            all: ['assets/js/**/*.js']
        },
        csslint: {
            options: {
                csslintrc: 'assets/.csslintrc'
            },
            all: 'assets/css/presentation.css'
        },
        less: {
            options: {
                compress: true
            },
            dist: {
                files: {
                    'assets/css/presentation.css': 'assets/css/presentation.less'
                }
            }
        },
        jscs: {
            all: ['assets/js/*.js', 'assets/js/**/*.js']
        },
        watch: {
            files: [
                '<%= jshint.all %>',
                'assets/css/**/*.less',
                '.{csslintrc,jscsrc,jshintrc,jshintignore}'
            ],
            tasks: ['test']
        }
    } );

    grunt.registerTask( 'build', [ 'less' ] );
    grunt.registerTask( 'test', [ 'build', 'jshint', 'csslint' ] );
    grunt.registerTask( 'default', 'test' );
};
