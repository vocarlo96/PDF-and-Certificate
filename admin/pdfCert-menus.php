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

                <div class="certificate-data">

                    <div>
                        <label for="certificate-title">Title</label>
                        <input type="text" name="certificate-title">
                        <button>Add Content</button>

                    </div>

                    <div>
                        <div>
                            <div>
                                <label for="type">Type</label>
                                <select name="type" id="option-type">
                                    <option value="-">-</option>
                                    <option value="text">Text</option>
                                    <option value="image">Image</option>
                                </select>
                                <label for="table">Table</label>
                                <select name="table" id="option-table">
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
                            </div>
                            <div>
                                <h5>Dimension</h5>    
                                <label for="width">Width</label>
                                <input type="number" name="width" id="width-dimension">
                                <label for="height">height</label>
                                <input type="number" name="height" id="height-dimension">
                            </div>
                            <div>
                                <h5>Position</h5>    
                                <label for="x">X</label>
                                <input type="number" name="x" id="x-position">
                                <label for="y">Y</label>
                                <input type="number" name="y" id="y-position">
                            </div>

                        </div>
                        <!-- <div></div> -->

                    </div>
                </div>

            <button class="save-certificate">Save</button>

        </div>

        <?php
    }

    // add_action( 'admin_menu', 'pdfCert_top_level_menu' );
    add_action( 'admin_menu', 'pdfCert_menus' );

    function pdfCert_get_colunm_value() {
        if ( ! check_ajax_referer( 'pdfCert_certificate', 'security' ) ) {
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
    
    function pdfCert_save_certificate(){
        // header("Content-Type: text/plain");
        global $wpdb;
        $certificate_table = $wpdb->prefix . 'certificate';
        $certificate_title = $_POST['certificateTitle'];
        // $save_data = json_decode(stripslashes($_POST['value']));
        $sql = "INSERT INTO $certificate_table( title ) VALUES( %s )";
        $wpdb->query( $wpdb->prepare( $sql, $save_data) );
        
        $sql = "SELECT id_certificate FROM $certificate_table WHERE title=%s";
        $certificate_ids = $wpdb->get_results($wpdb->prepare( $sql , $certificate_title ));
        $certificate_id = $certificate_ids[0]->id_certificate;
        
        $certificate_data_table = $wpdb->prefix . 'certificate_content';
        $certificate_data = $_POST['certificateData'];
        $sql2 = "INSERT INTO $certificate_data_table( id_certificate, x_position, height, width, y_position, column_content, table_content, type_content  ) VALUES( %d, %d, %d, %d, %d, %s, %s, %s )";
        foreach($certificate_data as $data){
            $arg = array(
                $certificate_id, 
                $data['xPosition'], 
                $data['heightDimension'],
                $data['widthDimension'],
                $data['yPosition'], 
                $data['optionColumn'],
                $data['optionTable'],
                $data['optionType']
            );
            $wpdb->query( $wpdb->prepare( $sql2, $arg) );
        }
        wp_send_json_success( $certificate_id[0]->id_certificate );

    }

    add_action( 'wp_ajax_save_certificate', 'pdfCert_save_certificate');
    
    ?>