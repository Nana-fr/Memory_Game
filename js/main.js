// GLOBAL VARIABLES

let startContainer = document.getElementById("startContainer");
let launchGame = document.getElementById("launchGame");
let rules = document.getElementById("messageInfo");

// layer
let p = document.getElementById("message");

// settings variables
let theme = document.getElementById("theme");
let Colors = document.getElementById("Colors");
let subtheme = document.getElementsByClassName("subtheme");
let level = document.getElementById("level");

// playing zone variables
let game = document.getElementById("game");
let board = document.getElementsByClassName("board");

// dashboard variables
let dashboard = document.getElementsByClassName("dashboard");
let themeInfo = document.getElementsByClassName("themeInfo");
let levelInfo = document.getElementsByClassName("levelInfo");
let nbMoves = document.getElementsByClassName("nbMoves");
let maxMoves = document.getElementsByClassName("maxMoves");

// cards variables
let cards = document.getElementsByClassName("cardStillHidden");
let firstCardFace = "";
let secondCardFace = "";
let deck = [];


// FUNCTIONS

// layer functions
function displayRules() {
    document.getElementById("layer").classList.remove("d-none");
    rules.classList.add("containerRules");
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                p.innerHTML = httpRequest.responseText;
            }
        }
    };
    httpRequest.open('GET', 'data/rules.txt');
    httpRequest.send();
};

function displayLayer(text) {
    document.getElementById("layer").classList.remove("d-none");
    p.innerHTML = text;
}

function closeLayer() {
    rules.classList.remove("containerRules");
    document.getElementById("layer").classList.add("d-none");
}

// settings functions

function setTheme(clicked_id) {
    theme.classList.add("d-none");
    let infoTheme = clicked_id;
    if (clicked_id === "Colors") {
        level.classList.remove("d-none");
        let url = 'data/colors.json';
        selectLevel(infoTheme, url)
    } else if (clicked_id === "Chinese") {
        subtheme[0].classList.remove("d-none");
        let buttons = subtheme[0].children;
        for (let button of buttons[0].children) {
            makeClickableBtn(infoTheme, button, 0);
        }
        for (let button of buttons[1].children) {
            makeClickableBtn(infoTheme, button, 0);
        }
    } else {
        subtheme[1].classList.remove("d-none");
        for (let button of subtheme[1].children) {
            makeClickableBtn(infoTheme, button, 1);
        }
    }
}

function makeClickableBtn(infoTheme, button, n) {
    button.onclick = function(){
        infoTheme += ` ${this.id}`;
        let url = this.value;
        subtheme[n].classList.add("d-none");
        level.classList.remove("d-none");
        selectLevel(infoTheme, url)
    }
}

function selectLevel(infoTheme, url) {
    for (let button of level.children) {
        button.onclick = function(){
            let clicked_id = this.id;
            setLevel(infoTheme, url, clicked_id);
        }
    }
}

function setLevel(infoTheme, url, clicked_id) {
    level.classList.add("d-none");
    game.classList.remove("d-none");
    let size;
    if (window.innerWidth<992){
        size = 0;
        dashboard[0].previousElementSibling.classList.add("d-none");
    } else {
        board[0].style.width="62vw";
        size = 1;
    }
    dashboard[size].classList.remove("d-none");
    nbMoves[size].innerText = 0;
    themeInfo[size].innerText= infoTheme;
    let infoLevel = clicked_id;
    if (infoLevel === "Difficult") {
        maxMoves[size].innerText = "/9";
    } else if (infoLevel === "Medium") {
        maxMoves[size].innerText = "/12";
    }
    levelInfo[size].innerText = `Level: ${infoLevel}`;
    displayLayer("<h3>Start!!!</h3>");
    document.querySelector("audio").play();
    getCards(infoLevel, url, size);
}

