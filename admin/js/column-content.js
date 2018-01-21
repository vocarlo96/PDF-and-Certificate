jQuery(document).ready(function($) {
    var tableOption = $('.option-table'); 
    var pageTitle = $('div h1');

    $( ".option-table" ).change(function() {
        console.log("algo");
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'get_colunm_value',
                value: tableOption.value,
                security: column_comprobation.security
            },
            success: function( response ) {
                if( true === response.success ) {
                    pageTitle.after( '<div id="message" class="updated"><p>' + column_comprobation.success + '</p></div>' );
                } else {
                    pageTitle.after( '<div id="message" class="error"><p>' + column_comprobation.failure + '1</p></div>' );
                }
                
                
            },
            error: function( error ) {
                pageTitle.after( '<div id="message" class="error"><p>' + column_comprobation.failure + '2</p></div>' );
            }
        });
    });
});