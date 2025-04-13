<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'aminchar_cms' );

/** Database username */
define( 'DB_USER', 'aminchar_cms' );

/** Database password */
define( 'DB_PASSWORD', 'C*Pd&x1wZC7R' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'Z0z<[$|9/1f&BETOk].UIDt@0p8qs;6{kRduF8?R$3~5.s*/~bUX /R6=TnrNPwG' );
define( 'SECURE_AUTH_KEY',  '::3:jUi]-Av OTOV2:9G@@~q?vxmxQ[{y={m])5).hXGu.XdYpmN(@8k^5xoFs&^' );
define( 'LOGGED_IN_KEY',    'gQ9+}TPkxwhjg?x%VK[!,0CH#.3(%EYjD+~]q(iurHUe,Qn%<];BPqTSwnduF 2(' );
define( 'NONCE_KEY',        'zM#@a$]K[mShF6_Ulb;p~>ZsJptwE.cY=kkC+ xAx0bdPT_NoIQ8NM+!.!dXB}x{' );
define( 'AUTH_SALT',        '`SpKF!]_dxpCL09-i{YO&yiQA4JR]UIO~R<IJ_0lWopeyz(=uMKr!HgN%aW/k(+/' );
define( 'SECURE_AUTH_SALT', 'R%{^i>Wh,QW>uuk;U@`O9ZlSnF9W<~7Dxd$60J3< {$/fY+0iyB_~Y/tILyE/&$R' );
define( 'LOGGED_IN_SALT',   '^[xNw-:uHX.:gv4?fP;:B97Gv|I3_Dg|^f*.5*U|iD]qS!PzlqhZ&Fftax!KL1qU' );
define( 'NONCE_SALT',       '&QVf;78 KJ&b3F536H<tRQF[Y)VGiA`>TneV95S*|Ve~ir;T@Bw4i`9VQ~V-N)VV' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

define( 'GRAPHQL_DEBUG', true );
