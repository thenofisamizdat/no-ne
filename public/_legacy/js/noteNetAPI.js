/**
 * Created by michael on 16/04/2016.
 */

var root = './php';
var chatStore = [];
var lastChat = 0;
var channel = "chat";
var adding = false;
var tagging = false;
var getting = false;
var note = "";
var tags = "";
var tagArray = [];
var query = "";
var queryArray = [];

var chooseChannel = function(input){
	if (input == "--notes"){
		channel = "notes";
		noteView();
		//noteInterface({program:2,uid:21323,command:"test java notes", userName:"Neil"});
	} 
	else if (input == "--chat"){
		channel = "chat";
		getChats({chatroom:2,uid:21323, recent: 0});
	} 
	console.log("Channel is " + channel);
};

var getProfilePic = function(e){
	/* make the API call */
	FB.api(
		"/"+uid+"/picture",
		function (response) {
			console.log(response["data"].url)
			if (response && !response.error) {
				/* handle the result */
				console.log("here")
				$('.profilePic').css("background-image", "url("+response["data"].url+")");
			}
		}
	);
};

var noteCmd = function(input){
	console.log(input, getting)
	if (!adding&&!tagging&&!getting) command(input);
	else if (adding&&!tagging) addNote(input);
	else if (!adding&&tagging) addTags(input);
	else if (!adding&&!tagging&&getting) enterQuery(input);
};

var command = function(input){
	if (channel == "notes"){
		if (input == "--add"){
			adding = true;
			$('#chatWindow').append("<div>Enter Note Content: </div>");
			scrollDown();
		}
		else if (input == "--get"){
			getting = true;
			$('#chatWindow').append("<div>Enter Query String: </div>");
			scrollDown();
		}
	}
};

var addNote = function(input){
	if (channel == "notes"){
		if (adding){
			note = input;
			adding = false;
			tagging = true;
			$('#chatWindow').append("<div>Enter Tags: </div>");
			scrollDown();
		}
	}
};

var enterQuery = function(input){
	console.log(input)
	if (channel == "notes"){
		console.log(getting)
		if (getting){
			query = input;
			queryArray = query.split(" ");
			console.log(query)
			getting = false;
			$('#chatWindow').append("<div>Searching...</div>");
			scrollDown();
			getNote ({searchQuery:queryArray,searchType:"userSearch", noteId:21, uid:43});
		}
	}
};

var addTags = function(input){
	if (channel == "notes"){
		if (tagging){
			tags = input;
			tagArray = tags.split(" ");
			tagging = false;
			$('#chatWindow').append("<div>Note Added</div>");
			scrollDown();
			sendNote ({tags:tags,uid:43,content:note});
		}
	}
};

var sendNote = function(e){
	console.log(e);
	$.ajax({
        type: "POST",
        url: root+"/addNote.php",
        data: e,
        success: function (noteData) {
			console.log(noteData)
			getUserNotes({searchType:"userSearch", searchQuery:"", noteId:currentNoteId, uid:uid})
        },
    });
};

var getNote = function(e){
	console.log("getting notes")
	//console.log(e)
	$.ajax({
		type: "POST",
		url: root+"/getNote.php",
		data: e,
		success: function (noteData) {
			//console.log(noteData)
			userNotes = jQuery.parseJSON(noteData);
			buildUserNotes();
		}
	});
};

var getSuggestions = function(e){
	console.log(e)
	$.ajax({
		type: "POST",
		url: root+"/getNote.php",
		data: e,
		success: function (noteData) {
			//console.log(noteData);
			suggestedNotes = jQuery.parseJSON(noteData);
			buildSuggestedNotes();
		}
	});
};

