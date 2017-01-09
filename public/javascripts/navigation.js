function navButtons(){
    $('.navNewNote').live('click', function(){
        $('.actionArea').hide();
        $('.noteCreation').show();
        addToHistory(false);
        resetNoteState();
        screenState = "createNote";
    });
    $('.navMenuSubTitle').live('click', function(){
        if ($(this).html() == "notes") loadNoteDisplaySection();
    })
};

function loadNoteDisplaySection(){
    console.log("view notes")
    addToHistory(false);
    screenState = "displayNotes";
    $('.actionArea').hide();
    $('.noteDisplayArea').show();
    displayAllNotes();
    
}