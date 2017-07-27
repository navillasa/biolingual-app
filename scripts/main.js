var BACK_ELEMENT = document.getElementById("backsvg");

function initialize(){
    // var data = dataToTranslate();
    var translationsAlreadyMade = {
        house: "casa",
    };
    
    console.log($('[data-role="upper-back"]'));
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
        

    })
    
}

function dataToTranslate(searchString, language){
    var data = {
        "key": "AIzaSyCE7H2z-RTJBWk12jV2JIJTnU83ryAJD3Q",
        "q": searchString,
        "target": language
    };
    // console.log(language);
    return data;
}

function querySymptomCheckerApi(){
    var data = {
        "token": 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Impsam9obnMxMjE2QGdtYWlsLmNvbSIsInJvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc2lkIjoiMTk1OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdmVyc2lvbiI6IjIwMCIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbGltaXQiOiI5OTk5OTk5OTkiLCJodHRwOi8vZXhhbXBsZS5vcmcvY2xhaW1zL21lbWJlcnNoaXAiOiJQcmVtaXVtIiwiaHR0cDovL2V4YW1wbGUub3JnL2NsYWltcy9sYW5ndWFnZSI6ImVuLWdiIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9leHBpcmF0aW9uIjoiMjA5OS0xMi0zMSIsImh0dHA6Ly9leGFtcGxlLm9yZy9jbGFpbXMvbWVtYmVyc2hpcHN0YXJ0IjoiMjAxNy0wNy0yNiIsImlzcyI6Imh0dHBzOi8vc2FuZGJveC1hdXRoc2VydmljZS5wcmlhaWQuY2giLCJhdWQiOiJodHRwczovL2hlYWx0aHNlcnZpY2UucHJpYWlkLmNoIiwiZXhwIjoxNTAxMTc0MzE4LCJuYmYiOjE1MDExNjcxMTh9.bOLjc8EbVUAowZuNwQrHB4_Zk3CoUfmWTXzJxnJjqZM',
        
    }
}


//base url: https://sandbox-healthservice.priaid.ch/

function retrieveTranslation(data, translationsAlreadyMade){
    // console.log(translationsAlreadyMade[data['q']]);
    if (translationsAlreadyMade[data['q']]){
        console.log(translationsAlreadyMade[data['q']])
        return translationsAlreadyMade[data['q']];
    }
    // $.post("https://translation.googleapis.com/language/translate/v2", data, printIt)
    //     .then(function(d){
    //         console.log(translationsAlreadyMade[data['q']] = d['data']['translations']['0']['translatedText']);
    //         translationsAlreadyMade[data['q']] = d['data']['translations']['0']['translatedText'];
    //     });
    //I have this commented out so that it does not run anytime you refresh
}

// function addEventListener() {
//     BACK_SELECTOR.addEventListener("load", function() {
//         // get the inner DOM of svg
//         var svgDoc = BACK_SELECTOR.contentDocument;
//         // get the inner element by ID
//         var upper_back = svgDoc.getElementById("upper_back");
//         // add action
//         upper_back.addEventListener("mousedown", function() {
//             alert("it's my upper back!");
//         }, false);
//     }, false);
// }

// addEventListener();

function printIt(text){
    console.log('success');
}

initialize();

//want a function that accepts my dom element(object tag with the svg), the name of the selector inside of the svg file, then a function that I will associate with the click event. 
