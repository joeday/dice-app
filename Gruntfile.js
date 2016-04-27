module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            options: {
                force: true
            },
            all: ['dist/']
        },

        fileExists: {
            css: ['dist/css/main.css']
        },

        sass: {
            options: {
                outputStyle: 'nested',
                sourceMap: true,
                precision: 5,
                includePaths: [
                    "node_modules"
                ]
            },
            dist: {
                files: {
                    'dist/css/main.css': 'src/scss/main.scss'
                }
            }
        },

        // Copy doc files
        copy: {
            assets: {
                files: [{
                    expand: true,
                    cwd: 'src/fonts/',
                    src: '**',
                    dest: 'dist/fonts/'
                }, {
                    expand: true,
                    cwd: 'src/images/',
                    src: '*',
                    dest: 'dist/images/'
                }, {
                    expand: true,
                    cwd: 'src/doc/data/',
                    src: '*',
                    dest: 'dist/data/'
                }]
            },
            doc: {
                files: [{
                    expand: true,
                    cwd: 'src/js/',
                    src: '*.js',
                    dest: 'dist/js/'
                }, {
                    expand: true,
                    cwd: 'node_modules/jquery/dist',
                    src: 'jquery.min.js',
                    dest: 'dist/js' 
                }]
            }
        },

        // Build the main HTML file
        assemble: {
            options: {
                partials: ['src/doc/partials/**/*.hbs'],
                layout: ['src/doc/layouts/pages.hbs'],
                flatten: true,
                data: 'src/doc/data/*.json',

                // Set the version number
                version: '<%= pkg.version %>',

                // Name of the project
                name: '<%= pkg.name %>',
            },
            home: {
                src: ['src/doc/*.hbs'],
                dest: './dist/',
                options: {layout: 'src/doc/layouts/default.hbs'}
            }
        },

        watch: {
            sass: {
                files: 'src/scss/**/*.scss',
                tasks: ['sass']
            },
            doc: {
                files: ['src/doc/**/*', 'src/js/*.js'],
                tasks: ['jshint', 'assemble', 'copy:doc', 'modernizr']
            },
            configFiles: {
                files: ['gruntfile.js'],
                options: {
                    reload: true
                }
            },
            options: {
                livereload: true,
                tasks: ['notify:assemble']
            }
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: ['./', './dist/'],
                    hostname: 'localhost',
                    livereload: true,
                    open: true
                }
            }
        },

        bump: {
            options: {
                files: ['package.json'],
                commit: true,
                commitMessage: 'Release version %VERSION%',
                commitFiles: ['package.json'],
                updateConfigs: ['pkg'],
                createTag: true,
                tagName: '%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'upstream',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                regExp: false
            }
        },
        notify: {
            server: {
                options: {
                    title: '<%= pkg.name %>',
                    message: 'Server started'
                },
            },
            watch: {
                options: {
                    title: '<%= pkg.name %>',
                    message: 'assemble completed', //required
                }
            }
        },
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: ['gruntfile.js', 'src/js/**/*']
        },
        modernizr: {
            dist: {
                "crawl": false,
                "customTests": [],
                "dest": "dist/js/modernizr-output.js",
                "tests": [
                    "objectfit"
                ],
                "options": [
                    "setClasses"
                ],
                "uglify": true
            }
        }
    });

    grunt.loadNpmTasks('grunt-assemble');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-file-exists');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-modernizr');

    grunt.registerTask('default', ['clean', 'sass', 'assemble', 'copy', 'fileExists', 'jshint', 'modernizr']);
    grunt.registerTask('server', ['connect', 'notify:server', 'watch']);
    grunt.registerTask('restart', ['default', 'server']);

};
