function toggleMenu() {
    let menu = document.getElementById('menu');
    let button = document.querySelector('.menu-button');
    let overlay = document.getElementById('overlay');
    let body = document.body;

    menu.classList.toggle('open');
    button.classList.toggle('open');
    overlay.classList.toggle('open');

    if (menu.classList.contains('open')) {
        body.classList.toggle('no-scroll');
    } else {
        body.classList.remove('no-scroll');
    }
}

document.addEventListener('click', function(event) {
    let menu = document.getElementById('menu');
    let button = document.querySelector('.menu-button');
    let overlay = document.getElementById('overlay');
    let body = document.body;

    if (!menu.contains(event.target) && !button.contains(event.target)) {
        menu.classList.remove('open');
        button.classList.remove('open');
        overlay.classList.remove('open');
        body.classList.remove('no-scroll');
    }
});