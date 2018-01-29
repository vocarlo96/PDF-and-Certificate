<?php
    function pdfCrt_generate_certificate(){
        if( is_user_logged_in() ){

            global $wpdb;
            $table_name = $wpdb->prefix . 'certificate';
            $sql = "SELECT title FROM $table_name";
            $generate_certificate_option = $wpdb->get_results($sql);
            
            $shortcodeHtml = '<h2>Solicita tu certificado</h2>
                              <label for="generate-certificate-shortcode">Curso</label>
                              <select name="generate-certificate-shortcode" id="generate-certificate-shortcode" >
                                  <option value="-" selected> - </option>';

            foreach($generate_certificate_option as $index => $value) {
                foreach($value as $title){
                    $shortcodeHtml .= '<option value="' . esc_attr($title) . '">' . esc_html($title) . '</option>';
                }
            };
            
            $shortcodeHtml .=  '</select>
                              <button id="certificate-request">Solicitar</button>';
            // print_r($generate_certificate_option);

            
            return $shortcodeHtml;
        }else{
            return '<h3>Ptu es un proyecto para el aprendizaje online</h3>';
        }

    }

    add_shortcode( 'generate_certificate', 'pdfCrt_generate_certificate' );

?>