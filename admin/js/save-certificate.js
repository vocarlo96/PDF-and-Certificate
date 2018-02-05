jQuery(document).ready(($) => {

    $('.save-certificate').click(() => {

        var certificateHtmlData = $('.certificate-data');

        console.log(certificateHtmlData);
        console.log(certificateHtmlData[0].children[0].children);
        console.log(certificateHtmlData[0].children[0].children["certificate-title"].value);

        var certificateChildrenData = Array.from(certificateHtmlData[0].children[1].children);

        var certificateJsonData = {
            action : 'save_certificate',
            certificateTitle : certificateHtmlData[0].children[0].children["certificate-title"].value,
            certificateConfigurationData: new Array(),
            certificateData : new Array(),
            security: save_comprobation.security
        }
        
        let certificateConfiguration = $('.certificate-configuration-data');
        if (certificateConfiguration[0].children[1].children["check-approved"].checked){
            certificateJsonData.certificateConfigurationData.push({
                certificateDirection: certificateConfiguration[0].children[0].children["certificate-direction"].checked,
                checkApproved: certificateConfiguration[0].children[1].children["check-approved"].checked,
                checkApprovedrange: certificateConfiguration[0].children[1].children["check-approved-range"].value,
                optionTable: certificateConfiguration[0].children[2].children["option-table"].value,
                column: certificateConfiguration[0].children[2].children["column"].value,
                columValue: certificateConfiguration[0].children[2].children["column-value"].value
            });
        }
        // console.log(certificateConfiguration[0].children[0].children["certificate-direction"].checked);
        // console.log(certificateConfiguration[0].children[1].children["check-approved"].checked);
        // console.log(certificateConfiguration[0].children[1].children["check-approved-range"].value);
        // console.log(certificateConfiguration[0].children[2].children["option-table"].value);
        // console.log(certificateConfiguration[0].children[2].children["column"].value);
        // console.log(certificateConfiguration[0].children[2].children["column-value"].value);

        certificateChildrenData.forEach(element => {

            switch(element.children[0].children["type"].value){
                // Eliminar las dimensiones en los campos de texto puesto a aque estos son innecesarios aca 

                case "Custom text":
                    certificateJsonData.certificateData.push({
                        optionType: element.children[0].children["type"].value,
                        customText: element.children[0].children["custom-text"].value,
                        // widthDimension: element.children[1].children["width-dimension"].value,
                        // heightDimension: element.children[1].children["height-dimension"].value,
                        xPosition: element.children[1].children["x-position"].value,
                        yPosition: element.children[1].children["y-position"].value
                    });
                    break;

                case "database":
                    certificateJsonData.certificateData.push({
                        optionType: element.children[0].children["type"].value,
                        optionTable: element.children[0].children["option-table"].value,
                        optionColumn: element.children[0].children["column"].value,
                        optionValue: element.children[0].children["column-value"].value,
                        // widthDimension: element.children[1].children["width-dimension"].value,
                        // heightDimension: element.children[1].children["height-dimension"].value,
                        xPosition: element.children[1].children["x-position"].value,
                        yPosition: element.children[1].children["y-position"].value
                    });
                    break;

                case "image":
                    let urlImagePreview = JSON.parse(element.children[0].children["certificate-image-data"].value.toString());
                    certificateJsonData.certificateData.push({
                        optionType: element.children[0].children["type"].value,
                        imageUrl: urlImagePreview[0].url.toString(),
                        widthDimension: element.children[1].children["width-dimension"].value,
                        heightDimension: element.children[1].children["height-dimension"].value,
                        xPosition: element.children[2].children["x-position"].value,
                        yPosition: element.children[2].children["y-position"].value
                    });
                    break;

            }

            console.log(element.children[0].children["type"].value);
            // console.log(element.children[0].children["option-table"].value);
            // console.log(element.children[0].children["option-column"].value);
            // console.log(element.children[1].children["width-dimension"].value);
            // console.log(element.children[1].children["height-dimension"].value);
            // console.log(element.children[2].children["x-position"].value);
            // console.log(element.children[2].children["y-position"].value);
            // console.log(certificateJsonData);
            // console.log(JSON.stringify(certificateJsonData));
        });

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            dataType: 'json',
            data : certificateJsonData,
            success : function(response){
                console.log("bien");
            },
            error: function(error){
                console.log("mal");
            }
        });

    });

});