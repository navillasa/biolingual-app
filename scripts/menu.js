function showMenu() {
    $('.menu').toggleClass('open');
    $('.burger1').toggleClass('rotate-SE');
    $('.burger2').toggleClass('hide');
    $('.burger3').toggleClass('rotate-NE');
}

$('.burger-holder').on('click', showMenu);

