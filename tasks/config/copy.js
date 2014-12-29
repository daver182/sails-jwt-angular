module.exports = function(grunt) {
	grunt.config.set('copy', {
		dev: {
			files: [{
				expand: true,
				cwd: './assets',
				src: ['**/*.!(coffee|less)'],
				dest: '.tmp/public'
			},{ //Jquery
				expand: true,
				cwd: './bower_components/jquery/dist',
				src: ['**/*'],
				dest: '.tmp/public/components/jquery'
			},{ //Angular
				expand: true,
				cwd: './bower_components/angular',
				src: ['*.js'],
				dest: '.tmp/public/components/angular'
			},{ //satellizer
				expand: true,
				cwd: './bower_components/satellizer',
				src: ['*.js'],
				dest: '.tmp/public/components/satellizer'
			},{ //ui-router
				expand: true,
				cwd: './bower_components/ui-router/release',
				src: ['**/*'],
				dest: '.tmp/public/components/ui-router'
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
