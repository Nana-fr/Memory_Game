// GLOBAL VARIABLES

let launchGame = document.getElementById("launchGame");
let game = document.getElementById("game");
let cards = document.getElementsByClassName("cardStillHidden");
let firstCardFace = "";
let secondCardFace = "";
let colors = [
    { 
        name : "orange",
        src : "img/orange.jpg",
        alt : "orange",
    },
    {
        name : "vert",
        src : "img/vert.jpg",
        alt : "vert"
    },
    {
        name : "noir",
        src : "img/noir.jpg",
        alt : "noir"
    },
    {
        name : "jaune", 
        src : "img/jaune.jpg",
        alt : "jaune"
    },
    {
        name : "bleu",
        src : "img/bleu.jpg",
        alt : "bleu"
    },
    {
        name : "rouge",
        src : "img/rouge.jpg",
        alt : "rouge"
    },
    { 
        name : "orange",
        src : "img/orange.jpg",
        alt : "orange",
    },
    {
        name : "vert",
        src : "img/vert.jpg",
        alt : "vert"
    },
    {
        name : "noir",
        src : "img/noir.jpg",
        alt : "noir"
    },
    {
        name : "jaune", 
        src : "img/jaune.jpg",
        alt : "jaune"
    },
    {
        name : "bleu",
        src : "img/bleu.jpg",
        alt : "bleu"
    },
    {
        name : "rouge",
        src : "img/rouge.jpg",
        alt : "rouge"
    }
];

function putColors() {
    let images = document.querySelectorAll("img");
    let i = Math.floor(Math.random() * colors.length);
    images.forEach(function(image) {
        console.log(i);
        let color = colors[i]
        console.log(color)
        image.name = color["name"];
        image.src = color["src"];
        image.alt = color["alt"];
        colors.splice(i, 1);
        i = Math.floor(Math.random() * colors.length);
        console.log(colors)
    })
    chooseFirstCard()
}



// FUNCTIONS

function putColors() {
    let images = document.querySelectorAll("img");
    let i = Math.floor(Math.random() * colors.length);
    images.forEach(function(image) {
        console.log(i);
        let color = colors[i]
        console.log(color)
        image.name = color["name"];
        image.src = color["src"];
        image.alt = color["alt"];
        colors.splice(i, 1);
        i = Math.floor(Math.random() * colors.length);
        console.log(colors)
    })
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
    endGame();
}

function endGame() {
     if (document.querySelector(".cardStillHidden")) {
        document.body.classList.remove("disabledClick");
        chooseFirstCard(); 
    } else {
       alert("you win");
        launchGame.classList.remove("d-none");
        game.classList.add("d-none");
        let backCards = document.querySelectorAll(".back");
        backCards.forEach(function(backCard){
            backCard.classList.add("cardStillHidden");
            backCard.parentElement.classList.remove("flip")
        });
        document.body.classList.remove("disabledClick");
    }
}

// GAME

launchGame.onclick = function() {
    launchGame.classList.add("d-none");
    game.classList.remove("d-none");
}

putColors();