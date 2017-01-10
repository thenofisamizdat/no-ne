var masterSearchTerm = "";

function masterSearchListener(){
    $('.masterSearch').live('keyup', function(e){
        if (e.keyCode == 13){
            masterSearchTerm = $('.masterSearch').val();
            searchForString(masterSearchTerm);    
        }
    });
}