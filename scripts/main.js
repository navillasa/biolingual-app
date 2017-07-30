var BACK_ELEMENT = document.getElementById("backsvg");
var FULL_BODY_ELEMENT = document.getElementById("fullbodysvg");

function initialize(){
    // var data = dataToTranslate();
    var translationsAlreadyMade = {
        "house": "casa",
        "Pain in the limbs": "Dolor en las extremidades",
        "Tremor at rest": "Temblor en reposo",
        "Paralysis": "Parálisis",
        "Swollen glands in the armpits": "Glándulas inflamadas en las axilas"
    };
    $(document).ready(function() {
        $('[data-target="main-panel"] button').click(function(button){
            var searchString = button['target']['value'];
            var language = $('[data-target="lang-selector"] select').val();
            var searchData = dataToTranslate(searchString, language);
            retrieveTranslation(searchData, translationsAlreadyMade);
        })

        clickOnTheBoxes("#fullbodysvg", translationsAlreadyMade, printIt)
    })

}

function clickOnTheBoxes(elementToSelect, translationsAlreadyMade, fn){
    $(elementToSelect).on("load", function(event){
        var a = FULL_BODY_ELEMENT;
        var svgDoc = a.contentDocument;
        var svgRoot  = svgDoc.documentElement;
        $(svgRoot).find('rect').on("click", function(event){
            var ID = event["currentTarget"]["id"];
            promiseChainToGetSymptomsAndTranslate(translationsAlreadyMade, ID).then(function(data){
                // console.log(data);  
                fn(data);
                //this is where you will use the data that was clicked to create the boxes and add the data to the page.
            });
        })
    });
}

function dataToTranslate(searchString, language){
    
    var data = {
        "key": googleTranslate,
        "q": searchString,
        "target": language
    };
    return data;
}
function retrieveTranslation(data, translationsAlreadyMade){
    if (translationsAlreadyMade[data['q']]){
        // console.log(translationsAlreadyMade[data['q']]);
        var P = translationsAlreadyMade[data['q']];
    }
    
    var P = $.post("https://translation.googleapis.com/language/translate/v2", data)
        .then(function(d){
            translationsAlreadyMade[data['q']] = d['data']['translations']['0']['translatedText'];
            var P = new Promise(function(resolve, reject){
                resolve(translationsAlreadyMade[data['q']]);
            
            });      
            return P;      
        });
    return P;
    // I have this commented out so that it does not run anytime you refresh
}
function printIt(text){
    console.log(text);
}

function returnURLForSymptomChecker(ID){
    return "https://sandbox-healthservice.priaid.ch/symptoms/" + ID + "/man";
}

function dataForSymptomChecker(){
    var data = {
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Impsam9obnMxMjE2QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiMTk1OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAxNy0wNy0yNiIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNTAxMjY4NjMyLCJuYmYiOjE1MDEyNjE0MzJ9.g6QT0iqEJpl8EB1w06_CimYFg-u_8wsi4QR5fB5B7hw',
        language: 'en-gb',
        format:"json",
    }
    return data;
}
function retrieveSymptoms(ID){
    return $.get(returnURLForSymptomChecker(ID), dataForSymptomChecker())
    
}
initialize();

//puts symptoms and translations into dictionary? J+N
function formatGetRequest(translationsAlreadyMade, rawData){
    var newDictionary = {};
    var translationResults = $.map(rawData, function(obj){
        var searchString = obj['Name'];
        var language = $('[data-target="lang-selector"] select').val();
        var searchData = dataToTranslate(searchString, language);
        return retrieveTranslation(searchData, translationsAlreadyMade)
    });
    return Promise.all(translationResults).then(function(arrayOfResults){
        var dictionary = {}
        $.each(rawData, function(key, value){
            dictionary[value['Name']] = arrayOfResults[key];
        })
        return dictionary;
        // return test;
    })
    
}


function promiseChainToGetSymptomsAndTranslate(translationsAlreadyMade, ID){
    // console.log(translationsAlreadyMade)
    //yes this is a terrible name. I need to build the big function that i talk about above.
    return retrieveSymptoms(ID).then(formatGetRequest.bind(this, translationsAlreadyMade));
}

//base url: https://sandbox-healthservice.priaid.ch/

//want a function that accepts my dom element(object tag with the svg), the name of the selector inside of the svg file, then a function that I will associate with the click event. 
