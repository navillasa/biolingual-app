var FULL_BODY_ELEMENT = document.getElementById("body-boxes");
var BODY_PART_SELECTOR = '[data-target="main-panel"] button';
var LANGUAGE_SELECTOR = '[data-target="select"]';
//derp

//reject within recieve translations
//TODO I need to create a dictionary that gets all the translation for symptoms and for each body part
//or you just need to 


function initialize(){
    if(pullDataFromLocalStorage('storedTranslations') == null){
        var storedTranslations = {
        "es": {},
        "zh-CN": {},
        'fr': {},
        "tl": {},
        "vi":{},
        "ko":{},
        "de":{},
        "ar":{},
        "ru":{},
        };
        localStorage.setItem('storedTranslations', JSON.stringify(storedTranslations));
    }else {
        var storedTranslations = pullDataFromLocalStorage('storedTranslations');
    }
    $(document).ready(function() {
        console.log('derp');
        clickOnTheBoxes("#body-boxes", storedTranslations, drawToDom);
        
        
    })
    
    createRow('Tim', 'Jen');
    

    
}

function clickOnTheBoxes(elementToSelect, storedTranslations, drawToDom){
    console.log($(elementToSelect).length);
    $(elementToSelect).on("load", function(event){
        console.log('it loaded');
        var a = FULL_BODY_ELEMENT;
        var svgDoc = a.contentDocument;
        var svgRoot  = svgDoc.documentElement;
        
        $(svgRoot).find('[data-target="body-part"]').on("click", function(event){
            $(".results").remove();
            // $(".main").remove($());
            console.log('we found the rectangles')
            var bodyNumID = event["currentTarget"]["dataset"]['id'];
            var bodyInfo = event["currentTarget"]["dataset"];
            
            promiseChainToGetSymptomsAndTranslate(storedTranslations, bodyInfo)
                .then(function(data){
                    console.log("we're in the promise chain");
                    drawToDom(data);
                    
                    //this is where you will use the data that was clicked to create the boxes and add the data to the page.
                })
                // .catch(drawToDom);
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
    if ((pullDataFromLocalStorage('storedTranslations'))[queryData.target][queryData.q]){
        return (pullDataFromLocalStorage('storedTranslations'))[queryData.target][queryData.q];
    }
    
    var P = $.post(GOOGLE_URL, queryData)
        .then(function(d){
            console.log('called the server');
            storedTranslations[queryData.target][queryData['q']] = d['data']['translations']['0']['translatedText'];
            sendDataToLocalStorage(storedTranslations[queryData.target], queryData.target)
            var P = new Promise(function(resolve, reject){
                resolve(storedTranslations[queryData.target][queryData['q']]);
            //TO DO Get rid of storedTranslations all together
            });      
            return P;      
        });
    return P;
    }


function drawToDom(text){
    $('.main').append($("<div class='results' data-target='results'></div>"));
    $('.results').append($("<table></table>"));
    createRow(pullDataFromLocalStorage("bodyPartEnglish"), pullDataFromLocalStorage('bodyPartTranslated'));
    createRow('Symptoms', pullDataFromLocalStorage('Symptoms'))
}

function returnURLForSymptomChecker(bodyNumID){
    return APIMEDIC_URL + bodyNumID + "/woman";
}

function dataForSymptomChecker(){
    var data = {
        token: apiMedicToken,
        language: 'en-gb',
        format: 'json',
    }
    return data;
}
function retrieveSymptoms(bodyNumID){
    return $.get(returnURLForSymptomChecker(bodyNumID), dataForSymptomChecker())
    
}
function formatGetRequest(storedTranslations, bodyPart, rawData){
    var translationPromises = [];

    translationPromises.push(translateSingleWord(bodyPart).then(function(text){
        // console.log(text);
        localStorage.setItem("bodyPartEnglish", JSON.stringify(bodyPart));
        localStorage.setItem('bodyPartTranslated', JSON.stringify(text));
    }));
    translationPromises.push(translateSingleWord('Symptoms').then(function(text){
        // console.log(text);
        localStorage.setItem('Symptoms', JSON.stringify(text));
        //text here to add symptoms / translation
        //push this to local storage
    }));
    
    return Promise.all(translationPromises).then(function(){
        var newDictionary = {
        };
        var translationResults = $.map(rawData, function(obj){
            var searchString = obj['Name'];
            var language = $(LANGUAGE_SELECTOR).val();
            var searchData = dataToTranslate(searchString, language);
            
            return retrieveTranslation(searchData, storedTranslations);
        
        });
        return Promise.all(translationResults).then(function(arrayOfResults){
            var dictionary = {}
            $.each(rawData, function(key, value){
                dictionary[value['Name']] = arrayOfResults[key];
            })
            return dictionary;
        });
    })
    
    
}


function promiseChainToGetSymptomsAndTranslate(storedTranslations, bodyInfo){
    return retrieveSymptoms(bodyInfo['id']).then(formatGetRequest.bind(this, storedTranslations, bodyInfo['bodyPart']));
}

function sendDataToLocalStorage(data, language){
    if (pullDataFromLocalStorage('storedTranslations') == null) {
        var currentData = {
        "es": {},
        "zh-CN": {},
        'fr': {},
        "tl": {},
        "vi":{},
        "ko":{},
        "de":{},
        "ar":{},
        "ru":{},
    };
    }
    else{
        var currentData = pullDataFromLocalStorage('storedTranslations');
    }
    currentData[language] = data

    localStorage.setItem('storedTranslations', JSON.stringify(currentData));
}
function pullDataFromLocalStorage(stringifiedJSONName){
    return JSON.parse(localStorage.getItem(stringifiedJSONName));
    
}

function translateSingleWord(bodyPart){
    var language = $(LANGUAGE_SELECTOR).val();
    var queryData = dataToTranslate(bodyPart, language);
    return $.post(GOOGLE_URL, queryData)
        .then(function(d){
            return d['data']['translations']['0']['translatedText'];
        })
    
    
}

initialize();

function createRow(info1, info2){
    $('table').append($('<tr>').append(createColumn(info1)).append(createColumn(info2)));
    // $('table').append
    // $('table').append(createColumn(info2));
}

function createColumn(info){
   return $("<th>" + info + "</th>"); 
}

function listAllItems(){  
    for (i=0; i<=localStorage.length-1; i++)  
    {  
        key = localStorage.key(i);  
        if(key !== 'Symptoms' && key !== 'storedTranslations'){
            return key;
        }
    }  
}