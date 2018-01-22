jQuery(document).ready(function($) {
    var tableOption = $('.option-table'); 
    var pageTitle = $('div h1');
    $( ".option-table" ).change(function() {
        // console.log(tableOption.options[tableOption.selectedIndex].value);
        let tableValue = tableOption.val().toString();
        console.log(tableValue);
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'get_colunm_value',
                value: tableValue,
                security: column_comprobation.security
            },
            success: function( response ) {
                $( 'div#message' ).remove();
                if( true === response.success ) {
                    console.log(response.data);
                    var columsArray = response.data.replace(/(\[|\]|,|\")/g," ").trim().split(/ +/g);
                    console.log(columsArray);
                    var columnsOptions = "";
                    columsArray.forEach(element => {
                        columnsOptions += "<option value=" + element + ">" + element + "</option>";
                    });
                    console.log(columnsOptions);
                    $( '#option-column .column-option' ).after( columnsOptions );
                } else {
                    pageTitle.after( '<div id="message" class="error"><p>' + column_comprobation.failure + '1</p></div>' );
                }
                
                
            },
            error: function( error ) {
                $( 'div#message' ).remove();
                pageTitle.after( '<div id="message" class="error"><p>' + column_comprobation.failure + '2</p></div>' );
            }
        });
    });
});