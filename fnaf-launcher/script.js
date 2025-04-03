const steamlinks = [
    '/five-nights-at-freddys',
    '/five-nights-at-freddys-2',
    '/five-nights-at-freddys-3',
    '/five-nights-at-freddys-4',
    '/five-nights-at-freddys-world',
    '/five-nights-at-freddys-6',
    '/five-nights-at-freddys-7',
    '/five-nights-at-freddys-ucn',
    '/five-nights-at-freddys-ps'
    // Removed Sister Location, all Help Wanteds, and Security Breach
];

const htmllinks = [
    'https://irv77.github.io/hd_fnaf/1/',
    'https://irv77.github.io/hd_fnaf/2/',
    'https://irv77.github.io/hd_fnaf/3/',
    'https://irv77.github.io/hd_fnaf/4/',
    'https://irv77.github.io/hd_fnaf/w/',
    'https://irv77.github.io/hd_fnaf/ps/',
    'https://irv77.github.io/hd_fnaf/ucn/'
    // Removed Sister Location, all Help Wanteds, and Security Breach
];

const totalCards = 8; // Since we removed 3 games, the total cards now should be 8

// Adjust the logic for the selection carousel
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
        currentIndex = (currentIndex + changeIndex + totalCards) % totalCards;
        updateCarousel();
    }

    if (changeIndex > 0) {
        currentIndex = (currentIndex + changeIndex) % totalCards;
        updateCarousel();
    }
    if (playSound === 'true') {
        select.currentTime = 0;
        select.play();
    }
    cardSelector.forEach(card => card.classList.remove('scale1', 'scale2', 'scale3', 'scale4', 'scale5', 'scale6', 'scale7', 'scale8', 'scale9', 'scale10'));

    // Only add scales for the remaining cards
    if (index - 1 > -1) { cardSelector[index - 1].classList.add('scale1'); }
    if (index + 1 < totalCards) { cardSelector[index + 1].classList.add('scale1'); }
    if (index - 2 > -1) { cardSelector[index - 2].classList.add('scale2'); }
    if (index + 2 < totalCards) { cardSelector[index + 2].classList.add('scale2'); }
    if (index - 3 > -1) { cardSelector[index - 3].classList.add('scale3'); }
    if (index + 3 < totalCards) { cardSelector[index + 3].classList.add('scale3'); }
    if (index - 4 > -1) { cardSelector[index - 4].classList.add('scale4'); }
    if (index + 4 < totalCards) { cardSelector[index + 4].classList.add('scale4'); }
    if (index - 5 > -1) { cardSelector[index - 5].classList.add('scale5'); }
    if (index + 5 < totalCards) { cardSelector[index + 5].classList.add('scale5'); }
    if (index - 6 > -1) { cardSelector[index - 6].classList.add('scale6'); }
    if (index + 6 < totalCards) { cardSelector[index + 6].classList.add('scale6'); }
    if (index - 7 > -1) { cardSelector[index - 7].classList.add('scale7'); }
    if (index + 7 < totalCards) { cardSelector[index + 7].classList.add('scale7'); }

    if (launcherSHO === 'off') { cardSelectorSource.forEach(card => card.href = 'javascript:void(0)'); deactivate = false; }
    if (launcherSHO === 'html') { cardSelectorSource[index].href = htmllinks[index]; deactivate = false; }
    if (launcherSHO === 'steam') { cardSelectorSource[index].href = steamlinks[index]; deactivate = true; }

    const cardsSection = document.querySelector('.cards-section');
    const selectedCard = cardsSection.children[index];

    selectedCard.style.order = '0';

    cardSelector.forEach(card => card.classList.remove('selected'));

    cardSelector[index].classList.add('selected');

    cardSelector.forEach(card => card.classList.remove('hover'));
    if (hovering === true) {
        cardSelector[currentIndex].classList.add('hover');
    }
    else { hovering = false; }
}