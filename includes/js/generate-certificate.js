jQuery(document).ready( ($) =>{

    $( 'body' ).on('click', 'button#certificate-request', function(){
        let generateCertificateOption = $( '#generate-certificate-shortcode' ).val();
        console.log( generateCertificateOption);
        let generateCertificateData = {
            action: 'generate_certificate',
            value: generateCertificateOption
        }
        $.ajax({
            url: ajax_object.ajax_url,
            type: 'POST',
            dataType: 'json',
            data: generateCertificateData,
            success: function(response){
                let certificate = {
                    content: new Array()
                }
                console.log(response.data);
                response.data.forEach(element => {
                    switch (element[0]){
                        case "Custom text":
                            console.log('text');
                            let contentCustomText = {
                                text: element[3].toString(),
                                absolutePosition:{
                                    x : parseInt(element[1]),
                                    y : parseInt(element[2])
                                }
                            };
                            certificate.content.push(contentCustomText);
                            console.log(certificate.content);
                            break;

                        case "database":
                            console.log('database');
                            let contentDatabase = {
                                text: element[3].toString(),
                                absolutePosition:{
                                    x : parseInt(element[1]),
                                    y : parseInt(element[2])
                                }
                            };
                            certificate.content.push(contentDatabase);
                            console.log(certificate.content);
                            break;

                        case "image":
                            break;
                    }
                });
                pdfMake.createPdf(certificate).download('certificate.pdf');
            },
            error: function(error){
                console.log(error);
            }
        });
    });

});