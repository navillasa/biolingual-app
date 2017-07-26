

function initialize(){
    const apiKey = "AIzaSyCE7H2z-RTJBWk12jV2JIJTnU83ryAJD3Q";
    var data = dataToTranslate();
    var translationsAlreadyMade = {
        house: "casa",
    };
    
    $(document).ready(function() {
        $('[data-target="main-panel"]').find($("button")).click(function(button){
            var searchData = dataToTranslate(button['target']['dataset']['target']);
            // console.log(button['target']['dataset']['target']);
            console.log(translationsAlreadyMade);
            makeRequestToTranslator(searchData, translationsAlreadyMade);
        })
    })

}

function dataToTranslate(searchString){
    var targetLanguage = "es"
    var data = {
        "key": "AIzaSyCE7H2z-RTJBWk12jV2JIJTnU83ryAJD3Q",
        "q": searchString,
        "target": targetLanguage
    };
    return data;
}
//I am building this out like this because later we will be pulling the searchstring, the language and possibly other things. 
//We can replace Searchstring/targetLanguage with another function to grab the text.

function makeRequestToTranslator(data, translationsAlreadyMade){
    // console.log(translationsAlreadyMade[data['q']]);
    if (translationsAlreadyMade[data['q']]){
        return translationsAlreadyMade[data['q']];
    }
    $.post("https://translation.googleapis.com/language/translate/v2", data, printIt)
        .then(function(d){
            translationsAlreadyMade[data['q']] = d['data']['translations']['0']['translatedText'];
        });
    //I have this commented out so that it does not run anytime you refresh
}

function printIt(text){
    console.log('success');
}

initialize();