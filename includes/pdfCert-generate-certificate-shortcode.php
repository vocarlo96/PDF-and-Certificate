<?php
    function pdfCrt_generate_certificate_shortcode(){
        if( is_user_logged_in() ){

            global $wpdb;
            $table_name = $wpdb->prefix . 'certificate';
            $sql = "SELECT title FROM $table_name";
            $generate_certificate_option = $wpdb->get_results($sql);
            
            $shortcode_html = '<h2>Solicita tu certificado</h2>
                              <label for="generate-certificate-shortcode">Curso</label>
                              <select name="generate-certificate-shortcode" id="generate-certificate-shortcode" >
                                  <option value="-" selected> - </option>';

            foreach($generate_certificate_option as $index => $value) {
                foreach($value as $title){
                    $shortcode_html .= '<option value="' . esc_attr($title) . '">' . esc_html($title) . '</option>';
                }
            };
            
            $shortcode_html .=  '</select>
                              <button id="certificate-request">Solicitar</button>';
            // print_r($generate_certificate_option);

            
            return $shortcode_html;
        }else{
            return '<h3>Ptu es un proyecto para el aprendizaje online</h3>';
        }

    }

    add_shortcode( 'generate_certificate', 'pdfCrt_generate_certificate_shortcode' );

    function pdfCert_generete_certificate(){
        global $wpdb;
        $table_name = $wpdb->prefix . 'certificate';
        $generate_certificate_data = $_POST['value'];
        $sql = "SELECT id_certificate FROM $table_name WHERE title = %s";
        $certificate_id_result = $wpdb->get_results($wpdb->prepare($sql, $generate_certificate_data));
        $certificate_id = $certificate_id_result[0]->id_certificate;

        $table_name = $wpdb->prefix . 'certificate_content';
        $sql = "SELECT *FROM $table_name WHERE id_certificate = %d";
        $certificate_data_results = $wpdb->get_results($wpdb->prepare($sql, $certificate_id));

        $certificate_data = array();

        foreach($certificate_data_results as $index=>$value){
            // wp_send_json_success( $certificate_data_results );
            switch($value->type_content){

                case 'Custom text':
                    array_push($certificate_data, array($value->type_content, $value->x_position, $value->y_position, $value->custom_text));
                    break;

                case 'database':
                    array_push($certificate_data, array($value->type_content, $value->x_position, $value->y_position, $value->data_value));
                    break;

                case 'image':
                    break;

            }
        }

        $current_user = wp_get_current_user();

        $table_name = $wpdb->prefix . 'certificate_validate';
        $sql = "INSERT INTO $table_name( id_certificate, id_user) VALUES( %d, %d )";
        $wpdb->query($wpdb->prepare($sql, array($certificate_id, $current_user->ID)));

        wp_send_json_success( $certificate_data );
    }


    add_action( 'wp_ajax_generate_certificate', 'pdfCert_generete_certificate' );

?>