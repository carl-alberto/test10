/* jshint node:true */
/* global module */
module.exports = function( grunt ) {
	var HH_CSS = [
			'plugins/PLUGINNAME/assets/css/*.css',
			'themes/THEMENAME/**/*.css'
		],

		HH_JS = [
			'plugins/PLUGINNAME/assets/js/*.js',
			'themes/THEMENAME/js/*.js'
		],

		matchdep = require('matchdep');

	// Load tasks.
	matchdep.filterDev('grunt-*').forEach( grunt.loadNpmTasks );

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON( 'package.json' ),
		checktextdomain: {
			options: {
				text_domain: 'PLUGINNAME',
				correct_domain: false,
				keywords: [
					'__:1,2d',
					'_e:1,2d',
					'_x:1,2c,3d',
					'_n:1,2,4d',
					'_ex:1,2c,3d',
					'_nx:1,2,4c,5d',
					'esc_attr__:1,2d',
					'esc_attr_e:1,2d',
					'esc_attr_x:1,2c,3d',
					'esc_html__:1,2d',
					'esc_html_e:1,2d',
					'esc_html_x:1,2c,3d',
					'_n_noop:1,2,3d',
					'_nx_noop:1,2,3c,4d'
				]
			},
			files: {
				src: [
					'plugins/PLUGINNAME/**/*.php',
					'plugins/PLUGINNAME/**/*.php',
					'themes/THEMENAME/**/*.php'
				],
				expand: true
			}
		},
		checkDependencies: {
			options: {
				packageManager: 'npm'
			},
			src: {}
		},
		jscs: {
			src: HH_JS,
			options: {
				config: 'buildtest/grunt/.jscsrc',
				fix: false // Autofix code style violations when possible.
			}
		},
		jshint: {
			options: grunt.file.readJSON( 'buildtest/grunt/.jshintrc' ),
			grunt: {
				src: [ 'Gruntfile.js' ]
			},
			core: {
				expand: true,
				src: HH_JS
			}
		},
		jsvalidate:{
			options:{
				globals: {},
				esprimaOptions:{},
				verbose: false
			},
			files: {
				src: HH_JS
			}
		},
		stylelint: {
			css: {
				options: {
					configFile: 'buildtest/grunt/.stylelintrc.js',
					format: 'css'
				},
				expand: true,
				src: HH_CSS
			}
		}
	});

	// CSS test task.
	grunt.registerTask( 'csstest', 'Runs all CSS tasks.', [ 'stylelint' ] );

	// JavaScript test task.
	grunt.registerTask( 'jstest', 'Runs all JavaScript tasks.', [ 'jsvalidate', 'jshint', 'jscs' ] );

	// PHP test task.
	grunt.registerTask( 'phptest', 'Runs all PHP tasks.', [ 'checktextdomain' ] );

	// Travis CI Task
	grunt.registerTask( 'travis', 'Runs Travis CI tasks.',[ 'csstest', 'jstest', 'phptest' ] );

	// Default task.
	grunt.registerTask( 'default', [
		'checkDependencies',
		'csstest',
		'jstest',
		'phptest'
	] );
};
