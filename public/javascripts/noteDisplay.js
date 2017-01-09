var displayNoteFilter = "all";
var displayingNotes = [];
var noteDisplaySearchFilter = "";

function noteDisplayListeners(){
    $('.noteDisplay').live('click', function(){
//        if (!$(this).data("expanded")){
//            $(this).css({
//                "width": "80%",
//                "height": "400px",
//                "position": "absolute"
//            })
//        }
    });
    $('.search').live('keyup', function(){
        noteDisplaySearchFilter = $(this).val();
        displayAllNotes();
    });
}

function displayAllNotes(){
    console.log ("**********NOTES********")
    console.log(notes)
    
    
    $('.noteDisplayArea').empty();
    displayingNotes = [];
    
    for (var note in notes){
        var currentNote = notes[note];
        if (currentNote.userID == userID){
            if (((displayNoteFilter == "mine")&&(currentNote.originID == userID))
                || ((displayNoteFilter == "grabs")&&(currentNote.originID!=userID))
                || (displayNoteFilter == "all")){
                
                if ((currentNote.noteTitle.indexOf(noteDisplaySearchFilter)>=0)
                    ||(currentNote.noteContent.indexOf(noteDisplaySearchFilter)>=0)){
                    displayingNotes.push(currentNote);
                
                    var noteTemplate = $('#noteDisplayTemplate').clone();
                    console.log("constructing note " + notes[note].noteTitle)
                    var noteID = notes[note].noteID.split(' ').join('');
                    noteTemplate.attr("id", noteID);
                    noteTemplate.data("noteID", notes[note].noteID);
                    $('.noteDisplayArea').append(noteTemplate);
                    noteID = "#" + noteID;
                    $(noteID).find('.ndUsername').html(notes[note].userID);
                    $(noteID).find('.ndNoteTitleText').html(notes[note].noteTitle);
                    $(noteID).find('.ndNoteContent').html(notes[note].noteContent);
                    $(noteID).show();    
                }
                
            }
            
        }
        
    }
}