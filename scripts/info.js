function turnOnSymp() {
    $('.symp-display').show();
    console.log("on");
}

function turnOffSymp() {
    $('.symp-display').hide();
    console.log('off');
}

function turnOnWiki() {
    $('.wiki').show();
    console.log("on");
}

function turnOffWiki() {
    $('.wiki').hide();
    console.log('off');
}


// function selectLang() {
//    console.log($('[data-target=select]').val());
// }

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
        
        // $('[data-target=select]').on('change', selectLang);  
