<?php

    function pdfCrt_validate_certificate(){

        $shortcode_html = '<div class="certificate-shortcode-wrap">
                            <h3>Validar certificado</h3>
                            <label for="validate-certificate-shortcode">ID de certificado</label>
                            <input type="text" name="validate-certificate-shortcode" id="validate-certificate-shortcode">
                            <button id="validate-certificate">Validar</button>
                            </div>';

        return $shortcode_html;

    }

    add_shortcode( 'validate_certificate', 'pdfCrt_validate_certificate' );

    function pfdCert_validate_certificate(){
        global $wpdb;
        $validate_id = $_POST['value'];
        $table_name = $wpdb->prefix . 'certificate_validate';
        $sql = "SELECT *FROM $table_name WHERE id_validate= %d";
        $validate_certificate_results = $wpdb->get_results($wpdb->prepare($sql, $validate_id ));
        $user = get_user_by('ID', $validate_certificate_results[0]->id_user );

        $table_name = $wpdb->prefix . 'certificate';
        $sql = "SELECT *FROM $table_name WHERE id_certificate= %d";
        $certificate_results = $wpdb->get_results($wpdb->prepare($sql, $validate_certificate_results[0]->id_certificate ));

        $validate_certificate_data = array( $user->user_login, $certificate_results[0]->title);

        wp_send_json_success( $validate_certificate_data );
    }

    add_action( 'wp_ajax_validate_certificate', 'pfdCert_validate_certificate' );

?>