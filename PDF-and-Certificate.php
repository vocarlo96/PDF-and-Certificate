<?php
/**
 * Plugin Name: PDF and Certificate
 * Plugin URI: https://github.com/vocarlo96/PDF-and-Certificate
 * Description: Plugin para la creación y validación de certificados digitales, creados en PDF
 * Author: Carlos Hernández
 * Version: 1.0.0
 * License: GPL2
*/
defined( 'ABSPATH' ) or die( 'Cannot access pages directly.' );
    
    require_once( plugin_dir_path( __FILE__ ) . 'admin/pdfCert-database.php' );
    require_once( plugin_dir_path( __FILE__ ) . 'admin/pdfCert-menus.php' );

?>