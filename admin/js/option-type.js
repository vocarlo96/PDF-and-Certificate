jQuery(document).ready( ($)=>{

    $('.option-type').change( (event)=>{
        console.log(this);
        console.log(event);
        let optionType = $(event.currentTarget);
        // let optionType = $(this);
        let optionTypeValue = optionType.val();
        console.log(optionType);

        switch(optionTypeValue){
            case "Custom text":
                optionType.nextAll().remove();
                let optionTextHtml = '<label for="text">Texto</label><input type="text" name="text" id="custom-text">';
                optionType.after( optionTextHtml );
                break;

            case "database":
                optionType.nextAll().remove();
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
                                    optionHtml += '<option value="' + element + '">' + element + '</option>';
                                });
                                optionHtml += '</select>';
                                optionHtml += '<label for="column">Column</label> <select name="column" class="option-column"> <option value="-" class="column-option">-</option> </select>';
                                // console.log("database siiiiii");
                                optionType.after( optionHtml );
                                break;
            
                            case "image":
                                console.log("image");
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
                let dimensionHtml = '<div><h5>Dimension</h5><label for="width">Width</label><input type="number" name="width" id="width-dimension"> <label for="height">height</label><input type="number" name="height" id="height-dimension"></div> ';
                $('#options-wrap').after( dimensionHtml );
                break;
        }


        

    });

});