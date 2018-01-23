jQuery(document).ready(($) => {

    $('#certificate-preview').click(() => {
        alert("entrio");

        var dd = {
            content: [
                {
                    text:'esto es un texto demostrativo para el plugin',
                    absolutePosition: {x:100, y:180}
                },
                {
                    image: getBase64Image("http://localhost/luz/wp-content/uploads/2017/11/top_image-ptu-1.jpg")
                },
                {
                    image: getBase64Image("http://localhost/luz/wp-content/uploads/2017/12/envelope4-green.png")
                }
            ]
            
        }

        // pdfMake.createPdf(dd).open();
        // pdfMake.createPdf(dd).download('optionalName.pdf');

        var certificateHtmlData = $('.certificate-data');

        console.log(certificateHtmlData);
        console.log(certificateHtmlData[0].children[0].children);
        console.log(certificateHtmlData[0].children[0].children["certificate-title"].value);

        var certificateChildrenData = Array.from(certificateHtmlData[0].children[1].children);

        var certificateJsonData = {
            // action : 'save_certificate',
            certificateTitle : certificateHtmlData[0].children[0].children["certificate-title"].value,
            security: save_comprobation.security
        }

        certificateChildrenData.forEach(element => {

            console.log(element.children[0].children["option-type"].value);
            console.log(element.children[0].children["option-table"].value);
            console.log(element.children[0].children["option-column"].value);
            console.log(element.children[1].children["width-dimension"].value);
            console.log(element.children[1].children["height-dimension"].value);
            console.log(element.children[2].children["x-position"].value);
            console.log(element.children[2].children["y-position"].value);
            // console.log(certificateJsonData);

            switch(element.children[0].children["option-type"].value){

                case "Custom text":
                    console.log("text");
                    break;

                case "database":
                    console.log("database");
                    let content_database = {
                        text: element.children[0].children["option-column"].value.toString(),
                        absolutePosition:{
                            x : parseInt(element.children[2].children["x-position"].value),
                            y : parseInt(element.children[2].children["y-position"].value)
                        }
                    };
                    dd.content.push(content_database);
                    console.log(dd.content);
                    break;

                case "image":
                    console.log("image");
                    break;
            }
        });
        console.log(dd.content);
        pdfMake.createPdf(dd).download(certificateJsonData.certificateTitle.toString() + '.pdf');

        // $.ajax({
        //     url: ajaxurl,
        //     type: 'POST',
        //     dataType: 'json',
        //     data : certificateJsonData,
        //     success : function(response){
        //         console.log("bien");
        //     },
        //     error: function(error){
        //         console.log("mal");
        //     }
        // });

    });

    function getBase64Image(uri) {
        // Create an empty canvas element
        var img = new Image();
        img.src = uri;
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
    
        // Copy the image contents to the canvas
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
    
        // Get the data-URL formatted image
        // Firefox supports PNG and JPEG. You could check img.src to
        // guess the original format, but be aware the using "image/jpg"
        // will re-encode the image.
        if( uri.indexOf(".png") ){
            var dataURL = canvas.toDataURL("image/png");
        }else if( uri.indexOf(".jpg") ){
            var dataURL = canvas.toDataURL("image/jpg");
        }

        return dataURL;
    }

});