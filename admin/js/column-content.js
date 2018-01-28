jQuery(document).ready(function($) {
    var pageTitle = $('div h1');
    $( 'body' ).on('change', 'select#option-table', function( event ) {
        // console.log(tableOption.value);
        console.log( event.currentTarget.value );
        let tableValue = event.currentTarget.value;
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