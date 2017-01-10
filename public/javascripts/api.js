
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

