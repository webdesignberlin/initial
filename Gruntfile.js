module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options : {
                    precision : 10
                },
                files: [{
                    expand : true,
                    cwd : 'web/assets-dev/css/',
                    src : ['*.scss'],
                    dest : 'web/assets/css/',
                    ext : '.css'
                }]
            }
        },
		
        cssmin: {
            minify: {
                expand : true,
                cwd : 'web/assets-dev/css/',
                src : ['*.css'],
                dest : 'web/assets/css/',
                ext : '.min.css',
                options : {
                    report : 'min'
                }
            }/*,
			combine: {
				files: {
					'web/assets/js/vendor/jquery-mmenu/source/jquery.mmenu.combine.all.min.css': ['web/assets/js/vendor/jquery-mmenu/source/jquery.mmenu.css', 'web/assets/js/vendor/jquery-mmenu/source/addons/jquery.mmenu.dragopen.css', 'web/assets/js/vendor/jquery-mmenu/source/extensions/jquery.mmenu.positioning.css','web/assets/js/vendor/jquery-mmenu/source/extensions/jquery.mmenu.hardwareacceleration.css'],
					
					'web/assets/js/modules/owl-carousel/owl.combine.all.css':['web/assets-dev/js/modules/owl-carousel/owl.carousel.css','web/assets-dev/js/modules/owl-carousel/owl.theme.css']
				}
			}*/
        },
        uglify : {
            my_target: {
              files: [{
                  expand: true,
                  cwd: 'web/assets-dev/js',
                  src: '**/*.js',
                  dest: 'web/assets/js'
              }]
            }
        },
        watch : {
            scripts : {
                files : [
                    'web/assets-dev/css/*.scss',
					'web/assets-dev/css/*.css',
                    'web/assets-dev/js/*.js',
                    'web/assets-dev/js/modules/*.js'
                ],
                tasks : ['sass', 'cssmin', 'uglify']
            }
        },
        browser_sync: {
            files: {
                src : [
                    'web/assets/css/*.css',
                    'web/assets/js/*.js',
                    'web/assets/js/modules/*.js',
                    'web/assets/img/*',

                ],
            },
            options: {
                watchTask : true,
                /*host: 'initial.domain.com', // Grunt tells you the port
                server: {
                    baseDir: "web"
                },*/
				proxy: {
                    host: "web"
                },
                ghostMode: {
                    scroll: true,
                    links: true,
                    forms: true
                }
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');

    // Tasks
    grunt.registerTask('default', ['sass', 'cssmin', 'uglify']);
    grunt.registerTask('sync', ['browser_sync', 'watch']);
};
