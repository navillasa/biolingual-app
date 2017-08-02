var showWiki = true;
var showSymptoms = true;

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
        clickOnTheBoxes("#body-boxes", storedTranslations, drawToDom);
    })
}

function clickOnTheBoxes(elementToSelect, storedTranslations, drawToDom){
    $(elementToSelect).attr('data','images/body-boxes.svg?'+new Date().getTime())
        .on("load", function(event){
        var a = document.getElementById("body-boxes");
        var svgDoc = a.contentDocument;
        var svgRoot  = svgDoc.documentElement;
        
        $(svgRoot).find('[data-target="body-part"]').on("click", function(event){
            createsPromiseChain(event, storedTranslations); 
            
            $('[data-target=select]').change(function(event2){
                createsPromiseChain(event, storedTranslations); 
            })
        })
   });
}

function createsPromiseChain(event, storedTranslations){
    var bodyInfo = event["currentTarget"]["dataset"];
    promiseChainToGetSymptomsAndTranslate(storedTranslations, bodyInfo)
        .then(function(data){
            drawToDom(data);
        })
        .catch(catchError);
}

function promiseChainToGetSymptomsAndTranslate(storedTranslations, bodyInfo){
    return retrieveSymptoms(bodyInfo['id']).then(formatGetRequest.bind(this, storedTranslations, bodyInfo['bodyPart']));
}

function retrieveSymptoms(bodyNumID){
    return $.get(returnURLForSymptomChecker(bodyNumID), dataForSymptomChecker())
}

function formatGetRequest(storedTranslations, bodyPart, rawData){
    var translationPromises = [];

    translationPromises.push(translateSingleWord(bodyPart).then(function(text){
        localStorage.setItem("bodyPartEnglish", JSON.stringify(bodyPart));
        localStorage.setItem('bodyPartTranslated', JSON.stringify(text));
    }));

    translationPromises.push(translateSingleWord('Symptoms').then(function(text){
        localStorage.setItem('Symptoms', JSON.stringify(text));

    }));
    
    return Promise.all(translationPromises).then(function(){
        var newDictionary = {
        };
        var translationResults = $.map(rawData, function(obj){
            var searchString = obj['Name'];
            var language = $('[data-target="select"]').val();
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
            });      
            return P;      
        });
    return P;
    }

function catchError(text){
    console.log(text);
}

function drawToDom(text){
    $(".results").remove();
    $('.main').append($("<div class='results' data-target='results'></div>").append('<span class="close">&times;</span> '));
    $('.results').append($("<div class='main-box'></div>"));
    $('.results').append($("<div class='second-box'></div"));
    $('.results').append($("<div class='third-box'></div"));
    createRow("English", $('[data-target="select"]')['0']['selectedOptions']['0']['dataset']['name'], createHeader, "language-part-display", ".second-box");
    $('.main-box').append(createRow(pullDataFromLocalStorage("bodyPartEnglish"), pullDataFromLocalStorage('bodyPartTranslated'), createLangHeader, "language-part-display", ".second-box"));
    createRow('Symptoms', pullDataFromLocalStorage('Symptoms'), createHeader, "symp-display", ".third-box");
        $.each(text, function(data){
        createRow(data, text[data], createColumn, "symp-display", ".third-box");
        })
    createLink(pullDataFromLocalStorage("bodyPartEnglish"), 'wiki');
    $('.close').on('click', function(event){
        $(".results").remove();
    })
    if(showSymptoms == false){
        turnOffSymp();
    }
    else{
        turnOnSymp();
    }

    if(showWiki == false){
        turnOffWiki();
    }
    else{
        turnOnWiki();
    }    
}

function createRow(info1, info2, fn, className, boxDestination){
    $(boxDestination).append($('<div class="' + className + '">').append(fn(info1)).append(fn(info2)));
}

function createColumn(info){
    return $("<div>" + info + "</div>"); 
}
function createHeader(info) {
    return $("<div class='table-header'>" + info + "</div>"); 
}

function createLangHeader(info) {
    return $("<div class='lang-title'>" + info + "</div>"); 
}

function createLink(bodyPart, className){
    $('.third-box').append($('<div class="wiki-style" ><a href="https://en.wikipedia.org/wiki/' + bodyPart + '"target="_blank" class="' + className + '"rel="noopener noreferrer">English Wikipedia</a></td></div>'));
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
    var language = $('[data-target="select"]').val();
    var queryData = dataToTranslate(bodyPart, language);
    return $.post(GOOGLE_URL, queryData)
        .then(function(d){
            return d['data']['translations']['0']['translatedText'];
        })
}

initialize();



