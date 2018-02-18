$(document).ready( ($)=>{
    $('body').on('click', 'tr td .edit-certificate', (event)=>{
        let certrificateRow = $('tr' + '.' + event.currentTarget.classList[1]);
        let certificateRowId = $('tr' + '.' + event.currentTarget.classList[1] + ' td:first-child');
        window.location = "http://localhost/luz/wp-admin/admin.php?page=new_certificate&id=" + certificateRowId[0].textContent;
    });
});