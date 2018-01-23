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
            certificateData : new Array(),
            security: save_comprobation.security
        }

        certificateChildrenData.forEach(element => {
            certificateJsonData.certificateData.push({
                optionType: element.children[0].children["option-type"].value,
                optionTable: element.children[0].children["option-table"].value,
                optionColumn: element.children[0].children["option-column"].value,
                widthDimension: element.children[1].children["width-dimension"].value,
                heightDimension: element.children[1].children["height-dimension"].value,
                xPosition: element.children[2].children["x-position"].value,
                yPosition: element.children[2].children["y-position"].value
            });
            console.log(element.children[0].children["option-type"].value);
            console.log(element.children[0].children["option-table"].value);
            console.log(element.children[0].children["option-column"].value);
            console.log(element.children[1].children["width-dimension"].value);
            console.log(element.children[1].children["height-dimension"].value);
            console.log(element.children[2].children["x-position"].value);
            console.log(element.children[2].children["y-position"].value);
            console.log(certificateJsonData);
            console.log(JSON.stringify(certificateJsonData));
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