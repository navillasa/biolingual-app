function turnOnInfo() {
    console.log("on");
}

function turnOffInfo() {
    console.log('off');
}


$('[data-target=info-on]').on('click', turnOnInfo);
$('[data-target=info-off]').on('click', turnOffInfo);



