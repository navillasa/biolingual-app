
// Global Variables

var GOOGLE_URL = "https://translation.googleapis.com/language/translate/v2";
var APIMEDIC_URL = "https://sandbox-healthservice.priaid.ch/symptoms/";
var FULL_BODY_ELEMENT = document.getElementById("fullbodysvg");
var BODY_PART_SELECTOR = '[data-target="main-panel"] button';
var LANGUAGE_SELECTOR = '[data-target="lang-selector"] select';


function initialize(bodyPart){
    var storedTranslations = {
        // "house": "casa",
        // "Pain in the limbs": "Dolor en las extremidades",
        // "Tremor at rest": "Temblor en reposo",
        // "Paralysis": "Parálisis",
        // "Swollen glands in the armpits": "Glándulas inflamadas en las axilas"
    };
    $(document).ready(function() {
        // .ready(): once the document loads, then you can do stuff to it
        $(BODY_PART_SELECTOR).click(function(bodyPartTarget){
            var searchString = bodyPartTarget['target']['value'];
            var language = $(LANGUAGE_SELECTOR).val();
            var queryDictionary = dataToTranslate(searchString, language); // this makes a formatted 'package' of the language and search item to send to google translate
            retrieveTranslation(queryDictionary, storedTranslations);
        })

        clickOnTheBoxes("#fullbodysvg", storedTranslations, printIt)
    })

}

function clickOnTheBoxes(elementToSelect, storedTranslations, fn){
    $(elementToSelect).on("load", function(event){
        var a = FULL_BODY_ELEMENT;
        var svgDoc = a.contentDocument;
        var svgRoot  = svgDoc.documentElement;
        $(svgRoot).find('rect').on("click", function(event){
            var ID = event["currentTarget"]["id"];
            promiseChainToGetSymptomsAndTranslate(storedTranslations, ID).then(function(data){
                // console.log(data);  
                fn(data);
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
function retrieveTranslation(queryDictionary, storedTranslations){
    if (storedTranslations[queryDictionary['q']]){
        // console.log(storedTranslations[data['q']]);
        var translation = storedTranslations[queryDictionary['q']];
    } else {
        var translation = $.post(GOOGLE_URL, queryDictionary)
            translation.then(function(googleApiObject){
                // this makes a new key in storedTranslations dictionary, then on the right side, it's referencing results from google translate
                storedTranslations[queryDictionary['q']] = googleApiObject['data']['translations']['0']['translatedText'];
                var translation = new Promise(function(resolve, reject){
                // why did we re-assign 'P' aka 'translation' instead of just calling translation again?
                // why did this need to be a new promise?
                // do we need a reject function..?
                    resolve(storedTranslations[queryDictionary['q']]);    
                });      
                return translation;      
        });
    }
    return translation;
}

function printIt(text){
    console.log(text);
}

function returnURLForSymptomChecker(ID){
    return APIMEDIC_URL + ID + '/man';
}

function dataForSymptomChecker(){
    var data = {
        token: apiMedicToken,
        language: 'en-gb',
        format: 'json',
    }
    return data;
}

function retrieveSymptoms(ID){
    return $.get(returnURLForSymptomChecker(ID), dataForSymptomChecker())  
}

initialize();

//puts symptoms and translations into dictionary? J+N
function formatGetRequest(storedTranslations, rawData){
    // which rawData??
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

//base url: https://sandbox-healthservice.priaid.ch/

//want a function that accepts my dom element(object tag with the svg), the name of the selector inside of the svg file, then a function that I will associate with the click event. 