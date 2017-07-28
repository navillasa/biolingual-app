var BACK_ELEMENT = document.getElementById("backsvg");
var FULL_BODY_ELEMENT = document.getElementById("fullbodysvg");

function initialize(){
    // var data = dataToTranslate();
    var translationsAlreadyMade = {
        "house": "casa",
    };
    $(document).ready(function() {
        $('[data-target="main-panel"] button').click(function(button){
            var searchString = button['target']['value'];
            var language = $('[data-target="lang-selector"] select').val();
            var searchData = dataToTranslate(searchString, language);
            retrieveTranslation(searchData, translationsAlreadyMade);
        })
        //wrap this in a function and pass in backsvg, the selector of the svg element that i want to click, and a funciton with an action)
        $("#backsvg").on("load", function(){
            var a = BACK_ELEMENT;
            var svgDoc = a.contentDocument; //get the inner DOM of alpha.svg
            var svgRoot  = svgDoc.documentElement;
            $(svgRoot).find('[data-role="upper-back"]').on("click", function(){
                console.log("derp derp");  
            })
        });
        putItTogether(translationsAlreadyMade);  
    })   
}
function dataToTranslate(searchString, language){
    var data = {
        "key": "AIzaSyAmUmUgRqQU86v4NNTWIHKFVfB-kO4WCrI",
        "q": searchString,
        "target": language
    };
    return data;
}
function retrieveTranslation(data, translationsAlreadyMade){
    if (translationsAlreadyMade[data['q']]){
        console.log('here');
        return translationsAlreadyMade[data['q']];
    }
    
    var P = $.post("https://translation.googleapis.com/language/translate/v2", data, printIt)
        .then(function(d){
            translationsAlreadyMade[data['q']] = d['data']['translations']['0']['translatedText'];
            // return d['data']['translations']['0']['translatedText'];
            var P = new Promise(function(resolve, reject){
                // console.log(translationsAlreadyMade[data['q']]);
                resolve(translationsAlreadyMade[data['q']]);
            
            });      
            return P;      
        });
    return P;
    // I have this commented out so that it does not run anytime you refresh
}
function printIt(text){
    // console.log(text);
}

function returnURLForSymptomChecker(ID){
    return "https://sandbox-healthservice.priaid.ch/symptoms/" + ID + "/man";
}

function dataForSymptomChecker(){
    var data = {
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Impsam9obnMxMjE2QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiMTk1OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAxNy0wNy0yNiIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNTAxMjUxMzk4LCJuYmYiOjE1MDEyNDQxOTh9.4Xl9p5imFw8Q9X8QAigiHczjbcIUHdp1tGWey9O7foY',
        language: 'en-gb',
        format:"json",
    }
    return data;
}
function retrieveSymptoms(ID){
    return $.get(returnURLForSymptomChecker(ID), dataForSymptomChecker(), printIt)
    
}
initialize();

function formatGetRequest(translationsAlreadyMade, rawData){
    var newDictionary = {};
    $.each(rawData, function(key, value){
        var searchString = value['Name'];
        var language = $('[data-target="lang-selector"] select').val();
        var searchData = dataToTranslate(searchString, language);
        retrieveTranslation(searchData, translationsAlreadyMade).then(function(data){
            newDictionary[value['Name']] = data;
        });
    });
    console.log(newDictionary);
    
}


function putItTogether(translationsAlreadyMade){
    // console.log(translationsAlreadyMade)
    //yes this is a terrible name. I need to build the big function that i talk about above.
    retrieveSymptoms(7).then(formatGetRequest.bind(this, translationsAlreadyMade));
}

//base url: https://sandbox-healthservice.priaid.ch/

//want a function that accepts my dom element(object tag with the svg), the name of the selector inside of the svg file, then a function that I will associate with the click event. 
