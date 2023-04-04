let amountCards;
// do {
//     amountCards = Number(prompt("Com quantas cartas quer jogar? (insira um valor par, de 4 a 14)"));
// } while (amountCards < 4 || amountCards > 14 || (amountCards % 2) === 1 || isNaN(amountCards));

const cards = [];
for (let i = 0; i < parseInt(amountCards / 2); i ++) {
    cards.push(`<div class="card id${i}">
    <div class="front-face face">
        <img src="./images/back.png" alt="carta virada para baixo">
    </div>
    <div class="back-face face">
        Verso
    </div>
</div`);


}
