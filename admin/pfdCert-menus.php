<?php

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