function getCards(infoLevel, url, size) {
    fetch(url)
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
            shuffleCards(deck, infoLevel, size);
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

function shuffleCards(deck, infoLevel, size) {
    for(let i =deck.length-1 ; i>0 ;i--){
        let j = Math.floor( Math.random() * (i + 1) );
        [deck[i],deck[j]]=[deck[j],deck[i]];
    }
    dealCards(infoLevel, size);
}

function dealCards(infoLevel, size) {
    let images = document.querySelectorAll("img");
    let i = 0;
    images.forEach(function(image) {
        let card = deck[i]
        image.name = card["name"];
        image.src = card["src"];
        image.alt = card["alt"];
        i++
    });
    chooseFirstCard(infoLevel, size)
}

// playing functions

function chooseFirstCard(infoLevel, size) {
    for (let card of cards) {
        card.onclick = function(){
        let firstCard = this;
        firstCard.parentElement.classList.add("flip")
        firstCard.classList.remove("cardStillHidden");
        firstCardFace = firstCard.nextElementSibling.name;
        chooseSecondCard(infoLevel, size, firstCardFace, firstCard);
        }
    }
}

function chooseSecondCard(infoLevel, size, firstCardFace, firstCard) {
    for (let card of cards) {
        card.onclick = function(){
        let secondCard = this;
        secondCard.parentElement.classList.add("flip")
        secondCard.classList.remove("cardStillHidden");
        secondCardFace = secondCard.nextElementSibling.name;
        document.body.classList.add("disabledClick");
        setTimeout(checkCard, 700, infoLevel, size, firstCardFace, firstCard, secondCardFace, secondCard);
        }
    }
}

function checkCard(infoLevel, size, firstCardFace, firstCard, secondCardFace, secondCard) {
    if (firstCardFace !== secondCardFace) {
        firstCard.parentElement.classList.remove("flip");
        secondCard.parentElement.classList.remove("flip")
        firstCard.classList.add("cardStillHidden");
        secondCard.classList.add("cardStillHidden")
    };
    nbMoves[size].innerText++;
    endGame(infoLevel, size);
}

function endGame(infoLevel, size) {
    if (infoLevel === "Easy") {
        if (document.querySelector(".cardStillHidden")) {
            document.body.classList.remove("disabledClick");
            chooseFirstCard(infoLevel, size); 
        } else {
            displayLayer(`<h3>Congratulations!!!</h3><br><h5>You win in ${nbMoves[size].innerText} moves.<h5>`);
           resetGame();
        }
    } else if (infoLevel === "Medium") {
        if (!document.querySelector(".cardStillHidden") && nbMoves[size].innerText < 13) {
            displayLayer(`<h3>Congratulations!!!</h3><br><h5>You win in ${nbMoves[size].innerText} moves.</h5>`);
            resetGame();
        } else if (document.querySelector(".cardStillHidden") && nbMoves[size].innerText < 12) {
            document.body.classList.remove("disabledClick");
            chooseFirstCard(infoLevel, size);
        } else {
            displayLayer(`<h3>You lost!</h3><br><h5>${document.querySelectorAll(".cardStillHidden").length/2} pairs haven't been found.</h5>`);
            resetGame();
        }
    } else {
        if (!document.querySelector(".cardStillHidden") && nbMoves[size].innerText < 10) {
            displayLayer(`<h3>Congratulations!!!</h3><br><h5>You win in ${nbMoves[size].innerText} moves.</h5>`);
            resetGame();
        } else if (document.querySelector(".cardStillHidden") && nbMoves[size].innerText < 9) {
            document.body.classList.remove("disabledClick");
            chooseFirstCard(infoLevel, size);
        } else {
            displayLayer(`<h3>You lost!</h3><br><h5>${document.querySelectorAll(".cardStillHidden").length/2} pairs haven't been found.</h5>`);
            resetGame();
        }
    }
}

// quit game function
function resetGame() {
    let size;
    if (window.innerWidth<992){
        size = 0;
        dashboard[0].previousElementSibling.classList.remove("d-none");
    } else {
        board[0].style.width="100vw";
        size = 1;
    }
    let backCards = document.querySelectorAll(".back");
    backCards.forEach(function(backCard){
        backCard.classList.add("cardStillHidden");
        backCard.parentElement.classList.remove("flip")
    });
    dashboard[size].classList.add("d-none");
    deck = [];
    document.body.classList.remove("disabledClick");
    game.classList.add("d-none");
    startContainer.classList.remove("d-none");
}

// GAME

launchGame.onclick = function() {
    startContainer.classList.add("d-none");
    theme.classList.remove("d-none");
}