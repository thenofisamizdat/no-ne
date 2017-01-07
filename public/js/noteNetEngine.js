/**
 * Created by neil on 23/07/16.
 */

var currentTitle = "";
var currentNote = "";

var currentNoteId = 0;
var uid = 13;

var userNotes = [];
var suggestedNotes = [];

var suggestedUserNotes = [];

var searchTerm = "";

var searchTermInUse = false;

var listSelected = "";

var buttonListeners = function(e){
    $('.addNote').click(function(){
        currentNoteId = 0;
        var currentTitle = "";
        var currentNote = "";
        $('.enterTitle').val("");
        $('.enterNote').val("");
    });
    $('.updateSuggestion').click(function(){
        getSuggestedNotes();
    });
    $('.saveButton').click(function(){
        saveNote();
        getSuggestedNotes();
    });
    $('.suggestButton').click(function(){ // save content then run suggest
        saveNote();
        getSuggestedNotes();
    });
    $('.grab').click(function(){
        displayNote = $.grep(userNotes, function(e){ return e.content == currentNote});

        console.log("display note is " + displayNote)

        if (displayNote.length == 0) {// WE WILL NEED AN ALTERNATIVE BEHAVIOUR FOR WHEN USER ALREADY HAS NOTES
            addGrab(currentNoteId);
            currentNoteId = 0;
            saveNote();
            getSuggestedNotes();
            $('.enterTitle').val("");
            $('.enterNote').val("");
        }
    });
    $('.searchTerm').live('keyup', function(e){
        if(e.keyCode == 13){
            searchTerm = $('.searchTerm').val();
            searchTermInUse = true;
            getSuggestedNotes();
        }
    });
    $('.searchButton').live('click', function(){
        searchTerm = $('.searchTerm').val();
        searchTermInUse = true;
        getSuggestedNotes();
    });
    $('.enterTitle').keyup(function(){
        currentTitle = $('.enterTitle').val();
    });
    $('.enterNote').keyup(function(e){
        if (e.keyCode == 32) {
            searchTermInUse = false;
            getSuggestedNotes();
        }
        currentNote = $('.enterNote').val();
    });
    $('.noteCard').live('click',function(){
        currentNoteId = this.id.substr(2);
        console.log(currentNoteId)
        if ($(this).parent().attr('id') == "suggestCardList"){
            addCount(currentNoteId);
            listSelected = "suggested";
            displaySuggestedNote();
            getSuggestedNotes();
        }
        else{
            searchTermInUse = false;
            listSelected = "notes";
            displayChosenNote();
            getSuggestedNotes();
        }
    });
}

var addGrab = function(params){
    displayNote = $.grep(suggestedNotes, function(e){ return e.noteId == currentNoteId});
    var createdBy = displayNote[0].uid;
    addNoteGrab({uid:uid, createdBy:createdBy, noteId:params, countType:"addGrab"});
};

var addCount = function(params){
    addNoteGrab({uid:uid, createdBy:uid, noteId:params, countType:"addView"});
};

var displaySuggestedNote = function(params){
    displayNote = $.grep(suggestedNotes, function(e){ return e.noteId == currentNoteId});

    currentNote = displayNote[0].content;
    currentTitle = displayNote[0].tag;
    if ((currentTitle.charAt(0)=='"')&&(currentTitle.charAt(currentTitle.length-1)=='"'))
    {
        currentTitle = currentTitle.substr(1, currentTitle.length-2);
    }
    console.log(currentNote)
    console.log(currentTitle)
    $('.enterTitle').val(displayNote[0].tag);
    $('.enterNote').val(displayNote[0].content);
    $('.grab').show();
    $('.saveButton').hide();
}

