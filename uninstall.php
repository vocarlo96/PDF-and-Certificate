<?php

    if( ! defined( 'WP_UNINSTALL_PLUGIN' )){
        die;
    }

    global $wpdb;
    $table_name = $wpdb->prefix . "certificate";
    $wpdb->query("DROP TABLE `{$table_name}`");

?>