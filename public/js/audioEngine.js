/**
 * Created by neil on 31/07/16.
 */
var recording = false;
var audio_context;
var recorder;

$('.recordNote').live('click', function(){
    if (!recording){
        currentNoteId = 0;
        var currentTitle = "";
        var currentNote = "";
        $('.enterTitle').val("");
        $('.enterNote').val("");
        $(this).css("-webkit-box-shadow", "0 0 20px yellow");
        recording = true;
        startRecording(this);
    }
    else{
        console.log("turning off")
        $(this).css("-webkit-box-shadow", "0 0 0px #444");
        recording = false;
        stopRecording(this);
    }
});
function startUserMedia(stream) {
    var input = audio_context.createMediaStreamSource(stream);
    console.log('Media stream created.');
    // Uncomment if you want the audio to feedback directly
    //input.connect(audio_context.destination);
    //__log('Input connected to audio context destination.');

    recorder = new Recorder(input);
    console.log('Recorder initialised.');
}
function startRecording(button) {
    recorder && recorder.record();
   // button.disabled = true;
  //  button.nextElementSibling.disabled = false;
    console.log('Recording...');
}
function stopRecording(button) {
    console.log('Stopping recording.');
    recorder && recorder.stop();
 //   button.disabled = true;
  //  button.previousElementSibling.disabled = false;
    console.log('Stopped recording.');

    // create WAV download link using audio data blob
    createDownloadLink();

    recorder.clear();
}
function createDownloadLink() {
    recorder && recorder.exportWAV(function(blob) {

        recordingblob = blob;
        console.log(recordingblob)

        //console.log("finished recording")
        //console.log(recorder)
        //var tURL = URL.createObjectURL(blob);
        //console.log(tURL)
        //
        //console.log(url)
        //var li = document.createElement('li');
        //var au = document.createElement('audio');
        //var hf = document.createElement('a');
        //
        //au.controls = true;
        //au.src = tURL;
        //hf.href = tURL;
        //hf.download = new Date().toISOString() + '.wav';
        //hf.innerHTML = hf.download;
        //var url = 'data:audio/wav;base64,' + tURL;
        //li.appendChild(au);
        //li.appendChild(hf);
        //recordingslist.appendChild(li);
        //
        //var duc = document.getElementById("dataUrlcontainer");
        //duc.innerHTML = url;
        //
        //
        //uploadAudioFromBlob(hf.download, blob)
        upload2(blob);
    });
}
var recordingblob = null;
//function uploadAudioFromBlob(assetID, blob)
//{
//    var reader = new FileReader();
//
//    // this is triggered once the blob is read and readAsDataURL returns
//    reader.onload = function (event)
//    {
//        var formData = new FormData();
//        formData.append('assetID', assetID);
//        formData.append('audio', event.target.result);
//        console.log(formData)
//        $.ajax({
//            type: 'POST'
//            , url: "./php/audioUpload.php"
//            , data: formData
//            , processData: false
//            , contentType: false
//            , dataType: 'json'
//            , cache: false
//            , success: function (json)
//            {
//                if (json.Success)
//                {
//                    // do successful audio upload stuff
//                    console.log("huzzah!")
//                }
//                else
//                {
//                    console.log("jizznah!")
//                    // handle audio upload failure reported
//                    // back from server (I have a json.Error.Msg)
//                }
//            }
//            , error: function (jqXHR, textStatus, errorThrown)
//            {
//                alert('Error! '+ textStatus + ' - ' + errorThrown + '\n\n' + jqXHR.responseText);
//                // handle audio upload failure
//            }
//        });
//    }
//    reader.readAsDataURL(blob);
//}

//var timerForLoadingResult=  setInterval(checkServerForFile,4000);//call the fnction in every 4 seconds.write ajax in that function.
//var timeforSpeechCheck=  setInterval(getSpeechText,400000);

function checkServerForFile(file) {
    console.log("check")
    $.ajax({
        type: "POST",
        cache: false,
        url: file,
        statusCode: {
            404: function() {
                // file not found
                clearInterval(timerForLoadingResult);
            },
            200: function() {
                // file found
                getSpeechText();
            }
        }
    });

}
var audioFile ="";
function upload2(blob) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function (e) {
        if (this.readyState === 4) {
            console.log("Server returned: ", e.target.responseText);
            returnobj = jQuery.parseJSON(e.target.responseText);
            console.log(returnobj)
            audioFile = returnobj["file"];
            getSpeechText();
        }
    };
    var fd = new FormData();
    fd.append("that_random_filename.wav", recordingblob);
    xhr.open("POST", "https://note-net.com/php/audioUpload.php", true);
    xhr.send(fd);
}

function upload(e){

    event.preventDefault();

    var formData = new FormData();

    if (recordingblob) {
       // var recording = new Blob([recordingblob], { type: "audio/wav" });
        formData.append("recording", recordingblob);
    }
    $.ajax({
        url: "./php/audioUpload.php",
        type: 'POST',
        processData: false,
        data: formData
    }).done(function(o) {
        //getSpeechText(o);
        console.log(o)
        console.log('saved');
    });


}

window.onload = function init() {
    try {
        // webkit shim
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
        window.URL = window.URL || window.webkitURL;

        audio_context = new AudioContext;
        console.log('Audio context set up.');
        console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
    } catch (e) {
        alert('No web audio support in this browser!');
    }

    navigator.getUserMedia({audio: true}, startUserMedia, function(e) {
        console.log('No live audio input: ' + e);
    });
};