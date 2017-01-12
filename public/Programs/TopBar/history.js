var historyHolder = [];

var historyPosition = 0;

var screenState = "createNote";

var historyHash = [];


var historyButtons = function(){
    
    $('.historyBack').live('click', function(){
      //  console.log(historyPosition)
//    console.log(historyHolder)
//    console.log(historyHash)
        if (historyPosition > 0){
            if (addToHistory(false)) historyPosition --;
            historyPosition --;
            updateActionScreen();
            updateButtonStatus();   
        }
    })
    
    $('.historyForward').live('click', function(){
       // console.log(historyPosition)
//    console.log(historyHolder)
//    console.log(historyHash)
        if (historyPosition < historyHolder.length-1){
            if (!addToHistory(true)) historyPosition ++;
            updateActionScreen();
            updateButtonStatus();   
        }
    })
};

function updateActionScreen(){
    if (historyHolder[historyPosition].screenState == "createNote"){  
        screenState = "createNote";
        loadNoteCreateSection();
        setNoteCreationStatus(historyHolder[historyPosition].screenDetails); 
    }
    else if (historyHolder[historyPosition].screenState == "displayNotes"){ 
        screenState = "displayNotes";
        setNoteDisplayStatus(historyHolder[historyPosition].screenDetails);
    }
}

var addToHistory = function(fromHistoryBar){
    console.log(screenState + "<- screen state -> " + historyPosition)
    if (screenState == "createNote"){
        
        if (getNoteCreationStatus() ){
            var snapshot = {screenState: screenState, screenDetails: getNoteCreationStatus()};
            if (historyHash[JSON.stringify(snapshot)] != 1){
                historyHolder.push(snapshot);
                if (!fromHistoryBar) historyPosition = historyHolder.length;
                updateButtonStatus();
                historyHash[JSON.stringify(snapshot)] = 1;    
                console.log("----history----")
                console.log(screenState + "<- post screen state -> " + historyPosition)
                console.log(historyHolder)
                return true;
            }
            return false; 
        }
//        if (!fromHistoryBar){ 
//                console.log("----history2----")
//                console.log(historyHolder)
//                historyPosition = historyHolder.length;
//                console.log(screenState + "<- post screen state -> " + historyPosition)
//                updateButtonStatus();
//            }
    }
    else if (screenState == "displayNotes"){
        var snapshot = {screenState: screenState, screenDetails: getNoteDisplayStatus()};
        
            if (historyHash[JSON.stringify(snapshot)] != 1){
                historyHolder.push(snapshot);
                if (!fromHistoryBar) historyPosition = historyHolder.length;
                updateButtonStatus();
                historyHash[JSON.stringify(snapshot)] = 1;    
                console.log("----history3----")
                console.log(screenState + "<- post screen state -> " + historyPosition)
                console.log(historyHolder)
                return true;
            }
        if (!fromHistoryBar) {
            console.log("----history4----")
                console.log(historyHolder)
            historyPosition = historyHolder.length;
            console.log(screenState + "<- post screen state -> " + historyPosition)
            updateButtonStatus();    
            return true;
        }
            return false; 
    }
};

function updateButtonStatus(){
    console.log(historyPosition + "hs")
    if (historyPosition == 0){
        $('.historyBack').css({
            "background-image": "url('./Designs/images/downArrow.png')",
            "cursor":"default"
        })
    }
    else{
        $('.historyBack').css({
            "background-image": "url('./Designs/images/boldArrow.png')",
            "cursor":"pointer"
        })
    }
    
    if (historyPosition >= historyHolder.length-1){
        $('.historyForward').css({
            "background-image": "url('./Designs/images/downArrow.png')",
            "cursor":"default"
        })
    }
    else{
        $('.historyForward').css({
            "background-image": "url('./Designs/images/boldArrow.png')",
            "cursor":"pointer"
        })
    }
}