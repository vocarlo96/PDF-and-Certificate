jQuery(document).ready( ($) =>{

    $( 'body' ).on('click', 'button#certificate-request', function(){
        let generateCertificateOption = $( '#generate-certificate-shortcode' ).val();
        console.log( generateCertificateOption);
        
        let aditionalInfoData = {
            action: 'aditional_info_check',
            value: generateCertificateOption
        }

        $.ajax({
            url: ajax_object.ajax_url,
            type: 'POST',
            dataType: 'json',
            data: aditionalInfoData,
            success: function(response){
                console.log(response.data);
                let aditionalInfoModal = '<div class="certificate-aditional-info-modal"><i class="modal-close">X</i><h3>Información adicional</h3><p>Rellenar los siguientes campos, esta info es necesaria para solicitar el certificado</p>';
                response.data.forEach(element => {
                    
                    switch(element[1]){
                        case "text":
                            aditionalInfoModal += '<label>' + element[0] + '</label><input type="text" id="aditionalInfoInput">';
                            break;
                        case "number":
                            aditionalInfoModal += '<label>' + element[0] + '</label><input type="number" id="aditionalInfoInput">';
                            break;
                    };
                });

                aditionalInfoModal += '<button id="aditional-info-send">Enviar</button></div>';
                $('button#certificate-request').after(aditionalInfoModal);

            },
            error: function(err){
                console.log(err);
            }
        });

        $( 'body' ).on('click', 'button#aditional-info-send', function(){
            let certificateAditionalInfoModal = $('.certificate-aditional-info-modal');
            let certificateAditionalInfoData = new Array();
            for(let i = 4; i < certificateAditionalInfoModal[0].children.length; i+=2){
                certificateAditionalInfoData.push(certificateAditionalInfoModal[0].children[i].value);
            }
            console.log(certificateAditionalInfoData);
            generateCertificate(certificateAditionalInfoData);
        });
        
        function generateCertificate(aditionalInfoData){

                let generateCertificateData = {
                    action: 'generate_certificate',
                    value: generateCertificateOption,
                    aditionalInfo: aditionalInfoData
                }
        
                $.ajax({
                    url: ajax_object.ajax_url,
                    type: 'POST',
                    dataType: 'json',
                    data: generateCertificateData,
                    success: function(response){
                        let certificate = {
                            pageSize: 'letter',
                            pageOrientation: 'landscape',
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
                                    console.log('image');
                                    let contentImage = {
                                        image: getBase64Image(element[5].toString()),
                                        width: parseInt(element[4]),
            		                    height: parseInt(element[3]),
                                        absolutePosition:{
                                            x : parseInt(element[1]),
                                            y : parseInt(element[2])
                                        }
                                    };
                                    certificate.content.push(contentImage);
                                    console.log(certificate.content);
                                    break;
        
                                case "userInfo":
                                    console.log('user info');
                                    let contentUserInfo = {
                                        text: element[3].toString(),
                                        absolutePosition:{
                                            x : parseInt(element[1]),
                                            y : parseInt(element[2])
                                        }
                                    };
                                    certificate.content.push(contentUserInfo);
                                    console.log(certificate.content);
                                    break;
        
                                case "certificateInfo":
                                    console.log('certificate info');
                                    let contentCertificateInfo = {
                                        text: element[3].toString(),
                                        absolutePosition:{
                                            x : parseInt(element[1]),
                                            y : parseInt(element[2])
                                        }
                                    };
                                    certificate.content.push(contentCertificateInfo);
                                    console.log(certificate.content);
                                    break;

                                case "aditionalInfo":
                                    console.log('aditional info');
                                    let contentAditionalInfo = {
                                        text: element[3].toString(),
                                        absolutePosition:{
                                            x : parseInt(element[1]),
                                            y : parseInt(element[2])
                                        }
                                    };
                                    certificate.content.push(contentAditionalInfo);
                                    console.log(certificate.content);
                                    break;
                            }
                        });
                        pdfMake.createPdf(certificate).download('certificate.pdf');
                    },
                    error: function(error){
                        console.log(error);
                    }
                });
        }
    });

    function getBase64Image(uri) {
        // Create an empty canvas element
        console.log(uri);
        let img = new Image();
        img.src = uri;
        console.log(img.src)
        let canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
    
        // Copy the image contents to the canvas
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
    
        // Get the data-URL formatted image
        // Firefox supports PNG and JPEG. You could check img.src to
        // guess the original format, but be aware the using "image/jpg"
        // will re-encode the image.
        let dataURL;
        if( uri.indexOf(".png") ){
            dataURL = canvas.toDataURL("image/png");
            console.log(dataURL);
        }else if( uri.indexOf(".jpg") ){
            dataURL = canvas.toDataURL("image/jpg");
            console.log(dataURL);

        }

        return dataURL;
    }

});