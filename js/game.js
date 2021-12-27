let p = document.getElementById("message");
let nameRegex= /^[\p{Letter}]{3,20}$|^[\p{Letter}]+[-][\p{Letter}]+$|^[\p{Script=Han}]{2,3}$/gui;

// setting variables
let infoTheme = sessionStorage.getItem("infoTheme");
let infoLevel = sessionStorage.getItem("infoLevel");
let url = sessionStorage.getItem("url");

// dashboard variables
let dashboard = document.getElementById("dashboard");
let themeInfo = document.getElementById("themeInfo");
let levelInfo = document.getElementById("levelInfo");
let nbMoves = document.getElementById("nbMoves");
let maxMoves = document.getElementById("maxMoves");

// cards variables
let cards = document.getElementsByClassName("cardStillHidden");
let firstCardFace = "";
let secondCardFace = "";
let deck = [];

// FUNCTIONS

function displayLayer(text) {
    document.getElementById("layer").classList.remove("d-none");
    p.innerHTML = text;  
}

function closeLayer() {
    if (!document.querySelector(".cardStillHidden")) {
        resetGame();
    } else {
        document.getElementById("layer").classList.add("d-none"); 
    }
}

function setLevel(infoTheme, infoLevel, url) {
    nbMoves.innerText = 0;
    themeInfo.innerText= infoTheme;
    if (infoLevel === "Difficult") {
        maxMoves.innerText = "/9";
    } else if (infoLevel === "Medium") {
        maxMoves.innerText = "/12";
    }
    levelInfo.innerText = `Level: ${infoLevel}`;
    getCards(infoTheme, infoLevel, url);
}

function getCards(infoTheme, infoLevel, url) {
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
            shuffleCards(deck, infoTheme, infoLevel);
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

function shuffleCards(deck, infoTheme, infoLevel) {
    for(let i =deck.length-1 ; i>0 ;i--){
        let j = Math.floor( Math.random() * (i + 1) );
        [deck[i],deck[j]]=[deck[j],deck[i]];
    }
    dealCards(infoTheme, infoLevel);
}

function dealCards(infoTheme, infoLevel) {
    let images = document.querySelectorAll("img");
    let i = 0;
    images.forEach(function(image) {
        let card = deck[i]
        image.name = card["name"];
        image.src = card["src"];
        image.alt = card["alt"];
        i++
    });
    displayLayer("<h3>Start!!!</h3>");
    document.querySelector("audio").play();
    chooseFirstCard(infoTheme, infoLevel)
}

// playing functions

function chooseFirstCard(infoTheme, infoLevel) {
    for (let card of cards) {
        card.onclick = function(){
        let firstCard = this;
        firstCard.parentElement.classList.add("flip")
        firstCard.classList.remove("cardStillHidden");
        firstCardFace = firstCard.nextElementSibling.name;
        chooseSecondCard(infoTheme, infoLevel, firstCardFace, firstCard);
        }
    }
}

function chooseSecondCard(infoTheme, infoLevel, firstCardFace, firstCard) {
    for (let card of cards) {
        card.onclick = function(){
        let secondCard = this;
        secondCard.parentElement.classList.add("flip")
        secondCard.classList.remove("cardStillHidden");
        secondCardFace = secondCard.nextElementSibling.name;
        document.body.classList.add("disabledClick");
        setTimeout(checkCard, 700, infoTheme, infoLevel, firstCardFace, firstCard, secondCardFace, secondCard);
        }
    }
}

function checkCard(infoTheme, infoLevel, firstCardFace, firstCard, secondCardFace, secondCard) {
    if (firstCardFace !== secondCardFace) {
        firstCard.parentElement.classList.remove("flip");
        secondCard.parentElement.classList.remove("flip")
        firstCard.classList.add("cardStillHidden");
        secondCard.classList.add("cardStillHidden")
    };
    nbMoves.innerText++;
    endGame(infoTheme, infoLevel);
}

function endGame(infoTheme, infoLevel) {
    document.body.classList.remove("disabledClick");
    if (infoLevel === "Easy") {
        if (document.querySelector(".cardStillHidden")) {
            
            chooseFirstCard(infoTheme, infoLevel); 
        } else {
            displayLayer(`<h3>Congratulations!!!</h3><br><h5>You win in ${nbMoves.innerText} moves.<h5>`);
            checkRecords(infoTheme, infoLevel);
        }
    } else if (infoLevel === "Medium") {
        if (!document.querySelector(".cardStillHidden") && nbMoves.innerText < 13) {
            displayLayer(`<h3>Congratulations!!!</h3><br><h5>You win in ${nbMoves.innerText} moves.</h5>`);
            checkRecords(infoTheme, infoLevel)
        } else if (document.querySelector(".cardStillHidden") && nbMoves.innerText < 12) {
            chooseFirstCard(infoTheme, infoLevel);
        } else {
            displayLayer(`<h3>You lost!</h3><br><h5>${document.querySelectorAll(".cardStillHidden").length/2} pairs haven't been found.</h5>`);
        }
    } else {
        if (!document.querySelector(".cardStillHidden") && nbMoves.innerText < 10) {
            displayLayer(`<h3>Congratulations!!!</h3><br><h5>You win in ${nbMoves.innerText} moves.</h5>`);
            checkRecords(infoTheme, infoLevel)
        } else if (document.querySelector(".cardStillHidden") && nbMoves.innerText < 9) {
            chooseFirstCard(infoTheme, infoLevel);
        } else {
            displayLayer(`<h3>You lost!</h3><br><h5>${document.querySelectorAll(".cardStillHidden").length/2} pairs haven't been found.</h5>`);
        }
    }
}

function checkRecords(infoTheme, infoLevel) {
    if (localStorage.getItem(`${infoTheme} ${infoLevel}`) === "," || localStorage.getItem(`${infoTheme} ${infoLevel}`).split(",")[1] > parseInt(nbMoves.innerText)) {
        let name = prompt(`Congratulations, you set a new record\nPlease enter your name:`);
        while (name.match(nameRegex) === null || name === null) {
            name = prompt(`Your name must be between 3 and 20 letters long or 2 and 3 hanzi long:`);
        }
        localStorage.setItem(`${infoTheme} ${infoLevel}`, [name, nbMoves.innerText]);
    }
}

// quit game function
function resetGame() {
    window.location.href="index.html"
}

// GAME

setLevel(infoTheme, infoLevel, url)