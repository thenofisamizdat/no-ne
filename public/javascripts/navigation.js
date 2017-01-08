function navButtons(){
    $('.navNewNote').live('click', function(){
        addToHistory(false);
        resetNoteState();
    });
}