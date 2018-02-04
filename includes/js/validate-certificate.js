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
                let validateHtml = '<h4>Nombre:'+ response.data[0] +'</h4><h4>Curso:'+ response.data[1] +'</h4>';
                $(event.target).after(validateHtml);
            },
            error: function(error){
                console.log(error);
            }
        });

    });

} );