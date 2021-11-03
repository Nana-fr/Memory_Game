// GLOBAL VARIABLES

let launchGame = document.getElementById("launchGame");
let startContainer = document.getElementById("startContainer");

let theme = document.getElementById("theme");
let colors = document.getElementById("colors");

let level = document.getElementById("level");

let game = document.getElementById("game");

let counter = document.getElementById("counter");
let nbMoves = document.getElementById("nbMoves");
let maxMoves = document.getElementById("maxMoves");

let cards = document.getElementsByClassName("cardStillHidden");
let firstCardFace = "";
let secondCardFace = "";
let deck = [];


// FUNCTIONS

function getCards(infoLevel) {
    fetch('data/images.json')
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(response){
                let tempArr = [];
                for (let pairs in response) {
                    tempArr.push(pairs)
                } 
                selectPairs(tempArr);
                tempArr.splice(6,tempArr.length-6);
                for (let tempArrPairs of tempArr) {
                    for (let cards in response[tempArrPairs]) {
                    deck.push(response[tempArrPairs][cards]);       
                    }    
                }
            shuffleCards(deck, infoLevel);
            })
        }
    });
}

function selectPairs(tempArr) {
    for(let i =tempArr.length-1 ; i>0 ;i--){
        let j = Math.floor( Math.random() * (i + 1) );
        [tempArr[i],tempArr[j]]=[tempArr[j],tempArr[i]];
    }
}

function shuffleCards(deck, infoLevel) {
    for(let i =deck.length-1 ; i>0 ;i--){
        let j = Math.floor( Math.random() * (i + 1) );
        [deck[i],deck[j]]=[deck[j],deck[i]];
    }
    dealCards(infoLevel);
}

function dealCards(infoLevel) {
    let images = document.querySelectorAll("img");
    let i = 0;
    images.forEach(function(image) {
        let card = deck[i]
        image.name = card["name"];
        image.src = card["src"];
        image.alt = card["alt"];
        i++
    });
    chooseFirstCard(infoLevel)
}

function chooseFirstCard(infoLevel) {
    for (let card of cards) {
        card.onclick = function(){
        let firstCard = this;
        firstCard.parentElement.classList.add("flip")
        firstCard.classList.remove("cardStillHidden");
        firstCardFace = firstCard.nextElementSibling.name;
        chooseSecondCard(infoLevel, firstCardFace, firstCard);
        }
    }
}

function chooseSecondCard(infoLevel, firstCardFace, firstCard) {
    for (let card of cards) {
        card.onclick = function(){
        let secondCard = this;
        secondCard.parentElement.classList.add("flip")
        secondCard.classList.remove("cardStillHidden");
        secondCardFace = secondCard.nextElementSibling.name;
        document.body.classList.add("disabledClick");
        setTimeout(checkCard, 700, infoLevel, firstCardFace, firstCard, secondCardFace, secondCard);
        }
    }
}

function checkCard(infoLevel, firstCardFace, firstCard, secondCardFace, secondCard) {
    if (firstCardFace !== secondCardFace) {
        firstCard.parentElement.classList.remove("flip");
        secondCard.parentElement.classList.remove("flip")
        firstCard.classList.add("cardStillHidden");
        secondCard.classList.add("cardStillHidden")
    };
    nbMoves.innerText++;
    endGame(infoLevel);
}

function endGame(infoLevel) {
    if (infoLevel === "easy") {
        if (document.querySelector(".cardStillHidden")) {
            document.body.classList.remove("disabledClick");
            chooseFirstCard(infoLevel); 
        } else {
           alert(`you win in ${nbMoves.innerText} moves.`);
           resetGame();
        }
    } else if (infoLevel === "medium") {
        if (!document.querySelector(".cardStillHidden")) {
            alert(`you win in ${nbMoves.innerText} moves.`);
            resetGame();
        } else if (document.querySelector(".cardStillHidden") && nbMoves.innerText < 13) {
            document.body.classList.remove("disabledClick");
            chooseFirstCard(infoLevel);
        } else {
            alert(`you lost, ${document.querySelectorAll(".cardStillHidden").length/2} pairs haven't been found.`);
            resetGame();
        }
    } else {
        if (!document.querySelector(".cardStillHidden")) {
            alert(`you win in ${nbMoves.innerText} moves.`);
            resetGame();
        } else if (document.querySelector(".cardStillHidden") && nbMoves.innerText < 10) {
            document.body.classList.remove("disabledClick");
            chooseFirstCard(infoLevel);
        } else {
            alert(`you lost, ${document.querySelectorAll(".cardStillHidden").length/2} pairs haven't been found.`);
            resetGame();
        }
    }
}

function resetGame() {
    game.classList.add("d-none");
    startContainer.classList.remove("d-none");
    let backCards = document.querySelectorAll(".back");
    backCards.forEach(function(backCard){
        backCard.classList.add("cardStillHidden");
        backCard.parentElement.classList.remove("flip")
    });
    counter.classList.add("d-none");
    deck = [];
    document.body.classList.remove("disabledClick");
}

// GAME

launchGame.onclick = function() {
    startContainer.classList.add("d-none");
    theme.classList.remove("d-none");
}

colors.onclick = function() {
    theme.classList.add("d-none");
    level.classList.remove("d-none");
}

function setLevel(clicked_id) {
    level.classList.add("d-none");
    game.classList.remove("d-none");
    counter.classList.remove("d-none");
    nbMoves.innerText = 0;
    let infoLevel = clicked_id;
    if (infoLevel === "difficult") {
        maxMoves.innerText = "/10";
    } else if (infoLevel === "medium") {
        maxMoves.innerText = "/13";
    }
    getCards(infoLevel);
}