var addNoteGrab = function(e){
	console.log(e);
	$.ajax({
		type: "POST",
		url: root+"/grabsAndCounts.php",
		data: e,
		success: function (noteData) {
			//getUserNotes({searchType:"userSearch", searchQuery:"", noteId:currentNoteId, uid:uid})
			console.log(noteData)
		},
	});
};
var getGrabCount = function(e){
	//console.log(e);
	$.ajax({
		type: "POST",
		url: root+"/grabsAndCounts.php",
		data: e,
		success: function (noteData) {
			//getUserNotes({searchType:"userSearch", searchQuery:"", noteId:currentNoteId, uid:uid})
			console.log(noteData)
		},
	});
};
var getViewCount = function(e){
//	console.log(e);
	$.ajax({
		type: "POST",
		url: root+"/grabsAndCounts.php",
		data: e,
		success: function (noteData) {
			//getUserNotes({searchType:"userSearch", searchQuery:"", noteId:currentNoteId, uid:uid})
			console.log(noteData)
		},
	});
};

var addNoteCount = function(e){
	console.log(e);
	$.ajax({
		type: "POST",
		url: root+"/grabsAndCounts.php",
		data: e,
		success: function (noteData) {
			//getUserNotes({searchType:"userSearch", searchQuery:"", noteId:currentNoteId, uid:uid})
			console.log(noteData)
		},
	});
};

var noteView = function(){
	$('#chatWindow').empty();
	$('#chatWindow').append("<div>Note Interface: --add to add, --get to explore </div>");
	$('#chatWindow').append("<div>Note Interface: --add to add, --get to explore___</div>");
};

var noteInterface = function(e){
	$.ajax({
        type: "POST",
        url: root+"/speechToText.php",
        data: e,
        success: function (emailData) {
        	console.log ("what" + emailData)
            //getChats({chatroom:2,uid:21323, recent: lastChat});
        }
    });
};

var getChats = function (e) {
    $.ajax({
        type: "POST",
        url: root +"/refreshChatRoom.php",
        data: e,
        success: function (emailData) {          
            if (lastChat == 0){
            	chatStore = jQuery.parseJSON (emailData);
            } 
            else {
            	var updateChat = jQuery.parseJSON (emailData);            
            	for (var key in updateChat) {
				  chatStore.push (updateChat[key]);
				}
            }           
            lastChat = chatStore[chatStore.length-1].posted;            
            updateChatWindow();       
        }
    });
};

var sendChat = function (e) {

    $.ajax({
        type: "POST",
        url: root+"/grabsAndCounts.php",
        data: e,
        success: function (emailData) {
        	//console.log ("what" + emailData)
            getChats({chatroom:2,uid:21323, recent: lastChat});
        }
    });
};

var updateChatWindow = function(chat){
			$('#chatWindow').empty();
			//chatStore.push(chat);  			
			for (var i = 0; i<chatStore.length; i++){
				
				if (i%2 == 0) var chatStyle = "#my";
				else var chatStyle = "#your";
				
				var newElement = $(chatStyle + '-chat-row').clone();
				newElement.attr('id', i);
				$('#chatWindow').append(newElement);
				var id = "#"+newElement.attr('id')+"";
				
				// fill in each div with chat entry details
				$(id).find(chatStyle + "-chat-row-content").html(chatStore[i].comment);
				$(id).find("#name").html(chatStore[i].userName);
				$(id).find(".text-muted").html(calculateTimeSince(chatStore[i].posted));
				
				$(id).css("display", "block");
			} 
			scrollDown();
			//.scrollTop($('.panel-body')[0].scrollHeight, );
};

var scrollDown = function(){
	$('.panel-body').animate({scrollTop:$('.panel-body')[0].scrollHeight}, '500', 'swing');
};

var calculateTimeSince = function(secs){
	var difference = Math.floor(Date.now() / 1000) - secs;
	
	var days = Math.floor(difference / (60*60*24));
	difference = difference % (60*60*24);
	var hours = Math.floor(difference / (60*60));
	difference = difference % (60*60);
	var minutes = Math.floor(difference / 60);
	var seconds = difference % 60;
	
	if (days > 0) return days + "days, " + hours + " hours, " + minutes + " minutes and " + seconds + " seconds ago";
	else if (hours > 0) return hours + " hours, " + minutes + " minutes and " + seconds + " seconds ago";
	else if (minutes > 0) return minutes + " minutes and " + seconds + " seconds ago";
	else return seconds + " seconds ago";
};

