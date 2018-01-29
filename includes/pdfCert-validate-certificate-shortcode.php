<?php

    function pdfCrt_validate_certificate(){

        $shortcode_html = '<h3>Validar certificado</h3>
                            <label for="validate-certificate-shortcode">ID de certificado</label>
                            <input type="text" name="validate-certificate-shortcode" id="validate-certificate-shortcode">';

        return $shortcode_html;

    }

    add_shortcode( 'validate_certificate', 'pdfCrt_validate_certificate' );

?>