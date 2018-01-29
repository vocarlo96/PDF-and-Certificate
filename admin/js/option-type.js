jQuery(document).ready( ($)=>{

    $('#option-type').change( ()=>{
        let optionType = $('#option-type');
        let optionTypeValue = optionType.val();
        console.log(optionType);

        switch(optionTypeValue){
            case "Custom text":
                optionType.nextAll().remove();
                let optionHtml = '<label for="text">Texto</label><input type="text" name="text" id="custom-text">';
                optionType.after( optionHtml );
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
                                optionHtml += '<label for="column">Column</label> <select name="column" id="option-column"> <option value="-" class="column-option">-</option> </select>';
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
                break;
        }


        

    });

});