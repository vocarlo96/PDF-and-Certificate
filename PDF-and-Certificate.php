<?php
/**
 * Plugin Name: PDF and Certificate
 * Description: Plugin para la creación y validación de certificados digitales, creados en PDF
 * Author: Carlos Hernández
 * Version: 1.0.0
 * License: GPL2
*/
defined( 'ABSPATH' ) or die( 'Cannot access pages directly.' );
    
    require_once( plugin_dir_path( __FILE__ ) . 'admin/pdfCert-database.php' );
    require_once( plugin_dir_path( __FILE__ ) . 'admin/pdfCert-menus.php' );
    require_once( plugin_dir_path( __FILE__ ) . 'includes/pdfCert-generate-certificate-shortcode.php' );
    require_once( plugin_dir_path( __FILE__ ) . 'includes/pdfCert-validate-certificate-shortcode.php' );

    function pdfCert_admin_enqueue_scripts(){
        global $pagenow, $typenow;
        
        if(current_user_can('manage_options') && $pagenow == 'admin.php'){
            wp_enqueue_script( 'option-type-js', plugins_url( 'admin/js/option-type.js', __FILE__ ), array('jquery'), '1.0.0',  true );
            wp_enqueue_script( 'table-content-js', plugins_url( 'admin/js/table-content.js', __FILE__ ), array('jquery'), '1.0.0',  true );
            wp_enqueue_script( 'column-content-js', plugins_url( 'admin/js/column-content.js', __FILE__ ), array('jquery'), '1.0.0',  true );
            wp_enqueue_script( 'save-certificate-js', plugins_url( 'admin/js/save-certificate.js', __FILE__ ), array('jquery'), '1.0.0',  true );
            wp_enqueue_script( 'add-more-js', plugins_url( 'admin/js/add-more.js', __FILE__ ), array('jquery'), '1.0.0',  true );
            wp_enqueue_script( 'delete-certificate-js', plugins_url( 'admin/js/delete-certificate.js', __FILE__ ), array('jquery'), '1.0.0',  true );
            wp_enqueue_script( 'edit-certificate-js', plugins_url( 'admin/js/edit-certificate.js', __FILE__ ), array('jquery'), '1.0.0',  true );
            wp_enqueue_script( 'edit-certificate-content-js', plugins_url( 'admin/js/edit-certificate-content.js', __FILE__ ), array('jquery'), '1.0.0',  true );
            wp_enqueue_script( 'media-certificate-picker-js', plugins_url( 'admin/js/media-certificate-picker.js', __FILE__ ), array('jquery', 'media-upload'), '1.0.0', true);
            wp_register_script( 'pdf-make-library-js', plugins_url( 'admin/library/pdfmake.min.js', __FILE__ ), array(), '1.0.0',  true );
            wp_register_script( 'pdf-vfs-fonts-js', plugins_url( 'admin/library/vfs_fonts.js', __FILE__ ), array(), '1.0.0',  true );
            // wp_enqueue_script( 'generate-certificate-js', plugins_url( 'includes/js/generate-certificate.js', __FILE__ ), array('jquery', 'pdf-make-library-js', 'pdf-vfs-fonts-js'), '1.0.0',  true );
            wp_enqueue_script( 'certificate-preview-js', plugins_url( 'admin/js/certificate-preview.js', __FILE__ ), array('jquery', 'pdf-make-library-js', 'pdf-vfs-fonts-js'), '1.0.0',  true );
            // wp_localize_script( 'table-content-js', 'ajax_object', array( 'ajax_url' => plugins_url( 'admin/admin-ajax.php' ) ) );
            wp_localize_script( 'table-content-js', 'table_comprobation', array(
                'security' => wp_create_nonce( 'pdfCert_certificate' ),
                // 'success' => __( 'Jobs sort order has been saved.' ),
                // 'failure' => __( 'There was an error saving the sort order, or you do not have proper permissions.' )
            ) );

            wp_localize_script( 'save-certificate-js', 'save_comprobation', array(
                'security' => wp_create_nonce( 'pdfCert_save_certificate' ),
                // 'success' => __( 'Jobs sort order has been saved.' ),
                // 'failure' => __( 'There was an error saving the sort order, or you do not have proper permissions.' )
            ));

            wp_enqueue_style( 'new-certificate-page-css',  plugins_url( 'admin/css/new-certificate-page.css', __FILE__ ), array(), '1.0.0',  'screen');
        }
    }

    add_action( 'admin_enqueue_scripts', 'pdfCert_admin_enqueue_scripts');

    function pdfCert_users_enqueue_scripts(){
        global $pagenow, $typenow;

        if( is_user_logged_in() && $pagenow == 'index.php' ){
            wp_enqueue_style( 'certificate-shortcode-css',  plugins_url( 'includes/css/certificate-shortcode.css', __FILE__ ), array(), '1.0.0',  'screen');
            wp_register_script( 'pdf-make-library-js', plugins_url( 'admin/library/pdfmake.min.js', __FILE__ ), array(), '1.0.0',  true );
            wp_register_script( 'pdf-vfs-fonts-js', plugins_url( 'admin/library/vfs_fonts.js', __FILE__ ), array(), '1.0.0',  true );
            wp_enqueue_script( 'generate-certificate-js', plugins_url( 'includes/js/generate-certificate.js', __FILE__ ), array('jquery', 'pdf-make-library-js', 'pdf-vfs-fonts-js'), '1.0.0',  true );
            wp_localize_script( 'generate-certificate-js', 'ajax_object', array( 'ajax_url' => admin_url( 'admin-ajax.php' )) );
            wp_enqueue_script( 'validate-certificate-js', plugins_url( 'includes/js/validate-certificate.js', __FILE__ ), array('jquery', 'pdf-make-library-js', 'pdf-vfs-fonts-js'), '1.0.0',  true );
            wp_localize_script( 'validate-certificate-js', 'ajax_object', array( 'ajax_url' => admin_url( 'admin-ajax.php' )) );
        }

    }

    add_action( 'wp_enqueue_scripts', 'pdfCert_users_enqueue_scripts');

?>