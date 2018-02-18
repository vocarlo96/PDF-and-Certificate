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
        global $wpdb;
        ?>
        
        <div class="wrap">
            <h1>PDF and Certificate</h1>
            <a href="<?php echo esc_url( admin_url() . 'admin.php?page=new_certificate' ); ?>">
                Add new
            </a>
            <table>
                <tr>
                    <th>id</th>
                    <th>title</th>
                    <th>options</th>
                </tr>
                <?php
                    $certificate_table = $wpdb->prefix . 'certificate';
                    $sql = "SELECT *FROM $certificate_table";
                    $certificate_table_data = $wpdb->get_results( $sql );
                    if($certificate_table_data){
                        // var_dump($certificate_table_data);
                        foreach($certificate_table_data as $data){
                            echo('<tr class="certificate-id-'. esc_attr($data->id_certificate) .'">
                                    <td>' . esc_html($data->id_certificate) . '</td>
                                    <td>' . esc_html($data->title) . '</td>
                                    <td> 
                                        <a class="delete-certificate certificate-id-'. esc_attr($data->id_certificate) .'" href="#">Eliminar</a> 
                                    </td>
                                    <td> 
                                        <a class="edit-certificate certificate-id-'. esc_attr($data->id_certificate) .'" href="#">Edit</a> 
                                    </td>
                                    </tr>');
                            
                        }
                    }
                ?>
            </table>
        </div>
        
        <?php
    }

    function pdfCert_secundary_content(){

        if ( ! current_user_can('manage_options')){
            return;
        }
        global $wpdb;
        global $column_data;
        global $pagenow, $typenow;
        // var_dump($pagenow);
        // var_dump($typenow);
        ?>
        
        <div class="wrap certificate-wrap">

            <h1>New Certificate</h1>

                <div class="certificate-configuration-data">

                    <div>
                        <label for="certificate-direction">Pagina en Horizontal</label>
                        <input type="checkbox" name="certificate-direction" id="certificate-direction">
                    </div>

                    <div class="certificate-user-enable">
                        <table>
                            <tr>
                                <th>Id</th>
                                <th>user name</th>
                                <th>enable</th>
                            </tr>
                            <?php 
                                $args = array(
                                    'orderby' => 'ID',
                                    'order' => 'ASC',
                                    'fields' => array(
                                        'ID',
                                        'display_name'
                                    )
                                );
                                $users = get_users($args);
                                foreach($users as $data){
                                    echo('<tr class="enable-user-'. esc_attr($data->ID) .'">
                                        <td>' . esc_html($data->ID) . '</td>
                                        <td>' . esc_html($data->display_name) . '</td>
                                        <td> 
                                            <input type="checkbox" class="check-box enable-user-'. esc_attr($data->ID) .'"> 
                                        </td>
                                    </tr>');
                                }
                            ?>
                        </table>
                    </div>


<!-- 
                    <div>
                        <label for="check-approved">Parametro de aprobado</label>
                        <input type="checkbox" name="check-approved" id="check-approved">
                        <input type="number" name="check-approved-range" id="check-approved-range" disabled>
                    </div>
                    
                    <div id="options-configure">
                        <p>Cual es el parametro a comparar</p>
                        <label for="type">Type</label>
                        <select name="type" class="option-type" disabled>
                            <option value="-" selected="true">-</option>
                            <option value="Custom text">Custom text</option>
                            <option value="database">Database field</option>
                        </select>
                    </div> -->

                </div>

                <div class="certificate-data">

                    <div>
                        <label for="certificate-title">Title</label>
                        <input type="text" name="certificate-title" id="certificate-title">
                        <button id="add-more">Add Content</button>
                        <button id="certificate-preview">Preview</button>

                    </div>

                    <div class="certificate-content-wrap">

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
            foreach($value as $columnName) {
                array_push($columns_names, $columnName);                
            }
        }

        // $columns_names_json = json_encode($columns_names);
        
        wp_send_json_success( $columns_names );
    }
    add_action( 'wp_ajax_get_colunm_value', 'pdfCert_get_colunm_value' );
    
    function pdfCert_save_certificate(){
        
        if ( ! check_ajax_referer( 'pdfCert_save_certificate', 'security' ) ) {
            return wp_send_json_error( 'Invalid Nonce' );
        }
        if ( ! current_user_can( 'manage_options' ) ) {
            return wp_send_json_error( 'You are not allow to do this.' );
        }

        global $wpdb;
        $certificate_table = $wpdb->prefix . 'certificate';
        $certificate_title = $_POST['certificateTitle'];
        // $save_data = json_decode(stripslashes($_POST['value']));
        $sql = "INSERT INTO $certificate_table( title ) VALUES( %s )";
        $wpdb->query( $wpdb->prepare( $sql, $certificate_title) );
        
        $sql = "SELECT id_certificate FROM $certificate_table WHERE title=%s";
        $certificate_ids = $wpdb->get_results($wpdb->prepare( $sql , $certificate_title ));
        $certificate_id = $certificate_ids[0]->id_certificate;

        $certificate_user_enable_table = $wpdb->prefix . 'certificate_user_enable';
        $certificate_user_enable_data = $_POST['certificateUserEnableData'];
        $sql = "INSERT INTO $certificate_user_enable_table( id_certificate, id_user ) VALUES( %d, %d )";

        foreach($certificate_user_enable_data as $data){
            $arg = array(
                $certificate_id,
                $data['userId']
            );
            $wpdb->query( $wpdb->prepare( $sql, $arg ) );
        }
        
        $certificate_data_table = $wpdb->prefix . 'certificate_content';
        $certificate_data = $_POST['certificateData'];
        foreach($certificate_data as $data){

            switch( $data['optionType'] ){
                
                case 'Custom text':
                    $sql2 = "INSERT INTO $certificate_data_table( id_certificate, x_position, y_position, custom_text, type_content  ) VALUES( %d, %d, %d, %s, %s )";
                    $arg = array(
                        $certificate_id, 
                        $data['xPosition'], 
                        $data['yPosition'], 
                        $data['customText'],
                        $data['optionType']
                    );
                    $wpdb->query( $wpdb->prepare( $sql2, $arg) );
                    break;

                case 'database':
                    $sql2 = "INSERT INTO $certificate_data_table( id_certificate, x_position, y_position, column_content, table_content, data_value, type_content  ) VALUES( %d, %d, %d, %s, %s, %s, %s )";
                    $arg = array(
                        $certificate_id, 
                        $data['xPosition'], 
                        $data['yPosition'], 
                        $data['optionColumn'],
                        $data['optionTable'],
                        $data['optionValue'],
                        $data['optionType']
                    );
                    $wpdb->query( $wpdb->prepare( $sql2, $arg) );
                    break;

                case 'image':
                    $sql2 = "INSERT INTO $certificate_data_table( id_certificate, x_position, y_position, height, width, data_value, type_content  ) VALUES( %d, %d, %d, %d, %d, %s, %s )";
                    $arg = array(
                        $certificate_id, 
                        $data['xPosition'], 
                        $data['yPosition'], 
                        $data['widthDimension'],
                        $data['heightDimension'],
                        $data['imageUrl'],
                        $data['optionType']
                    );
                    $wpdb->query( $wpdb->prepare( $sql2, $arg) );
                    break;

                case 'userInfo':
                    $sql2 = "INSERT INTO $certificate_data_table( id_certificate, x_position, y_position, data_value, type_content  ) VALUES( %d, %d, %d, %s, %s )";
                    $arg = array(
                        $certificate_id, 
                        $data['xPosition'], 
                        $data['yPosition'], 
                        $data['optionValue'],
                        $data['optionType']
                    );
                    $wpdb->query( $wpdb->prepare( $sql2, $arg) );
                    break;

            }

        }
        wp_send_json_success( $certificate_id[0]->id_certificate );

    }

    add_action( 'wp_ajax_save_certificate', 'pdfCert_save_certificate');

    function pdfCert_option_type(){
        global $wpdb;
        $option_data = $_POST['value'];

        switch($option_data){
            
            case "Custom text":
                break;
            
            case "database":
                $sql = "SHOW TABLES";
                $results = $wpdb->get_results($sql);
                $tables_names = array($option_data);
                if($results){
                    foreach($results as $index => $value) {
                        foreach($value as $tableName) {
                            array_push($tables_names, $tableName);        
                        }
                    }
                }
                $tables_names_json = json_encode($tables_names);
                wp_send_json_success( $tables_names_json);
                // add_action( 'admin_enqueue_scripts', 'algo');
                break;
            
            case "image":
                break;
            
        }


        wp_send_json_success( $option_data );
    }

    add_action( 'wp_ajax_option_type', 'pdfCert_option_type');


    function pdfCert_value_column(){
        global $wpdb;
        $value_table_data = $_POST['valueTable'];
        $value_column_data = $_POST['valueColumn'];

        $sql = "SELECT $value_column_data FROM $value_table_data";

        $value_column_results = $wpdb->get_results($sql);

        $value_column = array();
        foreach($value_column_results as $index => $value) {
            foreach($value as $columnValue) {
                array_push($value_column, $columnValue);                
            }
        }

        wp_send_json_success( $value_column );

    }

    add_action( 'wp_ajax_value_column', 'pdfCert_value_column' );

    function pdfCert_delete_certificate(){
        global $wpdb;
        $certificate_id = $_POST['value'];
        // $sql = "DELETE FROM $table_name WHERE id_certificate=%d";
        
        $table_name = $wpdb->prefix . 'certificate_content'; 
        $wpdb->delete( $table_name, array( 'id_certificate' => $certificate_id ), array( '%d' ) );
        // $wpdb->query($wpdb->prepare($sql, $certificate_id));
        
        $table_name = $wpdb->prefix . 'certificate_validate'; 
        $wpdb->delete( $table_name, array( 'id_certificate' => $certificate_id ), array( '%d' ) );
        // $wpdb->query($wpdb->prepare($sql, $certificate_id));

        $table_name = $wpdb->prefix . 'certificate'; 
        $wpdb->delete( $table_name, array( 'id_certificate' => $certificate_id ), array( '%d' ) );
        // $wpdb->query($wpdb->prepare($sql, $certificate_id));

        wp_send_json_success( "true" );
    }

    add_action( 'wp_ajax_delete_certificate', 'pdfCert_delete_certificate');

    function pdfCert_edit_Certificate(){
        global $wpdb;
        $certificate_id = $_POST['value'];
        // wp_send_json_success($certificate_id);

        $table_name = $wpdb->prefix . 'certificate'; 
        $sql = "SELECT title FROM $table_name WHERE id_certificate=%d";
        $certificate_name_result = $wpdb->get_results($wpdb->prepare($sql, $certificate_id));
        // wp_send_json_success($certificate_content_result[0]);
        $certificate_name= array();
        foreach($certificate_name_result as $data){
            array_push($certificate_name, $data);
        }

        $table_name = $wpdb->prefix . 'certificate_content'; 
        $sql = "SELECT *FROM $table_name WHERE id_certificate=%d";
        $certificate_content_result = $wpdb->get_results($wpdb->prepare($sql, $certificate_id));
        // wp_send_json_success($certificate_content_result[0]);
        $certificate_content = array();
        foreach($certificate_content_result as $data){
            array_push($certificate_content, $data);
        }

        $table_name = $wpdb->prefix . 'certificate_user_enable'; 
        $sql = "SELECT id_user FROM $table_name WHERE id_certificate=%d";
        $certificate_user_enable_result = $wpdb->get_results($wpdb->prepare($sql, $certificate_id));
        // wp_send_json_success($certificate_content_result[0]);
        $certificate_user_enable = array();
        foreach($certificate_user_enable_result as $data){
            array_push($certificate_user_enable, $data);
        }

        $certificate_data = array($certificate_name, $certificate_user_enable, $certificate_content);

        wp_send_json_success($certificate_data);

    }

    add_action('wp_ajax_edit_certificate','pdfCert_edit_Certificate');

    ?>