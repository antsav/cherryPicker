module.exports = function(grunt) {

    // configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        bower: {
            install: {
                options: {
                    copy: false,
                    targetDir: 'public/bower_components',
                    verbose: true
                }
            }
        },
        symlink: {
            options: {
                overwrite: true
            },
            explicit: {
                src: 'bower_components/jquery/dist/jquery.js',
                dest: 'public/js/lib/jquery.js'
            }
        }
    });

    // npm tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-symlink');

    // grunt tasks
    grunt.registerTask('front', ['bower', 'symlink']);

};