function turnOnSymp() {
    $('.symp-display').show();
    showSymptoms = true;
}

function turnOffSymp() {
    $('.symp-display').hide();
    showSymptoms = false;
}

function turnOnWiki() {
    $('.wiki-style').show();
    showWiki = true;
}

function turnOffWiki() {
    $('.wiki-style').hide();
    showWiki = false;
}

$('[data-target=info-off]').on('click', turnOffWiki);
$('[data-target=sym-on]').on('click', turnOnSymp);
$('[data-target=sym-off]').on('click', turnOffSymp);
$('[data-target=info-on]').on('click', turnOnWiki);
 
