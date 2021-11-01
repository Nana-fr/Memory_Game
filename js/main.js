// GLOBAL VARIABLES

let cards = document.getElementsByClassName("hidden-face");
let firstCard = "";
let secondCard = "";


// FUNCTIONS

function chooseFirstCard() {
    for (let card of cards) {
        card.onclick = function(){
        this.classList.remove("hidden-face");   
        firstCard = this;
        chooseSecondCard(firstCard);
        }
    }
}

function chooseSecondCard(firstCard) {
    for (let card of cards) {
        card.onclick = function(){
        this.classList.remove("hidden-face");
        secondCard = this;
        checkCard(firstCard, secondCard);
        }
    }
}

function checkCard(firstCard, secondCard) {
    if (firstCard.id !== secondCard.id) {
        console.log(firstCard.id + "false" + secondCard.id);
        firstCard.classList.add("hidden-face");
        secondCard.classList.add("hidden-face");
        firstCard = "";
        secondCard = ""; 
    } else {
        console.log(firstCard.id + "true" + secondCard.id)
        firstCard = "";
        secondCard = "";
    }
    endGame();
}

function endGame() {
     if (document.querySelector(".hidden-face")) {
        chooseFirstCard(); 
    } else {
       alert("you win");
    }
}

// GAME

chooseFirstCard();
