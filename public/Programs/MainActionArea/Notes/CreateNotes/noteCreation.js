var createStoryButtonPressed = false;
var selectedStories = [];
var storySearchBox = "";

var currentTitle = "";
var currentNote = "";

function getNoteCreationStatus(){
    var ntbStatus = {};
    ntbStatus.selectedStories = selectedStories;
    ntbStatus.storySearchBox = storySearchBox;
    ntbStatus.createStoryButtonPressed = createStoryButtonPressed;
    ntbStatus.currentTitle = currentTitle;
    ntbStatus.currentNote = currentNote;
    
    if (currentNote || currentTitle != "") return ntbStatus;
    return false;
}

function setNoteCreationStatus(ntbStatus){
    selectedStories = ntbStatus.selectedStories;
    storySearchBox = ntbStatus.storySearchBox;
    createStoryButtonPressed = ntbStatus.createStoryButtonPressed;
    currentTitle = ntbStatus.currentTitle;
    currentNote = ntbStatus.currentNote;
    
    populateNoteBookAddedList();
    populateNote();
}

function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
    })
}

function generateLink(s)
{
    var tokens = s.split(' ');
    var lastToken = tokens[tokens.length-1];
    if (lastToken.indexOf('http')>=0){
        $('.busyGraphic').show();
        document.getElementById('nc').contentEditable = false;
        var lastTokenUrl = urlify(lastToken);
        tokens.pop();
        currentNote = tokens.join(' ');
        $('.enterNote').html(currentNote);
        //placeCaretAtEnd(document.getElementById("nc"));
        getLinkPreview(lastToken);
    }
}
function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}
var urlifiedLinks = [];
function noteToolBarControl() {
    
    $('.enterTitle').keyup(function(){
        currentTitle = $('.enterTitle').val();
    });
    $('.enterNote').keyup(function(e){
        if (!$('.busyGraphic').is(":visible")){
            if (e.keyCode == 32) {
                searchTermInUse = false;
                searchForString(currentNote + " " + currentTitle);
                generateLink(currentNote.split('&nbsp;').join(' '));
            }
            currentNote = $('.enterNote').html();
        }
    });
	
	$('.newNoteBook').live('click', function(){
		if (!createStoryButtonPressed){
            createStoryButtonPressed = true;
			$('.createPrompt').hide();
			$('.newNoteBookTitle').show();
		}
	});
    
    $('.newNoteBookTitle').keyup(function(e){
        if (e.which == 13){
            console.log($(this).val())
            if (userStories[$(this).val()] != undefined){
                $(this).val("");
            }
            else{
                userStories[$(this).val()] = userID+"_"+$(this).val();
                createNewNoteBook($(this).val());
                $(this).val("");
                populateNoteBookList();
                createStoryButtonPressed = false;
                $('.createPrompt').show();
                $('.newNoteBookTitle').hide();
                
                // create story code goes here
            }
            
        }
    });
    
    $('.searchNoteBooks').keyup(function(e){
        storySearchBox = $(this).val();
        populateNoteBookList();
    });
    
    $('.nbAdd').live('click', function(){
        $('.noteBookSelect').toggle();
        if ($('.noteBookSelect').is(":visible")) {
            $('.nbAdd').html("Done adding to NoteBooks");
            populateNoteBookList();
        }
        else $('.nbAdd').html("Add to NoteBook(s)");
    });
    
    $('.noteBookListEntry').live('click', function(){
        var id = '#'+this.id;
        var storyTitle = $(id).find('.nbeTitle').html();
        console.log(storyTitle)
        if (selectedStories.indexOf(storyTitle)<0){
            selectedStories.push(storyTitle);
            $(id).find('.nbeSelected').css("background-color", "#444");
        }
        else{
            selectedStories.splice(selectedStories.indexOf(storyTitle), 1);
            $(id).find('.nbeSelected').css("background-color", "#fff");
        }
        populateNoteBookAddedList();
        
    });
    $('.saveButton').live('click', function(){
        console.log("fuck bluemix")
        createnewNote();
        
        resetNoteState();
    });
    $('.suggestButton').live('click', function(){
        console.log("whaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaat")
        searchForString(currentNote + " " + currentTitle);
        console.log("why is this acting like a hooli?")
    });
    $('.dateCreated').live('click', function(){
        console.log("flushing")
        flushDB();
    })
};

