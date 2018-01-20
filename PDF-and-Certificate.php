<?php
/**
 * Plugin Name: PDF and Certificate
 * Plugin URI: https://github.com/vocarlo96/PDF-and-Certificate
 * Description: Plugin para la creación y validación de certificados digitales, creados en PDF
 * Author: Carlos Hernández
 * Version: 1.0.0
 * License: GPL2
*/

    // global $chartsetb;
    // global $wpdb;
    // $chartsetb = $wpdb->get_charset_collate();
    function pfdCert_database_init(){
        global $wpdb;
        $chartset_collate = $wpdb->get_charset_collate();
        $table_name = $wpdb->prefix . 'certificate'; 

        $sql = "CREATE TABLE $table_name (
            id_certificate INT NOT NULL AUTO_INCREMENT,
            title VARCHAR(100) NOT NULL,
            PRIMARY KEY  (ide_certificate)
        ) $chartset_collate;";

        require_once( ABSPATH . 'wp-admin/includes/upgrades.php');
        dbDelta( $sql );
    }

    register_activation_hook( __FILE__, 'pfdCert_database_init');


    function pdfCert_top_level_menu(){

        add_menu_page( 'PDF Certificate', 'PDF Certificate', 'manage_options', 'pdf_certificate', 'pdfCert_primary_content', '
                        dashicons-media-default', 25);

    }

    function pdfCert_primary_content(){
        // global $chartsetb;
        // var_dump($chartsetb);
        echo '<h1>aca se despliega el menu</h1>';

    }

    add_action( 'admin_menu', 'pdfCert_top_level_menu' );


?>