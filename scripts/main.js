

function initialize(){
    console.log('derp')
    const apiKey = "AIzaSyCE7H2z-RTJBWk12jV2JIJTnU83ryAJD3Q";
    var data = dataToTranslate();
    var translationAlreadyMade = {};
    makeRequestToTranslator(data).then();
    console.log(derp);

}

function dataToTranslate(){
    var searchString = "house"
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

function makeRequestToTranslator(data){
    return $.post("https://translation.googleapis.com/language/translate/v2", data, printIt);
}

function printIt(text){
    console.log('success');
}

initialize();