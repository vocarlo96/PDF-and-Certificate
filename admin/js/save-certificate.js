jQuery(document).ready(($) => {

    $('.save-certificate').click(() => {

        var certificateHtmlData = $('.certificate-data');

        // console.log(certificateHtmlData);
        // console.log(certificateHtmlData[0].children[0].children);
        // console.log(certificateHtmlData[0].children[0].children["certificate-title"].value);

        var certificateChildrenData = Array.from(certificateHtmlData[0].children[1].children);

        var certificateJsonData = {
            action : 'save_certificate',
            certificateTitle : certificateHtmlData[0].children[0].children["certificate-title"].value,
            certificateUserEnableData: new Array(),
            certificateData : new Array(),
            certificateState : '',
            security: save_comprobation.security
        }

        let url = new URL(window.location.href);
        let id = url.searchParams.get("id");

        if(id){
            certificateJsonData.certificateState = 'true';
        }
        
        let certificateUserEnable = Array.from($('.certificate-user-enable table tbody tr td'));
        for( let i = 2; i < certificateUserEnable.length; i += 3){
            if (certificateUserEnable[i].children[0].checked){
                certificateJsonData.certificateUserEnableData.push({
                    userId: certificateUserEnable[i-2].textContent
                });
            }
        };


        // console.log(certificateUserEnable);
        console.log(certificateHtmlData[0].children[1].children);

        certificateChildrenData.forEach(element => {

            switch(element.children[1].children["type"].value){
                // Eliminar las dimensiones en los campos de texto puesto a aque estos son innecesarios aca 

                case "Custom text":
                    certificateJsonData.certificateData.push({
                        optionType: element.children[1].children["type"].value,
                        customText: element.children[1].children["custom-text"].value,
                        xPosition: element.children[2].children["x-position"].value,
                        yPosition: element.children[2].children["y-position"].value
                    });
                    break;

                case "database":
                    certificateJsonData.certificateData.push({
                        optionType: element.children[1].children["type"].value,
                        optionTable: element.children[1].children["option-table"].value,
                        optionColumn: element.children[1].children["column"].value,
                        optionValue: element.children[1].children["column-value"].value,
                        xPosition: element.children[2].children["x-position"].value,
                        yPosition: element.children[2].children["y-position"].value
                    });
                    break;

                case "image":
                     console.log(element.children[1].children["certificate-image-data"].value.toString());
                    //  let urlImagePreview
                    //  if(id){
                    //     urlImagePreview = [{
                    //         url: element.children[1].children["certificate-image-data"].value.toString()
                    //     }];
                    //  }else{
                    //      urlImagePreview = JSON.parse(element.children[1].children["certificate-image-data"].value.toString());
                    //  }
                     
                    certificateJsonData.certificateData.push({
                        optionType: element.children[1].children["type"].value,
                        // imageUrl: urlImagePreview[0].url.toString(),
                        imageUrl: element.children[1].children["certificate-image"].src.toString(),
                        widthDimension: element.children[2].children["width-dimension"].value,
                        heightDimension: element.children[2].children["height-dimension"].value,
                        xPosition: element.children[3].children["x-position"].value,
                        yPosition: element.children[3].children["y-position"].value
                    });
                    break;

                case "userInfo":
                    certificateJsonData.certificateData.push({
                        optionType: element.children[1].children["type"].value,
                        optionValue: element.children[1].children["user-info"].value,
                        xPosition: element.children[2].children["x-position"].value,
                        yPosition: element.children[2].children["y-position"].value
                    });
                    break;

                case "certificateInfo":
                    certificateJsonData.certificateData.push({
                        optionType: element.children[1].children["type"].value,
                        optionValue: element.children[1].children["certificate-info"].value,
                        xPosition: element.children[2].children["x-position"].value,
                        yPosition: element.children[2].children["y-position"].value
                    });
                    break;

                case "aditionalInfo":
                    certificateJsonData.certificateData.push({
                        optionType: element.children[1].children["type"].value,
                        optionField: element.children[1].children["aditional-info-field"].value,
                        optionValue: element.children[1].children["aditional-info"].value,
                        xPosition: element.children[2].children["x-position"].value,
                        yPosition: element.children[2].children["y-position"].value
                    });
                    break;

            }
        });

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            dataType: 'json',
            data : certificateJsonData,
            success : function(response){
                // history.go(-1);
                console.log("bien");
            },
            error: function(error){
                console.log("mal");
            }
        });

    });

});