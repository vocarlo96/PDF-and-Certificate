jQuery(document).ready( ($)=>{

    // let image = $('#certificate-image');

    
    $('body').on('click','.add-certificate-image', (event)=>{
        let mediaPopUp = wp.media({
            title: 'Seleccione una imagen',
            button: {
                text: 'Usar esta imagen'
            },
            multiple: false 
        });
        console.log(event.currentTarget);
        let actual = event.currentTarget.nextElementSibling.nextElementSibling;
        if(mediaPopUp){
            mediaPopUp.open();
        }

        mediaPopUp.on('select', ()=>{
            let attachment = mediaPopUp.state().get('selection').first().toJSON();
            console.log(attachment.url);
            console.log(event.currentTarget.nextElementSibling.nextElementSibling);
            $(actual).show();
            $(actual).attr('src', attachment.url);
            $(actual.nextElementSibling).attr('value', JSON.stringify( [{url: attachment.url}] ));
            console.log( $(actual) );
        });
        
        $('.delete-certificate-image').click((event)=>{
            $(event.currentTarget.nextElementSibling).attr('src', '');
            $(event.currentTarget.nextElementSibling).hide();
        });
        
    });
    
    
});