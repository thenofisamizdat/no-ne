var displayNoteFilter = "all notes";
var displayingNotes = [];
var noteDisplaySearchFilter = "";

function noteDisplayListeners(){
    $('.noteDisplay').live('click', function(){
        console.log($(this).data())
        console.log(displayingNotes)
        $('.ndaLarge').show();
        var selectedNote = notes[$(this).data("noteID")];
        $('.ndaLargeTitle').html(selectedNote.noteTitle);
        $('.ndaLargeContent').html(selectedNote.noteContent);
//        if (!$(this).data("expanded")){
//            $(this).css({
//                "width": "80%",
//                "height": "400px",
//                "position": "absolute"
//            })
//        }
    });
    $('.ndaNoteDisplayOverlay').live('click', function(){
        $('.ndaLarge').hide();    
    });
    $('.noteDisplaySearch').live('keyup', function(){
        noteDisplaySearchFilter = $(this).val();
        displayAllNotes();
    });
    $('.ndaNoteSourceText').live('click', function(){
        displayNoteFilter = $(this).html();
        animateNoteSourceHighlight();
    });
    $('.ndTool').live('click', function(){
        var pos = "";
        var but = $(this).html();
        console.log(but)
        if (but == "a") { pos = "6px"; ndtbDisplayNoteStats();}
        else if (but == "p") { pos = "25px"; ndtbDisplayNoteUsers(); }
        else if (but == "n") { pos = "46px"; ndtbDisplayNoteNotebooks(); }
        else if (but == "s") { pos = "65px"; ndtbDisplayNoteShare(); }
        $(".ndaToolBarSourceHighlight").animate({'margin-left': pos}, 250);  
    });
}

function getNoteDisplayStatus(){
    var ndStatus = {};
    ndStatus.displayNoteFilter = displayNoteFilter;
    ndStatus.displayingNotes = displayingNotes;
    ndStatus.noteDisplaySearchFilter = noteDisplaySearchFilter;
    
    return ndStatus;
}
function setNoteDisplayStatus(ndStatus){
//    console.log("set nd")
//    console.log(ndStatus)
    displayNoteFilter = ndStatus.displayNoteFilter;
    displayingNotes = ndStatus.displayingNotes;
    noteDisplaySearchFilter = ndStatus.noteDisplaySearchFilter;
    $('.noteDisplaySearch').val(noteDisplaySearchFilter);
    loadNoteDisplaySection();
    animateNoteSourceHighlight();
}

function animateNoteSourceHighlight(){
    if (displayNoteFilter == "all notes"){  
            $(".ndaSourceHighlight").animate({'margin-left': "15%"}, 250);  
            displayAllNotes();
        }
        else if (displayNoteFilter == "my notes"){
            $(".ndaSourceHighlight").animate({'margin-left': "48%"}, 250);  
            displayAllNotes();
        }
        else if (displayNoteFilter == "grabbed notes"){
            $(".ndaSourceHighlight").animate({'margin-left': "81%"}, 250);  
            displayAllNotes();
        }
}

function displayAllNotes(){
//    console.log ("**********NOTES********")
//    console.log(notes)
//    
//    
    $('.noteDisplayArea').empty();
    displayingNotes = [];
    
    for (var note in notes){
        var currentNote = notes[note];
        if (currentNote.userID == userID){
            if (((displayNoteFilter == "my notes")&&(currentNote.originID == (userID + "_" + currentNote.noteTitle))
                || ((displayNoteFilter == "grabbed notes")&&(currentNote.originID != (userID + "_" + currentNote.noteTitle)))
                || (displayNoteFilter == "all notes")){
                
                if ((currentNote.noteTitle.indexOf(noteDisplaySearchFilter)>=0)
                    ||(currentNote.noteContent.indexOf(noteDisplaySearchFilter)>=0)){
                    displayingNotes.push(currentNote);
                
                    var noteTemplate = $('#noteDisplayTemplate').clone();
//                    console.log("constructing note " + notes[note].noteTitle)
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