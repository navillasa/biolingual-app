var FULL_BODY_ELEMENT = document.getElementById("fullbodysvg");
var BODY_PART_SELECTOR = '[data-target="main-panel"] button';

//put the ggoel URL and apiURl in the APi.js doc
//make storedTranslations push and pull form local storage
//change the dictionary architecture to be by language and then by translation
//reject within recieve translations
//replace 'ID" with bodyNumID


function initialize(){
    
    
    // var data = dataToTranslate();
    var storedTranslations = {
        "house": "casa",
        "Pain in the limbs": "Dolor en las extremidades",
        "Tremor at rest": "Temblor en reposo",
        "Paralysis": "Parálisis",
        "Swollen glands in the armpits": "Glándulas inflamadas en las axilas"
    };
    $(document).ready(function() {

        $(BODY_PART_SELECTOR).click(function(bodyPartTarget){
            var searchString = bodyPartTarget['target']['value'];
            var language = $('[data-target=select]').on('change', function() {
                return $('[data-target=select]').val();
            });
            //var language = $(LANGUAGE_SELECTOR).val();
            var queryDictionary = dataToTranslate(searchString, language); // this makes a formatted 'package' of the language and search item to send to google translate
            retrieveTranslation(queryDictionary, storedTranslations);
        });

        clickOnTheBoxes("#fullbodysvg", storedTranslations, drawToDom)
    })

}

function clickOnTheBoxes(elementToSelect, storedTranslations, drawToDom){
    $(elementToSelect).on("load", function(event){
        var a = FULL_BODY_ELEMENT; //why doesnt it work with FULL_BODY_ELEMENT.contentDocument? 
        var svgDoc = a.contentDocument;
        var svgRoot  = svgDoc.documentElement;
        $(svgRoot).find('rect').on("click", function(event){
            var ID = event["currentTarget"]["id"];
            promiseChainToGetSymptomsAndTranslate(storedTranslations, ID).then(function(data){
                // console.log(data);  
                drawToDom(data);
                //this is where you will use the data that was clicked to create the boxes and add the data to the page.
            });
        })
   });
}

function dataToTranslate(searchString, language) {
    var data = {
        "key": googleTranslateToken,
        "q": searchString,
        "target": language
    };
    return data;
}

function retrieveTranslation(queryData, storedTranslations){
    if (storedTranslations[queryData['q']]){
        // console.log(storedTranslations[queryData['q']]);
        return storedTranslations[queryData['q']];
    }
    
    var P = $.post("https://translation.googleapis.com/language/translate/v2", queryData)
        .then(function(d){
            storedTranslations[queryData['q']] = d['data']['translations']['0']['translatedText'];
            var P = new Promise(function(resolve, reject){
                resolve(storedTranslations[queryData['q']]);
            
            });      
            return P;      
        });
    }
    return translation;
}

function drawToDom(text){
    console.log(text);
}

function returnURLForSymptomChecker(ID){
    return "https://sandbox-healthservice.priaid.ch/symptoms/" + ID + "/woman";
}

function dataForSymptomChecker(){
    var data = {
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Impsam9obnMxMjE2QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiMTk1OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAxNy0wNy0yNiIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNTAxNTEzNDgzLCJuYmYiOjE1MDE1MDYyODN9.krWGk_z-EJuaGpG8K5masRY1L1DFJj4tm48LDrri2YU',
        language: 'en-gb',
        format: 'json',
    }


    return data;
}

function retrieveSymptoms(ID){
    return $.get(returnURLForSymptomChecker(ID), dataForSymptomChecker());  
}

initialize();

function formatGetRequest(storedTranslations, rawData){
    var newDictionary = {};
    var translationResults = $.map(rawData, function(obj){
        var searchString = obj['Name'];
        var language = $(LANGUAGE_SELECTOR).val();
        var searchData = dataToTranslate(searchString, language);
        return retrieveTranslation(searchData, storedTranslations)
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

function promiseChainToGetSymptomsAndTranslate(storedTranslations, ID){
    // console.log(storedTranslations)
    //yes this is a terrible name. I need to build the big function that i talk about above.
    return retrieveSymptoms(ID).then(formatGetRequest.bind(this, storedTranslations));
}



}
var storedTranslations = {};
//base url: https://sandbox-healthservice.priaid.ch/

//want a function that accepts my dom element(object tag with the svg), the name of the selector inside of the svg file, then a function that I will associate with the click event. 