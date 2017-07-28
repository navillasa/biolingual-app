function turnOn() {
    console.log("on");
}

function turnOff() {
    console.log('off');
}

function selectLang() {
   console.log($('[data-target=select]').val());
}




$('[data-target=info-on]').on('click', turnOn);
$('[data-target=info-off]').on('click', turnOff);

$('[data-target=sym-on]').on('click', turnOn);
$('[data-target=sym-off]').on('click', turnOff);


$('[data-target=select]').on('change', selectLang);
