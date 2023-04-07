let flippedCards = 0;
let amountCards;
do {
    amountCards = Number(prompt("Com quantas cartas quer jogar? (insira um valor par, de 4 a 14)"));
} while (authAmount(amountCards));

function authAmount(amount) {
    return (amountCards < 4 || amountCards > 14 || (amountCards % 2) === 1 || isNaN(amountCards));
}

const cardList = [];
for (let i = 0; i < amountCards; i++) {
    let card = document.querySelector(".table .hidden");
    card.classList.remove("hidden");
    cardList.push(card.outerHTML);
}

function comparador() { 
	return Math.random() - 0.5; 
}
cardList.sort(comparador);

let HTMLTable = "";
for (let i = 0; i < amountCards; i++) {
    HTMLTable += cardList[i];
    
}

let table = document.querySelector(".table");
table.innerHTML = HTMLTable;


let flips = 0;
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


let firstCardTurned = false;
let secondCardTurned = false;
let firstCard;

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

            if(flippedCards >= amountCards) {
                // setTimeout para dar tempo da carta virar antes de emitir a mensagem final
                setTimeout(alert, 100, `Você ganhou em ${flips} jogadas!`);
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