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
    if (historyHolder[historyPosition].screenState == "createNote"){    setNoteToolBarStatus(historyHolder[historyPosition].screenDetails);
    }
}

var addToHistory = function(fromHistoryBar){
    if (screenState == "createNote"){
     //   console.log(getNoteToolBarStatus())
        if (getNoteToolBarStatus() ){
            var snapshot = {screenState: screenState, screenDetails: getNoteToolBarStatus()};
            if (historyHash[JSON.stringify(snapshot)] != 1){
          //      console.log(fromHistoryBar)
                historyHolder.push(snapshot);
                if (!fromHistoryBar) historyPosition = historyHolder.length;
                updateButtonStatus();
                historyHash[JSON.stringify(snapshot)] = 1;    
                console.log("returning true")
                return true;
            }
            console.log("returning false")
            return false;
            
        }
        
    }
};

function updateButtonStatus(){
    console.log(historyPosition + "hs")
    if (historyPosition == 0){
        $('.historyBack').css({
            "background-color": "#aaa",
            "cursor":"default"
        })
    }
    else{
        $('.historyBack').css({
            "background-color": "#000",
            "cursor":"pointer"
        })
    }
    
    if (historyPosition >= historyHolder.length-1){
        $('.historyForward').css({
            "background-color": "#aaa",
            "cursor":"default"
        })
    }
    else{
        $('.historyForward').css({
            "background-color": "#000",
            "cursor":"pointer"
        })
    }
}