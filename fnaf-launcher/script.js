let inMenu = true;
let currentIndex = 0;
const totalCards = 7; // Updated to reflect the removed games
let hovering = false;
let down = true;
let up = false;
let left = false;
let right = true;
let deactivate = true;

let musicKey = "musicOnOff";
let soundKey = "soundOnOff";

let playMusic = localStorage.getItem(musicKey);
let playSound = localStorage.getItem(soundKey);

const select = new Audio('sounds/blip.wav');
const error = new Audio('sounds/error.wav');
const bm = new Audio('sounds/background.wav');
const back = new Audio('sounds/back.wav');

bm.volume = 0.75;
bm.loop = true;

const cardSelector = document.querySelectorAll('.game-card');
const cardSelectorSource = document.querySelectorAll('.game-card a');
const menu = document.getElementById("menu");
const selection = document.getElementById("selection");
const options = document.querySelector('.launcher-options');
const musicIcon = document.querySelector('.music');
const soundIcon = document.querySelector('.sound');
const htmllinks = [
    '/five-nights-at-freddys',        
    '/five-nights-at-freddys-2',
    '/five-nights-at-freddys-3',
    '/five-nights-at-freddys-4',
    '/w',
    '/ps',  // Changed from '/pizzeria-simulator' to '/ps'
    '/ucn'
];

if (!playMusic) { playMusic = 'true'; localStorage.setItem(musicKey, playMusic); }
if (!playSound) { playSound = 'true'; localStorage.setItem(soundKey, playSound); }

if (playMusic === 'true') { musicIcon.src = 'images/icons/music.svg'; }
if (playMusic === 'false') { musicIcon.src = 'images/icons/music-off.svg'; }
if (playSound === 'true') { soundIcon.src = 'images/icons/sound.svg'; }
if (playSound === 'false') { soundIcon.src = 'images/icons/sound-off.svg'; }

function activator() {
    if (playSound === 'true') { back.currentTime = 0; back.play(); }
    menu.style.display = "none";
    selection.style.display = "flex";
    inMenu = false;
    setTimeout(function () {
        updateCarousel();
    }, 100);
    if (playMusic === 'true') {
        bm.play();
    }
}

function deactivator() {
    if (deactivate === true) {
        if (playSound === 'true') { back.currentTime = 0; back.play(); }
        setTimeout(function () {
            bm.pause();
            error.currentTime = 0;
        }, 10);

        menu.style.display = "flex";
        selection.style.display = "none";
        inMenu = true;
        hovering = false;
        down = true;
        up = false;
        left = false;
        right = true;
    }
    if (deactivate === false) { if (playSound === 'true') { back.currentTime = 0; back.play(); } }
}

document.addEventListener('keydown', function (event) {
    if (inMenu === false && event.keyCode == 37) { if (left === true) { gameSelection('left') } if (left === false) { if (playSound === 'true') { error.currentTime = 0; error.play(); } } if (currentIndex - 1 < 0) { left = false; } right = true }
    if (inMenu === false && event.keyCode == 39) { if (right === true) { gameSelection('right') } if (right === false) { if (playSound === 'true') { error.currentTime = 0; error.play(); } } if (currentIndex + 1 > 6) { right = false; } left = true }
    if (inMenu === false && event.keyCode == 40) { if (down === true) { playButtonHover(true); } if (down === false) { if (playSound === 'true') { error.currentTime = 0; error.play(); } } down = false; up = true }
    if (inMenu === false && event.keyCode == 38) { if (up === true) { playButtonHover(); } if (up === false) { if (playSound === 'true') { error.currentTime = 0; error.play(); } } up = false; down = true }
    if (event.keyCode == 13) { if (inMenu === true) { activator(); } if (inMenu === false && hovering === true) { window.open(htmllinks[currentIndex], "_self"); deactivator() } }
    if (inMenu === false && event.keyCode == 32) { if (hovering === true) { window.open(htmllinks[currentIndex], "_self"); deactivator() } }
    if (inMenu === false && event.keyCode == 27) { deactivate = true; deactivator(); }
})

function gameSelection(direction) {
    if (direction === "left" && currentIndex - 1 > -1) { changeGameSelected(currentIndex - 1); }
    if (direction === "right" && currentIndex + 1 < 7) { changeGameSelected(currentIndex + 1); }
}

function playButtonHover(cancel) {
    cardSelector.forEach(card => card.classList.remove('hover'));
    hovering = false;
    if (playSound === 'true') {
        select.currentTime = 0;
        select.play();
    }
    if (cancel === true) { cardSelector[currentIndex].classList.add('hover'); hovering = true; }
}

function updateCarousel() {
    const slider = document.querySelector('.cards-section');
    const cardWidth = document.querySelector('.game-card').offsetWidth;
    const newPosition = -currentIndex * (cardWidth / 2 + 5);
    slider.style.transform = `translateX(${newPosition}px)`;
    changeGameSelected(currentIndex);
}

function changeGameSelected(index) {
    if (index > 0) { left = true; }
    changeIndex = index - currentIndex

    if (changeIndex < 0) {
        // Handle the selection change here
    }
    
    currentIndex = index; // Ensure the index updates
    updateCarousel();

    if (playSound === 'true') {
        select.currentTime = 0;
        select.play();
    }

    cardSelector.forEach(card => card.classList.remove('selected'));

    cardSelector[index].classList.add('selected');
    cardSelector.forEach(card => card.classList.remove('hover'));
    if (hovering === true) {
        cardSelector[currentIndex].classList.add('hover');
    }
    else { hovering = false; }
}