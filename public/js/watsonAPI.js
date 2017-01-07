/**
 * Created by neil on 30/07/16.
 */
var getSpeechText = function(e) {
    console.log("getting token");
    var curlCommand = 'curl -X POST -u "53ff51c9-fb0a-49f7-9da0-5a6dbddabe65":"I7OYZ5ro7Nn5" --header "Content-Type: audio/wav" --header "Transfer-Encoding: chunked" --data-binary @..'+audioFile+' "https://stream.watsonplatform.net/speech-to-text/api/v1/recognize?continuous=true"';
    console.log(curlCommand)
    $.ajax({
        url: "./php/speechToText.php",
        type: 'POST',
        data: {command:curlCommand},
        success: function (data) {
            result = jQuery.parseJSON(data);
           // console.log(result)
            outputNote = "";
            resu = result["results"];
            for (i = 0; i < resu.length; i++) {
                altObject = resu[i];
             //   console.log(altObject)

                results = altObject["alternatives"];
             //   console.log(results)
                for (j = 0; j < results.length; j++){
            //        console.log(altObject)
                    newResult = results[j];
           //         console.log(newResult)
                    //results = newResult["alternatives"];
                    outputNote += newResult["transcript"];
                }

            }


            //console.log(outputNote)
            currentTitle = ""
            $('.enterTitle').val(currentTitle);
            currentNote = outputNote
            $('.enterNote').val(currentNote);
            getSuggestedNotes();
        },
        error: function () {
            alert("Cannot get data");
        }
    });
}