<?php
    function pfdCert_database_init(){
        global $wpdb;
        $chartset_collate = $wpdb->get_charset_collate();
        $table_name = $wpdb->prefix . 'certificate'; 

        $sql = "CREATE TABLE $table_name (
            id_certificate INT NOT NULL AUTO_INCREMENT,
            title VARCHAR(100) NOT NULL,
            PRIMARY KEY  (id_certificate)
        ) $chartset_collate;";

        require_once( ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta( $sql );

        $table_name2 = $wpdb->prefix . 'certificate_content';

        $sql = "CREATE TABLE $table_name2 (
            id_content INT NOT NULL AUTO_INCREMENT,
            id_certificate INT NOT NULL,
            x_position INT(3) NOT NULL,
            height INT(3) NOT NULL,
            width INT(3) NOT NULL,
            y_position INT(3) NOT NULL,
            column_content VARCHAR(30) NOT NULL,
            table_content VARCHAR(500) NOT NULL,
            type_content VARCHAR(30) NOT NULL,
            PRIMARY KEY  (id_content),
            FOREIGN KEY  (id_certificate) REFERENCES $table_name (id_certificate)
        ) $chartset_collate;";

        dbDelta( $sql );
    }

    register_activation_hook( __FILE__, 'pfdCert_database_init');

?>