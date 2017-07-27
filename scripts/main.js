

function initialize(){
    // var data = dataToTranslate();
    var translationsAlreadyMade = {
        house: "casa",
    };
    console.log($('[data-role="point1"]'));
    $(document).ready(function() {
        
        $('[data-target="main-panel"] button').click(function(button){
            var searchString = button['target']['value'];
            var language = $('[data-target="lang-selector"] select').val();
            var searchData = dataToTranslate(searchString, language);
            retrieveTranslation(searchData, translationsAlreadyMade);
        })
        $('[data-role="point1"]').click(function(){
            console.log('it worked');
        })

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

function printIt(text){
    console.log('success');
}

initialize();