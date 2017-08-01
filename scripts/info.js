function turnOnSymp() {
    $('.symp-display').show();
    showSymptoms = true;
}

function turnOffSymp() {
    $('.symp-display').hide();
    showSymptoms = false;
}

function turnOnWiki() {
    $('.wiki').show();
    showWiki = true;
}

function turnOffWiki() {
    $('.wiki').hide();
    console.log('off');
    showWiki = false;
}


function selectLang() {
   console.log($('[data-target=select]').val());
}

// function goToWiki(searchTerm) {
//     window.open('https://en.wikipedia.org/wiki/' + searchTerm);
// }


// $('[data-target=info-on]').on('click', function() {
//     goToWiki('Hand');
// });

  $('[data-target=info-off]').on('click', turnOffWiki);
        $('[data-target=sym-on]').on('click', turnOnSymp);
        $('[data-target=sym-off]').on('click', turnOffSymp);
        $('[data-target=info-on]').on('click', turnOnWiki);
        
        $('[data-target=select]').on('change', selectLang);  
