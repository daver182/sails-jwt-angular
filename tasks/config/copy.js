/**
 * Copy files and folders.
 *
 * ---------------------------------------------------------------
 *
 * # dev task config
 * Copies all directories and files, exept coffescript and less fiels, from the sails
 * assets folder into the .tmp/public directory.
 *
 * # build task config
 * Copies all directories nd files from the .tmp/public directory into a www directory.
 *
 * For usage docs see:
 * 		https://github.com/gruntjs/grunt-contrib-copy
 */
module.exports = function(grunt) {

	grunt.config.set('copy', {
		dev: {
			files: [{
				expand: true,
				cwd: './assets',
				src: ['**/*.!(coffee|less)'],
				dest: '.tmp/public'
			},{ //Angular
				expand: true,
				cwd: './bower_components/angular',
				src: ['*.js'],
				dest: '.tmp/public/components/angular'
			},{ //Angular Route
				expand: true,
				cwd: './bower_components/angular-route',
				src: ['*.js'],
				dest: '.tmp/public/components/angular-route'
			},{ //Angular Jwt
				expand: true,
				cwd: './bower_components/angular-jwt',
				src: ['**/*'],
				dest: '.tmp/public/components/angular-jwt'
			},{ //angular-local-storage
				expand: true,
				cwd: './bower_components/angular-local-storage',
				src: ['**/*'],
				dest: '.tmp/public/components/angular-local-storage'
			},{ //Bootstrap
				expand: true,
				cwd: './bower_components/bootstrap/dist',
				src: ['**/*'],
				dest: '.tmp/public/components/bootstrap'
			}]
		},
		build: {
			files: [{
				expand: true,
				cwd: '.tmp/public',
				src: ['**/*'],
				dest: 'www'
			}]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
};
