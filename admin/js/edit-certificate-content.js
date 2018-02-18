$(document).ready( ($)=>{
        console.log("Se esta editando el codigo siiiiiiiiiiiiiiiii");

        let url = new URL(window.location.href);
        let id = url.searchParams.get("id");
        console.log(id)


        let certificateRowData = {
            action: 'edit_certificate',
            value: parseInt(id)
        }

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            dataType: 'json',
            data: certificateRowData,
            success: (response)=>{
                console.log(response.data);

                response.data[0].forEach(element => {
                    let certificateTitle = $('#certificate-title');
                    certificateTitle.attr('value', element.title);
                });

                response.data[1].forEach(element => {
                    let certificateUserEnable = Array.from($('.certificate-user-enable table tbody tr td'));
                    for( let i = 0; i < certificateUserEnable.length; i += 3){
                        if (certificateUserEnable[i].textContent == element.id_user){
                            userId: certificateUserEnable[i+2].children[0].click();
                        }
                        
                    };
                });

                response.data[2].forEach(element => {
                    switch(element.type_content){
                        
                        case "Custom text":
                            console.log("custom text");
                            let numText = $('.certificate-content-wrap')[0].children.length;
                            // console.log($('.certificate-content-wrap')[0]);
                                console.log(element.custom_text);
                            let addMoreTextHtml = '<div class="certificate-single-content content-certificate-' + numText + '">' +
                                                '<div id="options-wrap">'+
                                                    '<label for="type">Type</label>'+
                                                    '<select name="type" class="option-type content-certificate-' + numText + '">'+
                                                        '<option value="-">-</option>';

                                                        switch(element.type_content){
                                                            case "Custom text":
                                                                addMoreTextHtml += '<option value="Custom text" selected="true">Custom text</option>'+
                                                                                '<option value="database">Database field</option>'+
                                                                                '<option value="image">Image</option>';
                                                                break;
                                                            case "database":
                                                                addMoreTextHtml += '<option value="Custom text">Custom text</option>'+
                                                                                '<option value="database" selected="true">Database field</option>'+
                                                                                '<option value="image">Image</option>';
                                                                break;
                                                            case "image":
                                                                addMoreTextHtml += '<option value="Custom text">Custom text</option>'+
                                                                                '<option value="database">Database field</option>'+
                                                                                '<option value="image" selected="true">Image</option>';
                                                                break;
                                                            case "userInfo":
                                                                addMoreTextHtml += '<option value="Custom text">Custom text</option>'+
                                                                                '<option value="database">Database field</option>'+
                                                                                '<option value="image">Image</option>';
                                                                                '<option value="userInfo">UserInfo</option>';
                                                                break;
                                                        }

                                                    addMoreTextHtml += '</select>'+
                                                    '<label for="text">Texto</label>'+
                                                    '<input name="text" id="custom-text" type="text" value="' + element.custom_text + '">'+
                                                '</div>'+
                                                '<div>'+
                                                    '<h5>Position</h5>'+    
                                                    '<label for="x">X</label>'+
                                                    '<input type="number" name="x" id="x-position" value="' + element.x_position + '">'+
                                                    '<label for="y">Y</label>'+
                                                    '<input type="number" name="y" id="y-position" value="' + element.y_position + '">'+
                                                '</div>'+
                                            '</div>';

                            $( '.certificate-content-wrap' ).append(addMoreTextHtml);
                            break;
                            
                        case "database":
                            console.log("database");
                            let numDatabase = $('.certificate-content-wrap')[0].children.length;
                            // console.log($('.certificate-content-wrap')[0]);
                            let addMoreDatabaseHtml = '<div class="certificate-single-content content-certificate-' + numDatabase + '">' +
                                                '<div id="options-wrap">'+
                                                    '<label for="type">Type</label>'+
                                                    '<select name="type" class="option-type content-certificate-' + numDatabase + '">'+
                                                        '<option value="-">-</option>';

                                                        switch(element.type_content){
                                                            case "Custom text":
                                                                addMoreDatabaseHtml += '<option value="Custom text" selected>Custom text</option>'+
                                                                                '<option value="database">Database field</option>'+
                                                                                '<option value="image">Image</option>';
                                                                break;
                                                            case "database":
                                                                addMoreDatabaseHtml += '<option value="Custom text">Custom text</option>'+
                                                                                '<option value="database" selected>Database field</option>'+
                                                                                '<option value="image">Image</option>';
                                                                break;
                                                            case "image":
                                                                addMoreDatabaseHtml += '<option value="Custom text">Custom text</option>'+
                                                                                '<option value="database">Database field</option>'+
                                                                                '<option value="image" selected>Image</option>';
                                                                break;
                                                            case "userInfo":
                                                                addMoreTextHtml += '<option value="Custom text">Custom text</option>'+
                                                                                '<option value="database">Database field</option>'+
                                                                                '<option value="image">Image</option>';
                                                                                '<option value="userInfo">UserInfo</option>';
                                                                break;
                                                        }

                                                    addMoreDatabaseHtml +='</select>'+
                                                '</div>'+
                                                '<div>'+
                                                    '<h5>Position</h5>'+    
                                                    '<label for="x">X</label>'+
                                                    '<input type="number" name="x" id="x-position" value="' + element.x_position + '">'+
                                                    '<label for="y">Y</label>'+
                                                    '<input type="number" name="y" id="y-position" value="' + element.y_position + '">'+
                                                '</div>'+
                                            '</div>';

                            $( '.certificate-content-wrap' ).append(addMoreDatabaseHtml);
                            $('.option-type.content-certificate-' + numDatabase).trigger('change', [element.table_content, element.column_content, element.data_value, "database"]);
                           
                            break;
                            
                        case "image":
                            console.log("image");
                            let numImage = $('.certificate-content-wrap')[0].children.length;
                            // console.log($('.certificate-content-wrap')[0]);
                            let addMoreImageHtml = '<div class="certificate-single-content content-certificate-' + numImage + '">' +
                                                '<div id="options-wrap">'+
                                                    '<label for="type">Type</label>'+
                                                    '<select name="type" class="option-type content-certificate-' + numImage + '">'+
                                                        '<option value="-">-</option>';

                                                        switch(element.type_content){
                                                            case "Custom text":
                                                                addMoreImageHtml += '<option value="Custom text" selected="true">Custom text</option>'+
                                                                                '<option value="database">Database field</option>'+
                                                                                '<option value="image">Image</option>';
                                                                break;
                                                            case "database":
                                                                addMoreImageHtml += '<option value="Custom text">Custom text</option>'+
                                                                                '<option value="database" selected="true">Database field</option>'+
                                                                                '<option value="image">Image</option>';
                                                                break;
                                                            case "image":
                                                                addMoreImageHtml += '<option value="Custom text">Custom text</option>'+
                                                                                '<option value="database">Database field</option>'+
                                                                                '<option value="image" selected="true">Image</option>';
                                                                break;
                                                            case "userInfo":
                                                                addMoreTextHtml += '<option value="Custom text">Custom text</option>'+
                                                                                '<option value="database">Database field</option>'+
                                                                                '<option value="image">Image</option>';
                                                                                '<option value="userInfo">UserInfo</option>';
                                                                break;
                                                        }

                                                    addMoreImageHtml +='</select>'+
                                                    '<button class="add-certificate-image">Seleccionar imagen</button>'+
                                                    '<button class="delete-certificate-image">Borrar imagen</button>'+
                                                    '<img id="certificate-image" src="' + element.data_value + '"/>'+
                                                    '<input id="certificate-image-data" type="hidden">'+
                                                '</div>'+
                                                '<div class="image-certificate-dimension">'+
                                                    '<h5>Dimension</h5>'+
                                                    '<label for="width">Width</label>'+
                                                    '<input type="number" name="width" id="width-dimension" value="' + element.width + '">'+
                                                     '<label for="height">height</label>'+
                                                     '<input type="number" name="height" id="height-dimension" value="' + element.height + '">'+
                                                '</div>'+
                                                '<div>'+
                                                    '<h5>Position</h5>'+    
                                                    '<label for="x">X</label>'+
                                                    '<input type="number" name="x" id="x-position" value="' + element.x_position + '">'+
                                                    '<label for="y">Y</label>'+
                                                    '<input type="number" name="y" id="y-position" value="' + element.y_position + '">'+
                                                '</div>'+
                                            '</div>';

                            $( '.certificate-content-wrap' ).append(addMoreImageHtml);
                            break;

                            case "userInfo":
                            console.log("user info");
                            let numUserInfo = $('.certificate-content-wrap')[0].children.length;
                            // console.log($('.certificate-content-wrap')[0]);
                                // console.log(element.custom_UserInfo);
                            let addMoreUserInfoHtml = '<div class="certificate-single-content content-certificate-' + numUserInfo + '">' +
                                                '<div id="options-wrap">'+
                                                    '<label for="type">Type</label>'+
                                                    '<select name="type" class="option-type content-certificate-' + numUserInfo + '">'+
                                                        '<option value="-">-</option>';

                                                        switch(element.type_content){
                                                            case "Custom text":
                                                                addMoreUserInfoHtml += '<option value="Custom text" selected="true">Custom text</option>'+
                                                                                '<option value="database">Database field</option>'+
                                                                                '<option value="image">Image</option>'+
                                                                                '<option value="userInfo" >UserInfo</option>';
                                                                break;
                                                            case "database":
                                                                addMoreUserInfoHtml += '<option value="Custom text">Custom text</option>'+
                                                                                '<option value="database" selected="true">Database field</option>'+
                                                                                '<option value="image">Image</option>'+
                                                                                '<option value="userInfo" >UserInfo</option>';
                                                                break;
                                                            case "image":
                                                                addMoreUserInfoHtml += '<option value="Custom text">Custom text</option>'+
                                                                                '<option value="database">Database field</option>'+
                                                                                '<option value="image" selected="true">Image</option>'+
                                                                                '<option value="userInfo" >UserInfo</option>';               
                                                                break;
                                                            case "userInfo":
                                                                addMoreUserInfoHtml += '<option value="Custom text">Custom text</option>'+
                                                                                '<option value="database">Database field</option>'+
                                                                                '<option value="image">Image</option>'+
                                                                                '<option value="userInfo" selected="true">UserInfo</option>';
                                                                break;
                                                        }

                                                    addMoreUserInfoHtml += '</select>'+
                                                '</div>'+
                                                '<div>'+
                                                    '<h5>Position</h5>'+    
                                                    '<label for="x">X</label>'+
                                                    '<input type="number" name="x" id="x-position" value="' + element.x_position + '">'+
                                                    '<label for="y">Y</label>'+
                                                    '<input type="number" name="y" id="y-position" value="' + element.y_position + '">'+
                                                '</div>'+
                                            '</div>';                          
                            $( '.certificate-content-wrap' ).append(addMoreUserInfoHtml);
                            $('.option-type.content-certificate-' + numUserInfo).trigger('change', [element.data_value, "userInfo"]);

                            break;
                    }
                });

            },
            error: (error)=>{
                console.log(error);
            }

        });

});