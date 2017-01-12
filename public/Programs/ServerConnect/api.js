
function getNotes() {
    $.get( '/notes', function(data) {
        notes = [];
      for (var word in data) {
          try{
             var note = JSON.parse(data[word]);
              note.noteID = note.noteID.split("'").join('').split('"').join('');
                notes[note.noteID] = note;
          }
        catch(e){}
      }
        console.log(notes)
        calculateWordCount();
    });
}

function addNote(note){
    $.ajax({
      url: '/notes',
      type: "PUT",
      data: JSON.stringify( note ),
	  contentType: "application/json",
      success: function(data) {
        console.log(data);
          getNotes();
      }
    });
}

function getNoteBooks() {
    $.get( '/noteBooks', function(data) {
        userStories = [];
        stories = [];
      for (var word in data) {
          try{
              var story = JSON.parse(data[word]);
              story.storyID = story.storyID.split("'").join('').split('"').join('');
              stories[story.storyID] = story;
                if (story.userID == userID) userStories[story.storyTitle] = story.storyID;
          }
        catch(e){
            console.log(e)
        }
      }
        console.log(stories)
    });
}

function addNoteBook(noteBook){
    console.log("here")
    $.ajax({
      url: '/noteBooks',
      type: "PUT",
      data: JSON.stringify( noteBook ),
	  contentType: "application/json",
      success: function(data) {
        console.log(data);
          getNoteBooks();
      }
    });
}

function getUsers() {
    $.get( '/users', function(data) {
        users = [];
      for (var word in data) {
          try{
             users.push (JSON.parse(data[word]));
          }
        catch(e){}
      }
        console.log(users)
    });
}

function addUser(user){
    $.ajax({
      url: '/users',
      type: "PUT",
      data: JSON.stringify( user ),
	  contentType: "application/json",
      success: function(data) {
        console.log(data);
          getUsers();
      }
    });
}

function flushDB(){
    $.ajax({
      url: '/delete/:all',
      type: "DELETE",
	  contentType: "application/json",
      success: function(data) {
        console.log(data);
          
      }
    });
}

function updateCorpus(){
    $.ajax({
      url: '/corpus',
      type: "PUT",
      data: JSON.stringify( user ),
	  contentType: "application/json",
      success: function(data) {
        console.log(data);
          getUsers();
      }
    });
}

function getLinkPreview(link){
console.log ("linking -> " + link)
    $.ajax({
        url: "https://api.linkpreview.net",
        dataType: 'jsonp',
        data: {q: link, key: "587793b24a9e735c6cd649a4462a97226296b44dc6b8d"},
        success: function (response) {
            //return response;
            var responseID = response.title.split(' ').join('').split('"').join('').split("'").join('').split('&').join('').split(':').join('').split(';').join('').split('!').join('').split('?').join('');
            var responseHTML = "<br><div class='previewHolder'><div class='previewTitle'>"+response.title+"</div><div class='previewImage "+responseID+"'></div><div class='previewDescription'>"+response.description+"</div><div class='previewLink'>"+urlify(link)+"</div></div><br>&nbsp";
            $('.enterNote').append(responseHTML);
            responseID = "." + responseID;
            try{
                $(responseID).css({"background-image": "url('"+response.image+"')"});
                
            }
            catch(e){}
            
            urlifiedLinks.push(link);
            $('.busyGraphic').hide();
            document.getElementById('nc').contentEditable = true;
            placeCaretAtEnd(document.getElementById("nc"));
            currentNote = $('.enterNote').html();
        }
    });
}

function getProfilePic(uid){
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


