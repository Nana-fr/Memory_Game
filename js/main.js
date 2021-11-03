// GLOBAL VARIABLES

let launchGame = document.getElementById("launchGame");
let game = document.getElementById("game");
let counter = document.getElementById("counter");
let nbMoves = document.getElementById("nbMoves");
let cards = document.getElementsByClassName("cardStillHidden");
let firstCardFace = "";
let secondCardFace = "";
let colors = [];


// FUNCTIONS

function getCards() {
    fetch('data/images.json')
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(response){
                let tempArr = [];
                for (let pairs in response) {
                    tempArr.push(pairs)
                } 
                selectCards(tempArr);
                tempArr.splice(6,tempArr.length-6);
                for (let tempArrPairs of tempArr) {
                    for (let cards in response[tempArrPairs]) {
                    colors.push(response[tempArrPairs][cards]);       
                    }    
                }
            shuffleCards(colors);
            })
        }
    });
}

function selectCards(tempArr) {
    for(let i =tempArr.length-1 ; i>0 ;i--){
        let j = Math.floor( Math.random() * (i + 1) );
        [tempArr[i],tempArr[j]]=[tempArr[j],tempArr[i]];
    }
}

function shuffleCards(colors) {
    for(let i =colors.length-1 ; i>0 ;i--){
        let j = Math.floor( Math.random() * (i + 1) );
        [colors[i],colors[j]]=[colors[j],colors[i]];
    }
    dealCards();
}

function dealCards() {
    let images = document.querySelectorAll("img");
    let i = 0;
    images.forEach(function(image) {
        let color = colors[i]
        image.name = color["name"];
        image.src = color["src"];
        image.alt = color["alt"];
        i++
    });
    chooseFirstCard()
}

function chooseFirstCard() {
    for (let card of cards) {
        card.onclick = function(){
        let firstCard = this;
        firstCard.parentElement.classList.add("flip")
        firstCard.classList.remove("cardStillHidden");
        firstCardFace = firstCard.nextElementSibling.name;
        chooseSecondCard(firstCardFace, firstCard);
        }
    }
}

function chooseSecondCard(firstCardFace, firstCard) {
    for (let card of cards) {
        card.onclick = function(){
        let secondCard = this;
        secondCard.parentElement.classList.add("flip")
        secondCard.classList.remove("cardStillHidden");
        secondCardFace = secondCard.nextElementSibling.name;
        document.body.classList.add("disabledClick");
        setTimeout(checkCard, 700, firstCardFace, firstCard, secondCardFace, secondCard);
        }
    }
}

function checkCard(firstCardFace, firstCard, secondCardFace, secondCard) {
    if (firstCardFace !== secondCardFace) {
        firstCard.parentElement.classList.remove("flip");
        secondCard.parentElement.classList.remove("flip")
        firstCard.classList.add("cardStillHidden");
        secondCard.classList.add("cardStillHidden");
        firstCardFace = "";
        secondCardFace = ""; 
    } else {
        firstCardFace = "";
        secondCardFace = "";
    }
    nbMoves.innerText++;
    endGame();
}

function endGame() {
     if (document.querySelector(".cardStillHidden")) {
        document.body.classList.remove("disabledClick");
        chooseFirstCard(); 
    } else {
       alert(`you win in ${nbMoves.innerText} moves.`);
        launchGame.classList.remove("d-none");
        game.classList.add("d-none");
        let backCards = document.querySelectorAll(".back");
        backCards.forEach(function(backCard){
            backCard.classList.add("cardStillHidden");
            backCard.parentElement.classList.remove("flip")
        });
        counter.classList.add("d-none");
        colors = [];
        document.body.classList.remove("disabledClick");
    }
}

// GAME

launchGame.onclick = function() {
    launchGame.classList.add("d-none");
    game.classList.remove("d-none");
    counter.classList.remove("d-none");
    nbMoves.innerText = 0;
    getCards();
}

