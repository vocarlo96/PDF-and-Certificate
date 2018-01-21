<?php

    if( ! defined( 'WP_UNINSTALL_PLUGIN' )){
        die;
    }

    global $wpdb;
    $table_name = $wpdb->prefix . 'certificate';
    $table_name2 = $wpdb->prefix . 'certificate_content';

    $wpdb->query("DROP TABLE IF EXISTS `{$table_name}`");
    $wpdb->query("DROP TABLE IF EXISTS `{$table_name2}`");

?>