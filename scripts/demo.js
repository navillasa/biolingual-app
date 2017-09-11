var showWiki = true;
var showSymptoms = true;

function initialize(){
    $(document).ready(function() {
        clickOnTheBoxes("#body-boxes", translations, drawToDom);
    })
}

function clickOnTheBoxes(elementToSelect, drawToDom){
    $(elementToSelect).attr('data','images/body-boxes.svg?'+new Date().getTime())
        .on("load", function(event){
        var a = document.getElementById("body-boxes");
        var svgDoc = a.contentDocument;
        var svgRoot  = svgDoc.documentElement;
        
        $(svgRoot).find('[data-target="body-part"]').on("click", function(event){
            checkDictionary(event);
            
            $('[data-target=select]').change(function(event2){
                checkDictionary(event);
            })
        })
   });
}

function checkDictionary(event){
    var bodyInfo = event["currentTarget"]["dataset"];
    drawToDom(bodyInfo.bodyPart)
}

function drawToDom(text){
    var lang = $('[data-target="select"]')['0']['selectedOptions']['0']['dataset']['name'];
    $(".results").remove();
    $('.main').append($("<div class='results' data-target='results'></div>").append('<span class="close">&times;</span> '));
    $('.results').append($("<table></table>"));
    createRow("English", lang, createHeader, "language-display");
    createRow(text, translations[lang][text], createLangHeader, "body-part-display");
    createRow('Symptoms', translations[lang]["Symptoms"], createHeader, "symp-display");   
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
    $('table').append($('<tr class="wiki-style" ><td colspan="2"><a href="https://en.wikipedia.org/wiki/' + translations["english"]["wiki"][bodyPart] + '"target="_blank" class="' + className + '"rel="noopener noreferrer">English Wikipedia</a></td></tr>'));
}

initialize();



