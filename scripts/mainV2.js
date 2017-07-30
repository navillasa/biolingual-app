
// Global Variables

var GOOGLE_URL = "https://translation.googleapis.com/language/translate/v2";
var APIMEDIC_URL = "https://sandbox-healthservice.priaid.ch/symptoms/";
var FULL_BODY_ELEMENT = document.getElementById("fullbodysvg");
var BODY_PART_SELECTOR = '[data-target="main-panel"] button';



function initialize(){
    var translationDictionary = {
        "house": "casa",
        "Pain in the limbs": "Dolor en las extremidades",
        "Tremor at rest": "Temblor en reposo",
        "Paralysis": "Parálisis",
        "Swollen glands in the armpits": "Glándulas inflamadas en las axilas"
    };
    $(document).ready(function() {
        // once the document loads, then you can do stuff to it
        $(BODY_PART_SELECTOR).click(function(button){
            var searchString = button['target']['value'];
            var language = $('[data-target="lang-selector"] select').val();
            var searchData = dataToTranslate(searchString, language);
            retrieveTranslation(searchData, translationDictionary);
        })

        clickOnTheBoxes("#fullbodysvg", translationDictionary, printIt)
    })

}

function clickOnTheBoxes(elementToSelect, translationDictionary, fn){
    $(elementToSelect).on("load", function(event){
        var a = FULL_BODY_ELEMENT;
        var svgDoc = a.contentDocument;
        var svgRoot  = svgDoc.documentElement;
        $(svgRoot).find('rect').on("click", function(event){
            var ID = event["currentTarget"]["id"];
            promiseChainToGetSymptomsAndTranslate(translationDictionary, ID).then(function(data){
                // console.log(data);  
                fn(data);
                //this is where you will use the data that was clicked to create the boxes and add the data to the page.
            });
        })
    });
}

function dataToTranslate(searchString, language){
    var data = {
        "key": googleTranslateToken,
        "q": searchString,
        "target": language
    };
    return data;
}

function retrieveTranslation(data, translationDictionary){
    if (translationDictionary[data['q']]){
        // console.log(translationDictionary[data['q']]);
        var P = translationDictionary[data['q']];
    }
    
    var P = $.post(GOOGLE_URL, data)
        .then(function(d){
            translationDictionary[data['q']] = d['data']['translations']['0']['translatedText'];
            var P = new Promise(function(resolve, reject){
                resolve(translationDictionary[data['q']]);
            
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
    return APIMEDIC_URL + ID + "/man";
}

function dataForSymptomChecker(){
    var data = {
        token: apiMedicToken,
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
function formatGetRequest(translationDictionary, rawData){
    var newDictionary = {};
    var translationResults = $.map(rawData, function(obj){
        var searchString = obj['Name'];
        var language = $('[data-target="lang-selector"] select').val();
        var searchData = dataToTranslate(searchString, language);
        return retrieveTranslation(searchData, translationDictionary)
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


function promiseChainToGetSymptomsAndTranslate(translationDictionary, ID){
    // console.log(translationDictionary)
    //yes this is a terrible name. I need to build the big function that i talk about above.
    return retrieveSymptoms(ID).then(formatGetRequest.bind(this, translationDictionary));
}

//base url: https://sandbox-healthservice.priaid.ch/

//want a function that accepts my dom element(object tag with the svg), the name of the selector inside of the svg file, then a function that I will associate with the click event. 
