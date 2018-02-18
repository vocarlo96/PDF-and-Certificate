jQuery(document).ready( ($) => {
    
    $('#add-more').click( () => {
        let num = $('.certificate-content-wrap')[0].children.length;
        console.log($('.certificate-content-wrap')[0]);
        
        addMoreHtml = '<div class="certificate-single-content content-certificate-' + num + '">' +
                            '<div id="options-wrap">'+
                                '<label for="type">Type</label>'+
                                '<select name="type" class="option-type content-certificate-' + num + '">'+
                                    '<option value="-" selected="true">-</option>'+
                                    '<option value="Custom text">Custom text</option>'+
                                    '<option value="database">Database field</option>'+
                                    '<option value="image">Image</option>'+
                                    '<option value="userInfo">UserInfo</option>'+
                                '</select>'+
                            '</div>'+
                            '<div>'+
                                '<h5>Position</h5>'+    
                                '<label for="x">X</label>'+
                                '<input type="number" name="x" id="x-position">'+
                                '<label for="y">Y</label>'+
                                '<input type="number" name="y" id="y-position">'+
                            '</div>'+
                        '</div>';

        $( '.certificate-content-wrap' ).append(addMoreHtml);
    } );

});