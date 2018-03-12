jQuery(document).ready( ($)=>{

    $('body').on( 'click', '#validate-certificate' , function(event){
        console.log(event);
        let validateId = event.target.previousElementSibling.value;
        console.log(validateId);
        let validateCertificateData = {
            action: 'validate_certificate',
            value: validateId
        };

        $.ajax({
            url: ajax_object.ajax_url,
            type: 'POST',
            dataType: 'json',
            data:validateCertificateData,
            success: function(response){
                console.log(response.data);
                let validateHtml = '<div class="certificate-aditional-info-modal"><i class="modal-close">X</i><h3>Informacion del certificado</h3><h4>Nombre: '+ response.data[0] +'</h4><h4>Curso: '+ response.data[1] +'</h4><h4>Estado: aprovado</h4></div>';
                $(event.target).after(validateHtml);
            },
            error: function(error){
                console.log(error);
            }
        });

    });

    $('body').on( 'click', '.modal-close' , function(event){
        $('.certificate-aditional-info-modal').remove();
    });

} );