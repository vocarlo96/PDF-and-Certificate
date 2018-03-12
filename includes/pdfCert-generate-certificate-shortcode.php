<?php
    function pdfCrt_generate_certificate_shortcode(){
        if( is_user_logged_in() ){

            global $wpdb;
            $current_user = wp_get_current_user();
            $table_name = $wpdb->prefix . 'certificate_user_enable';
            $sql = "SELECT id_certificate FROM $table_name WHERE id_user=%d";
            $generate_certificate_id = $wpdb->get_results($wpdb->prepare($sql, $current_user->ID));

            $table_name = $wpdb->prefix . 'certificate';
            $sql = "SELECT title FROM $table_name WHERE id_certificate=%d";
            $certificate_title = array();
            // print_r($generate_certificate_id[0]->id_certificate);
            foreach($generate_certificate_id as $index => $value){
                foreach($value as $id){
                    $generate_certificate_option = $wpdb->get_results($wpdb->prepare($sql, $id));
                    array_push($certificate_title, $generate_certificate_option[0]->title);
                }
            }
            
            $shortcode_html = '<div class="certificate-shortcode-wrap">
                                <h3>Solicita tu certificado</h3>
                              <label for="generate-certificate-shortcode">Curso</label>
                              <select name="generate-certificate-shortcode" id="generate-certificate-shortcode" >
                                  <option value="-" selected> - </option>';

            foreach($certificate_title as $data) {
                    $shortcode_html .= '<option value="' . esc_attr($data) . '">' . esc_html($data) . '</option>';
            };
            
            $shortcode_html .=  '</select>
                              <button id="certificate-request">Solicitar</button>
                              </div>';
            // print_r($certificate_title);

            
            return $shortcode_html;
        }else{
            return '<h3>Ptu es un proyecto para el aprendizaje online</h3>';
        }

    }

    add_shortcode( 'generate_certificate', 'pdfCrt_generate_certificate_shortcode' );

    function pdfCert_aditional_info_check(){
        global $wpdb;
        $current_user = wp_get_current_user();
        $generate_certificate_data = $_POST['value'];
        
        $table_name = $wpdb->prefix . 'certificate';
        $sql = "SELECT id_certificate FROM $table_name WHERE title = %s";
        $certificate_id_result = $wpdb->get_results($wpdb->prepare($sql, $generate_certificate_data));
        $certificate_id = $certificate_id_result[0]->id_certificate;

        $table_name = $wpdb->prefix . 'certificate_content';
        $type = 'aditionalInfo';
        $sql = "SELECT *FROM $table_name WHERE id_certificate = %d and type_content= %s";
        $certificate_data_results = $wpdb->get_results($wpdb->prepare($sql, array( $certificate_id, $type )));

        $aditional_info_data = array();
        foreach($certificate_data_results as $index=>$value){

            array_push($aditional_info_data, array($value->custom_text, $value->data_value));

        }

        wp_send_json_success( $aditional_info_data );
    }

    add_action( 'wp_ajax_aditional_info_check', 'pdfCert_aditional_info_check' );

    function pdfCert_generete_certificate(){
        global $wpdb;
        $current_user = wp_get_current_user();
        $generate_certificate_data = $_POST['value'];
        $cerificate_aditiona_info_data = $_POST['aditionalInfo'];
        $table_name = $wpdb->prefix . 'certificate';
        $sql = "SELECT id_certificate FROM $table_name WHERE title = %s";
        $certificate_id_result = $wpdb->get_results($wpdb->prepare($sql, $generate_certificate_data));
        $certificate_id = $certificate_id_result[0]->id_certificate;

        $table_name = $wpdb->prefix . 'certificate_validate';
        $sql = "SELECT id_validate FROM $table_name WHERE id_certificate = %d AND id_user = %d";
        $certificate_exist_result = $wpdb->get_results($wpdb->prepare($sql, array( $certificate_id, $current_user->ID)));
        $certificate_exist = $certificate_exist_result[0]->id_validate;

        if(!$certificate_exist){
            $table_name = $wpdb->prefix . 'certificate_validate';
            $sql = "INSERT INTO $table_name( id_certificate, id_user) VALUES( %d, %d )";
            $wpdb->query($wpdb->prepare($sql, array($certificate_id, $current_user->ID)));
            $certificate_exist_result = $wpdb->get_results($wpdb->prepare($sql, array( $certificate_id, $current_user->ID)));
            $certificate_exist = $certificate_exist_result[0]->id_validate;
        }

        $table_name = $wpdb->prefix . 'certificate_content';
        $sql = "SELECT *FROM $table_name WHERE id_certificate = %d";
        $certificate_data_results = $wpdb->get_results($wpdb->prepare($sql, $certificate_id));

        $certificate_data = array();

        foreach($certificate_data_results as $index=>$value){

            switch($value->type_content){

                case 'Custom text':
                    array_push($certificate_data, array($value->type_content, $value->x_position, $value->y_position, $value->custom_text));
                    break;

                case 'database':
                    array_push($certificate_data, array($value->type_content, $value->x_position, $value->y_position, $value->data_value));
                    break;

                case 'image':
                    array_push($certificate_data, array($value->type_content, $value->x_position, $value->y_position, $value->height, $value->width, $value->data_value));
                    break;

                case 'userInfo':

                    switch($value->data_value){
                        case "ID":
                            $user_info_data = $current_user->ID;
                            break;
                        case "display_name":
                            $user_info_data = $current_user->display_name;
                            break;
                        case "user_firstname":
                            $user_info_data = $current_user->user_firstnam;
                            break;
                        case "user_lastname":
                            $user_info_data = $current_user->user_lastname;
                            break;
                        case "user_email":
                            $user_info_data = $current_user->user_email;
                            break;
                        case "user_login":
                            $user_info_data = $current_user->user_login;
                            break;
                    }
                    array_push($certificate_data, array($value->type_content, $value->x_position, $value->y_position, $user_info_data));
                    break;

                case 'certificateInfo':

                    switch($value->data_value){
                        case "ID":
                            $certificate_info = $certificate_exist;
                            break;
                        case "title":
                            $certificate_info = $generate_certificate_data;
                            break;
                    }
                    array_push($certificate_data, array($value->type_content, $value->x_position, $value->y_position, $certificate_info));
                    break;

                case 'aditionalInfo':
                    array_push($certificate_data, array($value->type_content, $value->x_position, $value->y_position, $cerificate_aditiona_info_data[0]));
                    array_shift ( $cerificate_aditiona_info_data);
                    break;

            }
        }

        wp_send_json_success( $certificate_data );
    }


    add_action( 'wp_ajax_generate_certificate', 'pdfCert_generete_certificate' );

?>