var showWiki = true;
var showSymptoms = true;

function initialize(){
    $(document).ready(function() {
        console.log(translations);
        clickOnTheBoxes("#body-boxes", translations, drawToDom);
    })
}

function clickOnTheBoxes(elementToSelect, storedTranslations, drawToDom){
    $(elementToSelect).attr('data','images/body-boxes.svg?'+new Date().getTime())
        .on("load", function(event){
        var a = document.getElementById("body-boxes");
        var svgDoc = a.contentDocument;
        var svgRoot  = svgDoc.documentElement;
        
        $(svgRoot).find('[data-target="body-part"]').on("click", function(event){
            checkDictionary(event, storedTranslations)
            
            $('[data-target=select]').change(function(event2){
                checkDictionary(event,storedTranslations)
            })
        })
   });
}

function checkDictionary(event, storedTranslations){
    var bodyInfo = event["currentTarget"]["dataset"];
    drawToDom(bodyInfo.bodyPart)
}
// function createsPromiseChain(event, storedTranslations){
//     var bodyInfo = event["currentTarget"]["dataset"];
//     promiseChainToGetSymptomsAndTranslate(storedTranslations, bodyInfo)
//         .then(function(data){
//             drawToDom(data);
//         })
//         .catch(catchError);
// }

// function promiseChainToGetSymptomsAndTranslate(storedTranslations, bodyInfo){
//     return retrieveSymptoms(bodyInfo['id']).then(formatGetRequest.bind(this, storedTranslations, bodyInfo['bodyPart']));
// }

// function retrieveSymptoms(bodyNumID){
//     return $.get(returnURLForSymptomChecker(bodyNumID), dataForSymptomChecker())
    
// }

// function formatGetRequest(storedTranslations, bodyPart, rawData){
//     var translationPromises = [];

//     translationPromises.push(translateSingleWord(bodyPart).then(function(text){
//         localStorage.setItem("bodyPartEnglish", JSON.stringify(bodyPart));
//         localStorage.setItem('bodyPartTranslated', JSON.stringify(text));
//     }));

//     translationPromises.push(translateSingleWord('Symptoms').then(function(text){
//         localStorage.setItem('Symptoms', JSON.stringify(text));

//     }));
    
//     return Promise.all(translationPromises).then(function(){
//         var newDictionary = {
//         };
//         var translationResults = $.map(rawData, function(obj){
//             var searchString = obj['Name'];
//             var language = $('[data-target="select"]').val();
//             var searchData = dataToTranslate(searchString, language);
            
//             return retrieveTranslation(searchData, storedTranslations);
        
//         });
//         return Promise.all(translationResults).then(function(arrayOfResults){
//             var dictionary = {}
//             $.each(rawData, function(key, value){
//                 dictionary[value['Name']] = arrayOfResults[key];
//             })
//             return dictionary;
//         });
//     })
    
    
// }

// function dataToTranslate(searchString, language) {
//     var data = {
//         "key": googleTranslateToken,
//         "q": searchString,
//         "target": language
//     };
//     return data;
// }

// function retrieveTranslation(queryData, storedTranslations){
//     if ((pullDataFromLocalStorage('storedTranslations'))[queryData.target][queryData.q]){
//         return (pullDataFromLocalStorage('storedTranslations'))[queryData.target][queryData.q];
//     }
    
//     var P = $.post(GOOGLE_URL, queryData)
//         .then(function(d){
//             console.log('called the server');
//             storedTranslations[queryData.target][queryData['q']] = d['data']['translations']['0']['translatedText'];
//             sendDataToLocalStorage(storedTranslations[queryData.target], queryData.target)
//             var P = new Promise(function(resolve, reject){
//                 resolve(storedTranslations[queryData.target][queryData['q']]);
//             });      
//             return P;      
//         });
//     return P;
//     }

// function catchError(text){
//     console.log(text);
// }

// function drawToDom(text){
//     $(".results").remove();
//     $('.main').append($("<div class='results' data-target='results'></div>").append('<span class="close">&times;</span> '));
//     $('.results').append($("<table></table>"));
//     createRow("English", $('[data-target="select"]')['0']['selectedOptions']['0']['dataset']['name'], createHeader, "language-display");
//     createRow(pullDataFromLocalStorage("bodyPartEnglish"), pullDataFromLocalStorage('bodyPartTranslated'), createLangHeader, "body-part-display");
//     createRow('Symptoms', pullDataFromLocalStorage('Symptoms'), createHeader, "symp-display");
//         $.each(text, function(data){
//         createRow(data, text[data], createColumn, "symp-display");
       
//         })
//     createLink(pullDataFromLocalStorage("bodyPartEnglish"), 'wiki');
//     $('.close').on('click', function(event){
//         $(".results").remove();
//     })
//     if(showSymptoms == false){
//         turnOffSymp();
//     }
//     else{
//         turnOnSymp();
//     }

//     if(showWiki == false){
//         turnOffWiki();
//     }
//     else{
//         turnOnWiki();
//     }    
// }

function drawToDom(text){
    var lang = $('[data-target="select"]')['0']['selectedOptions']['0']['dataset']['name'];
    // console.log(lang);
    $(".results").remove();
    $('.main').append($("<div class='results' data-target='results'></div>").append('<span class="close">&times;</span> '));
    $('.results').append($("<table></table>"));
    createRow("English", $('[data-target="select"]')['0']['selectedOptions']['0']['dataset']['name'], createHeader, "language-display");
    createRow(text, text, createLangHeader, "body-part-display");
    createRow('Symptoms', "symptoms translation", createHeader, "symp-display");
        // $.each(text, function(data){
        // createRow(data, text[data], createColumn, "symp-display");
       
        // })
    
    translations["english"][text].forEach(function (data, idx){
        createRow(data, translations[lang][translations[lang][text]][idx], createColumn, "symp-display");
    })

    createLink(text, 'wiki');
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
}

// function returnURLForSymptomChecker(bodyNumID){
//     return APIMEDIC_URL + bodyNumID + "/woman";
// }

// function dataForSymptomChecker(){
//     var data = {
//         token: apiMedicToken,
//         language: 'en-gb',
//         format: 'json',
//     }
//     return data;
// }

// function sendDataToLocalStorage(data, language){
//     if (pullDataFromLocalStorage('storedTranslations') == null) {
//         var currentData = {
//         "es": {},
//         "zh-CN": {},
//         'fr': {}
//         };
//     }
//     else{
//         var currentData = pullDataFromLocalStorage('storedTranslations');
//     }
//     currentData[language] = data

//     localStorage.setItem('storedTranslations', JSON.stringify(currentData));
// }

// function pullDataFromLocalStorage(stringifiedJSONName){
//     return JSON.parse(localStorage.getItem(stringifiedJSONName));  
// }

// function translateSingleWord(bodyPart){
//     var language = $('[data-target="select"]').val();
//     var queryData = dataToTranslate(bodyPart, language);
//     return $.post(GOOGLE_URL, queryData)
//         .then(function(d){
//             return d['data']['translations']['0']['translatedText'];
//         })
// }

initialize();



