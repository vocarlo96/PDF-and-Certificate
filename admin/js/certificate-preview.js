jQuery(document).ready(($) => {

    $('#certificate-preview').click(() => {
        alert("entrio");

        let image1 = getBase64Image("http://localhost/luz/wp-content/uploads/2017/11/top_image-ptu-1.jpg");
        let image2 = getBase64Image("http://localhost/luz/wp-content/uploads/2017/12/envelope4-green.png");


        var dd = {
            content: [
                // {
                //     text:'esto es un texto demostrativo para el plugin',
                //     absolutePosition: {x:100, y:180}
                // },
                // {
                //     image: image1
                // },
                // {
                //     image: image2
                // }
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
            // security: save_comprobation.security
        }

        certificateChildrenData.forEach(element => {

            console.log(element.children[0].children["type"].value);
            // console.log(element.children[0].children["option-table"].value);
            // console.log(element.children[0].children["option-column"].value);
            // console.log(element.children[1].children["width-dimension"].value);
            // console.log(element.children[1].children["height-dimension"].value);
            // console.log(element.children[2].children["x-position"].value);
            // console.log(element.children[2].children["y-position"].value);
            // console.log(certificateJsonData);

            switch(element.children[0].children["type"].value){

                case "Custom text":
                    console.log("text");
                    let contentCustomText = {
                        text: element.children[0].children["custom-text"].value.toString(),
                        absolutePosition:{
                            x : parseInt(element.children[1].children["x-position"].value),
                            y : parseInt(element.children[1].children["y-position"].value)
                        }
                    };
                    dd.content.push(contentCustomText);
                    console.log(dd.content);
                    break;

                case "database":
                    console.log("database");
                    let contentDatabase = {
                        text: element.children[0].children["column-value"].value.toString(),
                        absolutePosition:{
                            x : parseInt(element.children[1].children["x-position"].value),
                            y : parseInt(element.children[1].children["y-position"].value)
                        }
                    };
                    dd.content.push(contentDatabase);
                    console.log(dd.content);
                    break;

                case "image":
                    console.log("image");
                    // console.log(JSON.parse(element.children[0].children["certificate-image-data"].value.toString()));
                    // console.log(element.children[1].children["width-dimension"]);
                    // console.log(element.children[1].children["height-dimension"]);

                    // console.log(element.children[2].children["x-position"]);
                    // console.log(element.children[2].children["y-position"]);
                    let urlImagePreview = JSON.parse(element.children[0].children["certificate-image-data"].value.toString());
                    let dataUrl = getBase64Image(urlImagePreview[0].url.toString());
                    let contentCustomImage = {
                        image: dataUrl,
                        width: parseInt(element.children[1].children["width-dimension"].value),
			            height: parseInt(element.children[1].children["height-dimension"].value),
                        absolutePosition:{
                            x : parseInt(element.children[2].children["x-position"].value),
                            y : parseInt(element.children[2].children["y-position"].value)
                        }
                    };
                    dd.content.push(contentCustomImage);
                    console.log(dd.content);
                    break;
            }
        });
        console.log(dd.content);
        pdfMake.createPdf(dd).download(certificateJsonData.certificateTitle.toString() + '.pdf');

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