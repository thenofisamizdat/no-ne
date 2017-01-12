function navButtons(){
    $('.navNewNote').live('click', function(){
        addToHistory(false);
        loadNoteCreateSection();
    });
    $('.navMenuSubTitle').live('click', function(){
        if ($(this).html() == "notes") {
            addToHistory(false);
            loadNoteDisplaySection();
        }
    })
};

function loadNoteCreateSection(){
    $('.actionArea').hide();
    $('.noteCreation').show();
    resetNoteState();
    screenState = "createNote";
}

function loadNoteDisplaySection(){
    console.log("view notes")
    
    screenState = "displayNotes";
    $('.actionArea').hide();
    $('.notesActionArea').show();
    displayAllNotes();
    
}