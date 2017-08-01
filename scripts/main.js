var FULL_BODY_ELEMENT = document.getElementById("body-boxes");
var showWiki = true;
var showSymptoms = true;
//derp


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
    
}

function clickOnTheBoxes(elementToSelect, storedTranslations, drawToDom){
    console.log($(elementToSelect).length);
    $(elementToSelect).attr('data','images/body-boxes.svg?'+new Date().getTime())
        .on("load", function(event){
    
        console.log('it loaded');
        var a = FULL_BODY_ELEMENT;
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
    $(".results").remove();
    $('.main').append($("<div class='results' data-target='results'></div>").append('<span class="close">&times;</span> '));
    $('.results').append($("<table></table>"));
    createRow("English", $('[data-target="select"]')['0']['selectedOptions']['0']['dataset']['name'], createHeader, "language-display");
    createRow(pullDataFromLocalStorage("bodyPartEnglish"), pullDataFromLocalStorage('bodyPartTranslated'), createLangHeader, "body-part-display");
    //if statement here if just change the datatarget to equal off
    createRow('Symptoms', pullDataFromLocalStorage('Symptoms'), createHeader, "symp-display");
        $.each(text, function(data){
        createRow(data, text[data], createColumn, "symp-display");
       
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
    var language = $('[data-target="select"]').val();
    var queryData = dataToTranslate(bodyPart, language);
    return $.post(GOOGLE_URL, queryData)
        .then(function(d){
            return d['data']['translations']['0']['translatedText'];
        })
    
    
}

initialize();

function createRow(info1, info2, fn, className){
    $('table').append($('<tr class="' + className + '">').append(fn(info1)).append(fn(info2)));
}

function createColumn(info){
    return $("<td>" + info + "</td>"); 
}
function createHeader(info) {
    return $("<th>" + info + "</th>"); 
}

function createLangHeader(info) {
    return $("<td class='lang-title'>" + info + "</td>"); 
}

function createLink(bodyPart, className){
    $('table').append($('<tr class="wiki-style" ><td colspan="2"><a href="https://en.wikipedia.org/wiki/' + bodyPart + '"target="_blank" class="' + className + '"rel="noopener noreferrer">English Wikipedia</a></td></tr>'));
    //center and fix sizing
}

function popUp (){
    var popUp = document.getElementsByClassName('results');
    var bodyButton = document.getElementsByClassName('body-part');
    var span = document.getElementsByClassName('close')[0];

    bodyButton.onclick = function () {
        results.style.display = 'block';
    }

    span.onclick = function () {
        results.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == results) {
            results.style.display = 'none';
        }
    }
}

function createsPromiseChain(event, storedTranslations){
    
    console.log('we found the rectangles')
    var bodyNumID = event["currentTarget"]["dataset"]['id'];
    var bodyInfo = event["currentTarget"]["dataset"];
    
    promiseChainToGetSymptomsAndTranslate(storedTranslations, bodyInfo)
        .then(function(data){
            console.log("we're in the promise chain");
            drawToDom(data);
        })
        // .catch(drawToDom);
}