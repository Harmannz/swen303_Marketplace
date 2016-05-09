module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-html2js');

    var config = {

        app_files: {
            tpl: ['src/**/*.html'],
            js: ['src/**/*.js']
        },

        vendor_files: {
            js: [
                'node_modules/angular/angular.js',
                'node_modules/angular-ui-router/release/angular-ui-router.js',
                'node_modules/jquery/dist/jquery.js',
                'node_modules/bootstrap/js/dropdown.js'
            ]
        }

    };

    grunt.initConfig({

        clean: {
            build: ['build']
        },

        less: {
            build: {
                files: {
                    "build/assets/main.css": "src/main.less"
                }
            }
        },

        html2js: {
            app: {
                options: {
                    base: 'src/'
                },
                src: [ config.app_files.tpl ],
                dest: 'build/assets/template-app.js'
            }
        },

        copy: {
            build: {
                src: [
                    config.app_files.js,
                    config.vendor_files.js
                ],
                dest: 'build/'
            },
            build_assets: {
                src: ['**'],
                dest: 'build/assets',
                cwd: 'src/assets',
                expand: true
            }
        },

        index: {
            build: {
                src: [
                    config.vendor_files.js,
                    config.app_files.js,
                    'build/assets/template-app.js',
                    'build/assets/main.css'
                ]
            }
        }

    });

    function findJsFiles(files) {
        return files.filter(function(file) {
            return file.match(/\.js$/);
        });
    }

    function findCssFiles(files) {
        return files.filter(function(file) {
            return file.match(/\.css$/);
        });
    }

    grunt.registerMultiTask('index', function() {
        var dirRE = new RegExp('^build/');
        var jsFiles = findJsFiles(this.filesSrc).map(function(file) {
            return file.replace(dirRE,'');
        });
        var cssFiles = findCssFiles(this.filesSrc).map(function(file) {
            return file.replace(dirRE, '');
        });

        grunt.file.copy('src/index.html', 'build/index.html', {
            process: function(contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles
                    }
                });
            }
        });
    });

    grunt.registerTask('build', ['clean:build', 'less:build', 'html2js', 'copy:build', 'copy:build_assets', 'index']);

};