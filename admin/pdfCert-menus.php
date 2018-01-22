<?php
    // function pdfCert_top_level_menu(){

    function pdfCert_menus(){

        add_menu_page( 'PDF Certificate', 'PDF Certificate', 'manage_options', 'pdf_certificate', 'pdfCert_primary_content', '
                        dashicons-media-default', 25);
        add_submenu_page( 'pdf_certificate', 'New certificate', 'New certificate', 'manage_options', 'new_certificate', 'pdfCert_secundary_content' );
    }

    function pdfCert_primary_content(){
        if ( ! current_user_can('manage_options')){
            return;
        }
        ?>
        
        <div class="wrap">
            <h1>PDF and Certificate</h1>
            <a href="<?php echo esc_url( admin_url() . 'admin.php?page=new_certificate' ); ?>">
                Add new
            </a>
            <table>
                <tr>
                    <th>title</th>
                    <th>options</th>
                </tr>
            </table>
        </div>
        
        <?php
    }

    function pdfCert_secundary_content(){
        // global $chartsetb;
        // var_dump($chartsetb);
        if ( ! current_user_can('manage_options')){
            return;
        }
        global $wpdb;
        global $column_data;
        global $pagenow, $typenow;
        var_dump($pagenow);
        // var_dump($typenow);
        ?>
        
        <div class="wrap">
            <h1>New Certificate</h1>
            <label for="certificate-title">Title</label>
            <input type="text" name="certificate-title">
            <button>Add Content</button>

            <div>
                <label for="type">Type</label>
                <select name="type" id="option-type">
                    <option value="-">-</option>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                </select>
                <label for="table">Table</label>
                <select name="table" class="option-table">
                    <option value="-">-</option>
                    <?php
                        
                        $sql = "SHOW TABLES";
                        $results = $wpdb->get_results($sql);
                        foreach($results as $index => $value) {
                            foreach($value as $tableName) {
                                echo '<option value="';
                                echo esc_attr( $tableName );
                                echo '">';
                                echo esc_html( $tableName );
                                echo '</option>';;          
                            }
                        }

                    ?>
                </select>
                <label for="column">Column</label>
                <select name="column" id="option-column">
                    <option value="-" class="column-option">-</option>
                </select>
                <h5>Dimension</h5>    
                <label for="type">Width</label>
                <input type="number" name="">
                <label for="type">height</label>
                <input type="number" name="">
                <h5>Position</h5>    
                <label for="type">X</label>
                <input type="number" name="">
                <label for="type">Y</label>
                <input type="number" name="">
            </div>
            <button class="save-certificate">Save</button>
        </div>

        <?php
    }

    // add_action( 'admin_menu', 'pdfCert_top_level_menu' );
    add_action( 'admin_menu', 'pdfCert_menus' );

    function pdfCert_get_colunm_value() {
        if ( ! check_ajax_referer( 'wp-job-order', 'security' ) ) {
            return wp_send_json_error( 'Invalid Nonce' );
        }
        if ( ! current_user_can( 'manage_options' ) ) {
            return wp_send_json_error( 'You are not allow to do this.' );
        }
        global $wpdb;
        $column_data = $_POST['value'];
        $sql = "SELECT `COLUMN_NAME` 
                FROM `INFORMATION_SCHEMA`.`COLUMNS` 
                WHERE `TABLE_SCHEMA`='luz' 
                AND `TABLE_NAME`='$column_data';";
        $columns_name = $wpdb->get_results($sql);
        $columns_names = array();
        foreach($columns_name as $index => $value) {
            foreach($value as $tableName) {
                array_push($columns_names, $tableName);                
            }
        }

        $columns_names_json = json_encode($columns_names);
        
        wp_send_json_success( $columns_names_json );
    }
    add_action( 'wp_ajax_get_colunm_value', 'pdfCert_get_colunm_value' );


?>