jQuery(document).ready(function($) {
    var pageTitle = $('div h1');
    $( 'body' ).on('change', 'select#option-table', function( event, data , data2) {
        event.preventDefault();
        // console.log(tableOption.value);
        // console.log( event.currentTarget.nextElementSibling.nextElementSibling.children[0]);
        let tableValue = event.currentTarget.value;
        // console.log(tableValue);
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'get_colunm_value',
                value: tableValue,
                security: table_comprobation.security
            },
            success: function( response ) {
                $( 'div#message' ).remove();
                $(event.currentTarget).nextAll().remove();
                if( true === response.success ) {
                    console.log(response.data);
                    let columnsOptions = '<label for="column">Column</label> <select name="column" class="option-column"> <option value="-" class="column-option">-</option>';
                    response.data.forEach(element => {
                        if( data == element ){
                            columnsOptions += '<option value="' + element + '" selected>' + element + '</option>'

                        }else{
                            columnsOptions += '<option value="' + element + '">' + element + '</option>'

                        }
                    });
                    columnsOptions += '</select>';
                    // var columsArray = response.data.replace(/(\[|\]|,|\")/g," ").trim().split(/ +/g);
                    // console.log(columsArray);
                    // var columnsOptions = "";
                    // columsArray.forEach(element => {
                    //     columnsOptions += "<option value=" + element + ">" + element + "</option>";
                    // });
                    // console.log('#'+event.currentTarget.id);
                    $(event.currentTarget).after( columnsOptions );
                    if(data){
                        $('.option-column').trigger('change', data2);
                    }
                } else {
                    pageTitle.after( '<div id="message" class="error"><p> 1</p></div>' );
                }
                
                
            },
            error: function( error ) {
                $( 'div#message' ).remove();
                pageTitle.after( '<div id="message" class="error"><p>2</p></div>' );
            }
        });
    });
});