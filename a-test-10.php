<?php
/**
 * Plugin Name: A Test 10
 * Version: 1.0.0
 * Plugin URI: https://carl.alber2.com/
 * Description: This is your starter template for your next WordPress plugin.
 * Author: Carl Alberto
 * Author URI: https://carl.alber2.com/
 * Requires at least: 4.0
 * Tested up to: 4.0
 *
 * Text Domain: a-test-10
 * Domain Path: /languages/
 *
 * @package A Test 10
 * @author Carl Alberto
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Load plugin class files.
require_once( 'includes/class-a-test-10.php' );
require_once( 'includes/class-a-test-10-settings.php' );

// Load plugin libraries.
require_once( 'includes/lib/class-a-test-10-admin-api.php' );
require_once( 'includes/lib/class-a-test-10-post-type.php' );
require_once( 'includes/lib/class-a-test-10-taxonomy.php' );

// Load custom functionalities.
require_once( 'includes/class-a-test-10-main.php' );

/**
 * Returns the main instance of A_Test_10 to prevent the need to use globals.
 *
 * @since  1.0.0
 * @return object A_Test_10
 */
function a_test_10() {
	// Plugin main variables.
	$latest_plugin_version = '1.0.0';
	$settings_prefix = 'plg1_';

	$pluginoptions = array(
		'settings_prefix' => $settings_prefix,
	);

	$instance = A_Test_10::instance( __FILE__,
		$latest_plugin_version,
		$pluginoptions
	);

	if ( is_null( $instance->settings ) ) {
		$instance->settings = A_Test_10_Settings::instance( $instance );
	}

	return $instance;
}

a_test_10();
