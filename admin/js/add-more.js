jQuery(document).ready( ($) => {

    $('#add-more').click( () => {
        $( '#certificate-single-content' ).clone(true).appendTo( '.certificate-content-wrap' );
    } );

});