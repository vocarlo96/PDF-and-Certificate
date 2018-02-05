$(document).ready( ($)=>{
    $('body').on('click', 'tr td .delete-certificate', (event)=>{
        let certrificateRow = $('tr' + '.' + event.currentTarget.classList[1]);
        let certificateRowId = $('tr' + '.' + event.currentTarget.classList[1] + ' td:first-child');
        
        let certificateRowData = {
            action: 'delete_certificate',
            value: parseInt(certificateRowId[0].textContent)
        }

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            dataType: 'json',
            data: certificateRowData,
            success: (response)=>{
                if(response.data){
                    certrificateRow.remove();
                }
            },
            error: (error)=>{
                console.log(error);
            }

        });
    });
});