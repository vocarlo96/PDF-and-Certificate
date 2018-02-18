jQuery(document).ready( ($)=>{

    // $('.option-type').change( (event)=>{
        $('body').on('change', '.option-type', (event, data, data2, data3)=>{
            event.preventDefault();

        let optionType = $(event.currentTarget);

        let optionTypeValue = optionType.val();
        console.log(optionTypeValue+"  algo");

        // if(option){
        //     optionTypeValue = option;
        // }

        // console.log(optionTypeValue);

        switch(optionTypeValue){
            case "Custom text":
            
                optionType.nextAll().remove();
                $('.certificate-single-content' + '.' + event.currentTarget.classList[1] + ' .image-certificate-dimension').remove();
                let optionTextHtml = '<label for="text">Texto</label><input type="text" name="text" id="custom-text">';
                optionType.after( optionTextHtml );
                break;

            case "database":
                optionType.nextAll().remove();
                $('.certificate-single-content' + '.' + event.currentTarget.classList[1] + ' .image-certificate-dimension').remove();
                let optionTypeData = {
                    action : 'option_type',
                    value : optionTypeValue,
                    // security:
                };
        
                $.ajax({
                    url: ajaxurl,
                    type: 'POST',
                    dataType: 'json',
                    data: optionTypeData,
                    success : function(response){
                        let optionTypeResponse = JSON.parse(response.data);
                        switch(optionTypeResponse[0]){
            
                            case "database":
                                let optionHtml = '<label for="table">Table</label> <select name="table" id="option-table"> <option value="-">-</option>';
                                optionTypeResponse.shift();
                                optionTypeResponse.forEach(element => {
                                    if(data == element){
                                        optionHtml += '<option value="' + element + '" selected>' + element + '</option>';
                                    }else{
                                        optionHtml += '<option value="' + element + '">' + element + '</option>';

                                    }
                                });
                                optionHtml += '</select>';
                                optionType.after( optionHtml );
                                if(data){
                                    $('select#option-table').trigger('change', [data2, data3]);
                                }
                                break;
            
                        }
                    },
                    error : function(error){
                        console.log(error);
                    }
                });
                break;
                
            case "image":
                optionType.nextAll().remove();
                let optionImageHtml = '<button class="add-certificate-image">Seleccionar imagen</button><button class="delete-certificate-image">Borrar imagen</button><img id="certificate-image" src=""/><input id="certificate-image-data" type="hidden">';
                optionType.after( optionImageHtml );
                let dimensionHtml = '<div class="image-certificate-dimension"><h5>Dimension</h5><label for="width">Width</label><input type="number" name="width" id="width-dimension"> <label for="height">height</label><input type="number" name="height" id="height-dimension"></div> ';
                $('.certificate-single-content' + '.' + event.currentTarget.classList[1] + ' #options-wrap').after( dimensionHtml );
                break;

            case "userInfo":
                optionType.nextAll().remove();
                $('.certificate-single-content' + '.' + event.currentTarget.classList[1] + ' .image-certificate-dimension').remove();
                let optionUserInfoHtml = '<select name="user-info" id="user-info">' +
                                        '<option value="-"> - </option>';
                let userInfoValues =  ['ID', 'display_name', 'user_firstname', 'user_lastname', 'user_email', 'user_login'];
                userInfoValues.forEach(element => {
                    if(data == element){
                        optionUserInfoHtml += '<option value="' + element + '" selected>' + element + '</option>';
                    }else{
                        optionUserInfoHtml += '<option value="' + element + '">' + element + '</option>';

                    }
                });
                optionUserInfoHtml += '</select>';
                optionType.after( optionUserInfoHtml );
                break;

            case "certificateInfo":
                optionType.nextAll().remove();
                $('.certificate-single-content' + '.' + event.currentTarget.classList[1] + ' .image-certificate-dimension').remove();
                let optionCertificateInfoHtml = '<select name="certificate-info" id="certificate-info">' +
                                        '<option value="-"> - </option>';
                let CertificateInfoValues =  ['ID', 'title'];
                CertificateInfoValues.forEach(element => {
                    if(data == element){
                        optionCertificateInfoHtml += '<option value="' + element + '" selected>' + element + '</option>';
                    }else{
                        optionCertificateInfoHtml += '<option value="' + element + '">' + element + '</option>';

                    }
                });
                optionCertificateInfoHtml += '</select>';
                optionType.after( optionCertificateInfoHtml );
                break;
        }


        

    });

});