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

    function pdfCert_enqueue_scripts(){
        global $pagenow, $typenow;

        if($pagenow == 'admin.php'){
            wp_enqueue_script( 'column-content-js', plugins_url( 'admin/js/column-content.js', __FILE__ ), array('jquery'), '20150626',  true );
            // wp_localize_script( 'column-content-js', 'ajax_object', array( 'ajax_url' => plugins_url( 'admin/admin-ajax.php' ) ) );
            wp_localize_script( 'column-content-js', 'column_comprobation', array(
                'security' => wp_create_nonce( 'wp-job-order' ),
                'success' => __( 'Jobs sort order has been saved.' ),
                'failure' => __( 'There was an error saving the sort order, or you do not have proper permissions.' )
            ) );
        }
    }

    add_action( 'admin_enqueue_scripts', 'pdfCert_enqueue_scripts');

?>