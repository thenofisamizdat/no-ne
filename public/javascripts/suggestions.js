var suggestedNetworkNotesContainer = [];
var suggestedNetworkNoteBookContainer = [];
var suggestedPersonalNotesContainer = [];
var suggestedPersonalNoteBookContainer = [];

var networkSource = true;
var notebookSource = true;

var connectBarListener = function(){
    $('.sourceText').live('click', function(){
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA")
        if ($(this).html() == "network"){         
            $(this).parent().find(".sourceHighlight").animate({'margin-left': "23%"}, 250);  
            networkSource = true;
            console.log(networkSource)
            searchForString(currentNote + " " + currentTitle);
        }
        else if ($(this).html() == "personal"){
            networkSource = false;
            console.log(networkSource)
            $(this).parent().find(".sourceHighlight").animate({'margin-left': "73%"}, 250);  
            searchForString(currentNote + " " + currentTitle);
        }
        else if ($(this).html() == "notebooks")
            $(this).parent().find(".sourceHighlight").animate({'margin-left': "23%"}, 250);  
        else if ($(this).html() == "notes")
            $(this).parent().find(".sourceHighlight").animate({'margin-left': "73%"}, 250);  
    });
    $('.expand').live('click', function(){
        
    });
    $('.suggestionNote').live('click', function(){
        console.log (this.id)
    })
};

var buildSuggestionList = function (){
    console.log("buildage")
    $('.suggestionBox').empty();
    
    for (var i = 0; i < suggestedNetworkNoteBookContainer.length; i++){
        var suggestedObject = suggestedNetworkNoteBookContainer[i];
        var suggestion = "<div class='suggestion'><div class='suggestionNoteBook'>"+stories[suggestedObject['id']].storyTitle+"<div class='expand'></div></div>";
            for (var j = 0; j < stories[suggestedObject['id']].notes.length; j++){
                var noteID = stories[suggestedObject['id']].notes[j]
                suggestion += "<div class='suggestionNote' id='"+noteID+"'>"+ notes[noteID].noteTitle + "</div>"
            }
        suggestion += "</div>"
        $('.suggestionBox').append(suggestion);
    }
}