function createNewNoteBook(title){
    var noteBook = {
        userID: userID,
        storyTitle: title,
        storyID: userID+"_"+title,
        originID: userID+"_"+title,
        notes: [],
        views: 0,
        grabs: 0
    }
    //now add new story to user via api - code to follow here
    addNoteBook(noteBook);
    console.log(noteBook);
}

function updateNoteList(noteid){
    
}

function createnewNote(){
    var noteid = userID+"_"+currentTitle;
    var note = {
        userID: userID,
        noteTitle: currentTitle,
        noteContent: currentNote,
        noteID: noteid,
        originID: noteid,
        users: [userID],
        noteBooks: returnSelectedStoryString(noteid),
        views: 0,
        grabs: 0
    }
    //now add new note to user via api - code to follow here
    console.log(note)
    
    //notes[noteid] = note;
    addNote(note);
    
}

function returnSelectedStoryString(noteid){
    var storyString = [];
    console.log(stories)
    console.log(selectedStories)
    for (var story in selectedStories){
        console.log("testing story addition");
        console.log(selectedStories[story])
        console.log("__")
        var storyid = userID+"_"+selectedStories[story];
        try{
            if (stories[storyid].notes.indexOf(noteid)<0) {
                stories[storyid].notes.push(noteid);
                addNoteBook(stories[storyid]);
            }
        }
        catch(e){
            stories[storyid].notes = [];
            stories[storyid].notes.push(noteid);
            addNoteBook(stories[storyid]);
        }
        
        storyString.push(selectedStories[story]);
    }
    return storyString;
};

function populateNote(){
    $('.enterTitle').val(currentTitle);
    $('.enterNote').val(currentNote);
};

function populateNoteBookAddedList(){
    //$('.addedToNoteBookList').fadeOut();
    $('.addedToNoteBookList').empty();
    
    console.log("pop list222")
    console.log(selectedStories)
    var list = "";
    for (var story in selectedStories){
        //console.log(story + "_")
       // console.log(userStories[selectedStories[story]])
        //console.log(userStories)
        list += selectedStories[story] + ", ";
        //if (i < (selectedStories.length-1)) list += ", ";
    }
    list = list.slice(0, -2);
    $('.addedToNoteBookList').html(list);
   // $('.addedToNoteBookList').fadeIn();
};

function populateNoteBookList(){
    $('.noteBookList').empty();
    
    console.log("pop list")
    console.log(userStories)
    console.log(selectedStories)

    var i = 0;
    for (var story in userStories){
        console.log(userStories[story])

            if (userStories[story].indexOf(storySearchBox)>=0){
                var newElement = $('#nbeTemplate').clone();
                newElement.attr('id', "s-"+i);

                $('.noteBookList').append(newElement);
                var id = "#"+newElement.attr('id')+"";

                // fill in each div with chat entry details
                $(id).find('.nbeTitle').text(story);
                if (selectedStories.indexOf(story)>=0) $(id).find('.nbeSelected').css("background-color", "#444");

                $(id).css("display", "block");
                i++;
            }   
        
    }
};

function resetNoteState(){
    createStoryButtonPressed = false;
    selectedStories = [];
    storySearchBox = "";

    currentTitle = "";
    currentNote = "";
    
    $('.noteBookSelect').hide();
    $('.createPrompt').show();
    $('.newNoteBookTitle').hide();
    $('.newNotebookTitle').val("");
    $('.searchNoteBooks').val("");
    $('.enterTitle').val("");
    $('.enterNote').val("");
    $('.addedToNoteBookList').empty();
    
}