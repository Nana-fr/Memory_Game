// GLOBAL VARIABLES

let cards = document.getElementsByClassName("hidden-face");
let firstCard = "";
let secondCard = "";


// FUNCTIONS

function chooseFirstCard() {
    for (let card of cards) {
        card.onclick = function(){
        this.classList.remove("hidden-face");
        let hiddenFirstCard = this;
        firstCard = this.nextElementSibling.name;
        chooseSecondCard(firstCard, hiddenFirstCard);
        }
    }
}

function chooseSecondCard(firstCard, hiddenFirstCard) {
    for (let card of cards) {
        card.onclick = function(){
        this.classList.remove("hidden-face");
        let hiddenSecondCard = this;
        secondCard = this.nextElementSibling.name;
        document.body.classList.add("disabledClick");
        setTimeout(checkCard, 500, firstCard, hiddenFirstCard, secondCard, hiddenSecondCard);
        }
    }
}

function checkCard(firstCard, hiddenFirstCard, secondCard, hiddenSecondCard) {
    if (firstCard !== secondCard) {
        console.log(firstCard + "false" + secondCard);
        hiddenFirstCard.classList.add("hidden-face");
        hiddenSecondCard.classList.add("hidden-face");
        firstCard = "";
        secondCard = ""; 
    } else {
        console.log(firstCard + "true" + secondCard)
        firstCard = "";
        secondCard = "";
    }
    endGame();
}

function endGame() {
     if (document.querySelector(".hidden-face")) {
        document.body.classList.remove("disabledClick");
        chooseFirstCard(); 
    } else {
       alert("you win");
    }
}

// GAME

chooseFirstCard();