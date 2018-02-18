jQuery(document).ready( ($)=>{
    
    $('body').on('change', '.option-column', function( event, data ){
        event.preventDefault();
        // console.log(event.currentTarget.previousElementSibling.previousElementSibling.value);

        let valueColumnData = {
            action: 'value_column',
            valueTable: event.currentTarget.previousElementSibling.previousElementSibling.value,
            valueColumn: event.currentTarget.value
        };

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            dataType: 'json',
            data: valueColumnData,
            success: function(response){
                $(event.currentTarget).nextAll().remove();
                console.log(response);
                let columnValue = '<label for="column-value">valor</label> <select name="column-value" id="column-value"> <option value="-">-</option>';
                response.data.forEach(element => {
                    if( data == element ){
                        columnValue += '<option value="' + element + '" selected>' + element + '</option>'

                    }else{
                        columnValue += '<option value="' + element + '">' + element + '</option>'

                    }
                });
                columnValue += '</select>';
                $(event.currentTarget).after(columnValue);
            },
            error: function(error){
                console.log(error);
            }
        });


    })

});