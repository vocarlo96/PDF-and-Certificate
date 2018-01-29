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
    require_once( plugin_dir_path( __FILE__ ) . 'includes/pdfCert-generate-certificate-shortcode.php' );

    function pdfCert_enqueue_scripts(){
        global $pagenow, $typenow;

        if($pagenow == 'admin.php'){
            wp_enqueue_script( 'option-type-js', plugins_url( 'admin/js/option-type.js', __FILE__ ), array('jquery'), '1.0.0',  true );
            wp_enqueue_script( 'column-content-js', plugins_url( 'admin/js/column-content.js', __FILE__ ), array('jquery'), '1.0.0',  true );
            wp_enqueue_script( 'save-certificate-js', plugins_url( 'admin/js/save-certificate.js', __FILE__ ), array('jquery'), '1.0.0',  true );
            wp_enqueue_script( 'add-more-js', plugins_url( 'admin/js/add-more.js', __FILE__ ), array('jquery'), '1.0.0',  true );
           
            wp_register_script( 'pdf-make-library-js', plugins_url( 'admin/library/pdfmake.min.js', __FILE__ ), array(), '1.0.0',  true );
            wp_register_script( 'pdf-vfs-fonts-js', plugins_url( 'admin/library/vfs_fonts.js', __FILE__ ), array(), '1.0.0',  true );
            wp_enqueue_script( 'certificate-preview-js', plugins_url( 'admin/js/certificate-preview.js', __FILE__ ), array('pdf-make-library-js', 'pdf-vfs-fonts-js'), '1.0.0',  true );
            // wp_localize_script( 'column-content-js', 'ajax_object', array( 'ajax_url' => plugins_url( 'admin/admin-ajax.php' ) ) );
            wp_localize_script( 'column-content-js', 'column_comprobation', array(
                'security' => wp_create_nonce( 'pdfCert_certificate' ),
                // 'success' => __( 'Jobs sort order has been saved.' ),
                // 'failure' => __( 'There was an error saving the sort order, or you do not have proper permissions.' )
            ) );

            wp_localize_script( 'save-certificate-js', 'save_comprobation', array(
                'security' => wp_create_nonce( 'pdfCert_save_certificate' ),
                // 'success' => __( 'Jobs sort order has been saved.' ),
                // 'failure' => __( 'There was an error saving the sort order, or you do not have proper permissions.' )
            ));
        }
    }

    add_action( 'admin_enqueue_scripts', 'pdfCert_enqueue_scripts');

?>