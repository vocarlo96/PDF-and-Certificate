$(document).ready( ($)=>{
    $('body').on('click', 'tr td .edit-certificate', (event)=>{
        console.log("Se esta editando el codigo");

        let certrificateRow = $('tr' + '.' + event.currentTarget.classList[1]);
        let certificateRowId = $('tr' + '.' + event.currentTarget.classList[1] + ' td:first-child');
        
        let certificateRowData = {
            action: 'edit_certificate',
            value: parseInt(certificateRowId[0].textContent)
        }

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            dataType: 'json',
            data: certificateRowData,
            success: (response)=>{
                console.log(response);
            },
            error: (error)=>{
                console.log(error);
            }

        });
    });
});