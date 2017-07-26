

function initialize(){
    const apiKey = "AIzaSyCE7H2z-RTJBWk12jV2JIJTnU83ryAJD3Q";
    var data = dataToTranslate();
    var translationsAlreadyMade = {
        house: "casa",
    };
    makeRequestToTranslator(data, translationsAlreadyMade);
    console.log(translationsAlreadyMade);

}

function dataToTranslate(){
    var searchString = "mountains"
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
}

function printIt(text){
    console.log('success');
}

initialize();