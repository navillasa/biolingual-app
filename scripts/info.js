function turnOn() {
    console.log("on");
}

function turnOff() {
    console.log('off');
}

function selectLang() {
   console.log($('[data-target=select]').val());
}

function goToWiki(searchTerm) {
    window.open('https://en.wikipedia.org/wiki/' + searchTerm);
}


$('[data-target=info-on]').on('click', function() {
    goToWiki('Hand');
});

$('[data-target=info-off]').on('click', turnOff);

$('[data-target=sym-on]').on('click', turnOn);
$('[data-target=sym-off]').on('click', turnOff);


$('[data-target=select]').on('change', selectLang);