var displayChosenNote = function(params){
    displayNote = $.grep(userNotes, function(e){ return e.noteId == currentNoteId});

    currentNote = displayNote[0].content;
    currentTitle = displayNote[0].tag;
    if ((currentTitle.charAt(0)=='"')&&(currentTitle.charAt(currentTitle.length-1)=='"'))
    {
        currentTitle = currentTitle.substr(1, currentTitle.length-2);
    }
    console.log(currentNote)
    console.log(currentTitle)
    $('.enterTitle').val(displayNote[0].tag);
    $('.enterNote').val(displayNote[0].content);
    getSuggestedNotes();
    $('.grab').hide();
    $('.saveButton').show();
}

var getUserNotes = function(params){
    getNote(params);
}

var buildUserNotes = function(params){
    // $('.noteCardList').empty();
    // for (var i = 0; i<userNotes.length; i++){
    //
    //     var newElement = $('#noteCardTemplate').clone();
    //     newElement.attr('id', "n-"+userNotes[i].noteId);
    //     $('.noteCardList').append(newElement);
    //     var id = "#"+newElement.attr('id')+"";
    //
    //     // fill in each div with chat entry details
    //     $(id).find('.noteTitle').html(userNotes[i].tag);
    //     $(id).find('.noteBody').html(userNotes[i].content);
    //
    //     $(id).css("display", "block");
    // }
}

var buildSuggestedNotes = function(params){

    $('#suggestCardList').empty();
    $('.noteCardList').empty();

    for (var i = 0; i<suggestedNotes.length; i++){

        if (suggestedNotes[i].uid!=uid){
            var newElement = $('#noteCardTemplate').clone();
            newElement.attr('id', "s-"+suggestedNotes[i].noteId);

            $('#suggestCardList').append(newElement);
            var id = "#"+newElement.attr('id')+"";

            // fill in each div with chat entry details
            if ((suggestedNotes[i].tag.charAt(0)=='"')&&(suggestedNotes[i].tag.charAt(suggestedNotes[i].tag.length-1)=='"'))
            {
                suggestedNotes[i].tag = suggestedNotes[i].tag.substr(1, suggestedNotes[i].tag.length-2);
            }
            $(id).find('.noteTitle').text(suggestedNotes[i].tag);
            $(id).find('.noteBody').text(suggestedNotes[i].content);

            $(id).css("display", "block");
        }
        else{
            var newElement = $('#noteCardTemplate').clone();
            newElement.attr('id', "n-"+suggestedNotes[i].noteId);
            $('.noteCardList').append(newElement);
            var id = "#"+newElement.attr('id')+"";

            // fill in each div with chat entry details
            if ((suggestedNotes[i].tag.charAt(0)=='"')&&(suggestedNotes[i].tag.charAt(suggestedNotes[i].tag.length-1)=='"'))
            {
                suggestedNotes[i].tag = suggestedNotes[i].tag.substr(1, suggestedNotes[i].tag.length-2);
            }
            $(id).find('.noteTitle').html(suggestedNotes[i].tag);
            $(id).find('.noteBody').html(suggestedNotes[i].content);

            $(id).css("display", "block");
        }
    }
}

var getSuggestedNotes = function(params){
    var searchQuery = currentNote;
    if (searchTermInUse) searchQuery = searchTerm;
    query = {searchType:"noteSearch", searchQuery:searchQuery.split(" "), noteId:currentNoteId, uid:uid};
    console.log(query);
    getSuggestions(query);
}

var saveNote = function(params){
    if ((currentTitle.charAt(0)=='"')&&(currentTitle.charAt(currentTitle.length-1)=='"'))
    {
        currentTitle = currentTitle.replace(/"/g, "");
    }
    if (currentNoteId == 0){
        var query = {tag:currentTitle, content:currentNote, noteId:currentNoteId, uid:uid};
        sendNote(query);
    }
    else{
        noteSend = $.grep(userNotes, function(e){ return e.noteId == currentNoteId});
        noteSend[0].content = currentNote;
        noteSend[0].tag = currentTitle;
        sendNote(noteSend[0]);
    }

}
