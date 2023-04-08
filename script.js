let flippedCards;
let timer;
let flips;
let firstCardTurned;
let secondCardTurned;
let firstCard;
let amountCards;
let idInterval;
let cardList = [];
const gifs = [
    'bobrossparrot',
    'explodyparrot',
    'fiestaparrot',
    'metalparrot',
    'revertitparrot',
    'tripletsparrot',
    'unicornparrot'
];


// build functions

function authAmount(amount) {
    return (amountCards < 4 || amountCards > 14 || (amountCards % 2) === 1 || isNaN(amountCards));
}

function setTimer() {
    document.querySelector('h2').innerHTML = ++timer;
}

function comparador() { 
	return Math.random() - 0.5; 
}

function init() {
    flippedCards = 0;
    timer = 0;
    flips = 0;
    firstCardTurned = false;
    secondCardTurned = false;
    firstCard = "";
    cardList = [];

    do {
        amountCards = Number(prompt("Com quantas cartas quer jogar? (insira um valor par, de 4 a 14)"));
    } while (authAmount(amountCards));
    
    for (let i = 0; i < amountCards / 2; i++) {
        let card = `<div class="card" onclick="flip(this)" data-test="card">
                        <div class="front-face face">
                            <img src="./images/back.png" alt="carta virada para baixo" data-test="face-down-image">
                        </div>
                        <div class="back-face face">
                            <img src="./images/${gifs[i]}.gif" alt="${gifs[i]}" data-test="face-up-image">
                        </div>
                    </div>`;
    
        cardList.push(card);
        cardList.push(card);
    }
    cardList.sort(comparador);

    let HTMLTable = "";
    for (let i = 0; i < amountCards; i++) {
        HTMLTable += cardList[i];   
    }
    let table = document.querySelector(".table");
    table.innerHTML = HTMLTable;

    idInterval = setInterval(setTimer, 1000);
}

// flip\turn functions

function turnUp(card) {
    let front = card.querySelector('.front-face');
    front.classList.add('turn180');

    let back = card.querySelector('.back-face');
    back.classList.add('turn0');

    flips++;
}

function turnDown(card) {
    let front = card.querySelector('.front-face');
    front.classList.remove('turn180');

    let back = card.querySelector('.back-face');
    back.classList.remove('turn0');
}

function isTurnedUp(card) {
    let front = card.querySelector('.front-face');
    return front.classList.contains('turn180');
}

function checkEquality(firstCard, secondCard) {
    firstImg = firstCard.querySelector('.back-face').innerHTML;
    secondImg = secondCard.querySelector('.back-face').innerHTML;

    if (firstImg === secondImg) {
        return true;
    }
    return false;
}

function resetFlip(card) {
    turnDown(card);
    turnDown(firstCard);
    secondCardTurned = !secondCardTurned;
    firstCard = "";
}

function endMsgs() {
    alert(`Você ganhou em ${flips} jogadas! A duração do jogo foi de ${timer} segundos!`);
    let answer;
    do {
        answer = prompt('Gostaria de reiniciar a partida? (responda com "sim" ou "não")');
    } while (answer !== 'sim' && answer !== 'não');

    if (answer === 'sim') {
        document.querySelector('h2').innerHTML = '0';
        init();
    }
}

function flip(card) {
    if (isTurnedUp(card) || secondCardTurned) {
        return;
    }

    turnUp(card);
    if (firstCardTurned) {
        if (checkEquality(firstCard, card)) {
            flippedCards += 2;
            firstCardTurned = !firstCardTurned;
            firstCard = "";

            if(flippedCards >= amountCards) { // game over
                // setTimeout para dar tempo da carta virar antes de emitir a mensagem final
                setTimeout(endMsgs, 100);
                clearInterval(idInterval);
            }
            return;
        }

        secondCardTurned = !secondCardTurned;
        setTimeout(resetFlip, 1000, card);
    } else {
        firstCard = card;
    }
    
    firstCardTurned = !firstCardTurned;
}


// execution of functions

init();