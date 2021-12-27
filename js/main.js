// GLOBAL VARIABLES

let startContainer = document.getElementById("startContainer");
let launchGame = document.getElementById("launchGame");
let records = document.getElementById("records");

// layer
let p = document.getElementById("message");

// settings variables
let theme = document.getElementById("theme");
let subtheme = document.getElementsByClassName("subtheme");
let level = document.getElementById("level");

// FUNCTIONS

// layer functions
function displayRules() {
    document.getElementById("layer").classList.remove("d-none");
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

function closeLayer() {
    p.classList.remove("overflow");
    document.getElementById("layer").classList.add("d-none");
}


{/* <tr><td>${theme}</td><td>${level}</td><td>${localStorage.getItem(`${theme} ${level}`).split(",")[0]}</td><td>${localStorage.getItem(`${theme} ${level}`).split(",")[1]}</td></tr> */}
function displayRecords() {
    document.getElementById("layer").classList.remove("d-none");
    p.classList.add("overflow");
    let table = document.getElementById("table");
    table.innerHTML = `<tr><td>Chinese HSK1</td><td>Easy</td><td>${localStorage.getItem("Chinese HSK-1 Easy").split(",")[0]}</td><td>${localStorage.getItem("Chinese HSK-1 Easy").split(",")[1]}</td></tr>
                      <tr><td></td><td>Medium</td><td>${localStorage.getItem("Chinese HSK-1 Medium").split(",")[0]}</td><td>${localStorage.getItem("Chinese HSK-1 Medium").split(",")[1]}</td></tr>
                      <tr><td></td><td>Difficult</td><td>${localStorage.getItem("Chinese HSK-1 Difficult").split(",")[0]}</td><td>${localStorage.getItem("Chinese HSK-1 Difficult").split(",")[1]}</td></tr>
                      
                      <tr><td>Chinese HSK2</td><td>Easy</td><td>${localStorage.getItem("Chinese HSK-2 Easy").split(",")[0]}</td><td>${localStorage.getItem("Chinese HSK-2 Easy").split(",")[1]}</td></tr>
                      <tr><td></td><td>Medium</td><td>${localStorage.getItem("Chinese HSK-2 Medium").split(",")[0]}</td><td>${localStorage.getItem("Chinese HSK-2 Medium").split(",")[1]}</td></tr>
                      <tr><td></td><td>Difficult</td><td>${localStorage.getItem("Chinese HSK-2 Difficult").split(",")[0]}</td><td>${localStorage.getItem("Chinese HSK-2 Difficult").split(",")[1]}</td></tr>
                      
                      <tr><td>Chinese HSK3</td><td>Easy</td><td>${localStorage.getItem("Chinese HSK-3 Easy").split(",")[0]}</td><td>${localStorage.getItem("Chinese HSK-3 Easy").split(",")[1]}</td></tr>
                      <tr><td></td><td>Medium</td><td>${localStorage.getItem("Chinese HSK-3 Medium").split(",")[0]}</td><td>${localStorage.getItem("Chinese HSK-3 Medium").split(",")[1]}</td></tr>
                      <tr><td></td><td>Difficult</td><td>${localStorage.getItem("Chinese HSK-3 Difficult").split(",")[0]}</td><td>${localStorage.getItem("Chinese HSK-3 Difficult").split(",")[1]}</td></tr>
                      
                      <tr><td>Chinese HSK4</td><td>Easy</td><td>${localStorage.getItem("Chinese HSK-4 Easy").split(",")[0]}</td><td>${localStorage.getItem("Chinese HSK-4 Easy").split(",")[1]}</td></tr>
                      <tr><td></td><td>Medium</td><td>${localStorage.getItem("Chinese HSK-4 Medium").split(",")[0]}</td><td>${localStorage.getItem("Chinese HSK-4 Medium").split(",")[1]}</td></tr>
                      <tr><td></td><td>Difficult</td><td>${localStorage.getItem("Chinese HSK-4 Difficult").split(",")[0]}</td><td>${localStorage.getItem("Chinese HSK-4 Difficult").split(",")[1]}</td></tr>
                      
                      <tr><td>Chinese HSK5</td><td>Easy</td><td>${localStorage.getItem("Chinese HSK-5 Easy").split(",")[0]}</td><td>${localStorage.getItem("Chinese HSK-5 Easy").split(",")[1]}</td></tr>
                      <tr><td></td><td>Medium</td><td>${localStorage.getItem("Chinese HSK-5 Medium").split(",")[0]}</td><td>${localStorage.getItem("Chinese HSK-5 Medium").split(",")[1]}</td></tr>
                      <tr><td></td><td>Difficult</td><td>${localStorage.getItem("Chinese HSK-5 Difficult").split(",")[0]}</td><td>${localStorage.getItem("Chinese HSK-5 Difficult").split(",")[1]}</td></tr>
                      
                      <tr><td>Chinese HSK6</td><td>Easy</td><td>${localStorage.getItem("Chinese HSK-6 Easy").split(",")[0]}</td><td>${localStorage.getItem("Chinese HSK-6 Easy").split(",")[1]}</td></tr>
                      <tr><td></td><td>Medium</td><td>${localStorage.getItem("Chinese HSK-6 Medium").split(",")[0]}</td><td>${localStorage.getItem("Chinese HSK-6 Medium").split(",")[1]}</td></tr>
                      <tr><td></td><td>Difficult</td><td>${localStorage.getItem("Chinese HSK-6 Difficult").split(",")[0]}</td><td>${localStorage.getItem("Chinese HSK-6 Difficult").split(",")[1]}</td></tr>
                      
                      <tr><td>Japanese JLPT-N5</td><td>Easy</td><td>${localStorage.getItem("Japanese JLPT-N5 Easy").split(",")[0]}</td><td>${localStorage.getItem("Japanese JLPT-N5 Easy").split(",")[1]}</td></tr>
                      <tr><td></td><td>Medium</td><td>${localStorage.getItem("Japanese JLPT-N5 Medium").split(",")[0]}</td><td>${localStorage.getItem("Japanese JLPT-N5 Medium").split(",")[1]}</td></tr>
                      <tr><td></td><td>Difficult</td><td>${localStorage.getItem("Japanese JLPT-N5 Difficult").split(",")[0]}</td><td>${localStorage.getItem("Japanese JLPT-N5 Difficult").split(",")[1]}</td></tr>
                      
                      <tr><td>Japanese JLPT-N4</td><td>Easy</td><td>${localStorage.getItem("Japanese JLPT-N4 Easy").split(",")[0]}</td><td>${localStorage.getItem("Japanese JLPT-N4 Easy").split(",")[1]}</td></tr>
                      <tr><td></td><td>Medium</td><td>${localStorage.getItem("Japanese JLPT-N4 Medium").split(",")[0]}</td><td>${localStorage.getItem("Japanese JLPT-N4 Medium").split(",")[1]}</td></tr>
                      <tr><td></td><td>Difficult</td><td>${localStorage.getItem("Japanese JLPT-N4 Difficult").split(",")[0]}</td><td>${localStorage.getItem("Japanese JLPT-N4 Difficult").split(",")[1]}</td></tr>
                      
                      <tr><td>Japanese JLPT-N3</td><td>Easy</td><td>${localStorage.getItem("Japanese JLPT-N3 Easy").split(",")[0]}</td><td>${localStorage.getItem("Japanese JLPT-N3 Easy").split(",")[1]}</td></tr>
                      <tr><td></td><td>Medium</td><td>${localStorage.getItem("Japanese JLPT-N3 Medium").split(",")[0]}</td><td>${localStorage.getItem("Japanese JLPT-N3 Medium").split(",")[1]}</td></tr>
                      <tr><td></td><td>Difficult</td><td>${localStorage.getItem("Japanese JLPT-N3 Difficult").split(",")[0]}</td><td>${localStorage.getItem("Japanese JLPT-N3 Difficult").split(",")[1]}</td></tr>
                      
                      <tr><td>Japanese JLPT-N2</td><td>Easy</td><td>${localStorage.getItem("Japanese JLPT-N2 Easy").split(",")[0]}</td><td>${localStorage.getItem("Japanese JLPT-N2 Easy").split(",")[1]}</td></tr>
                      <tr><td></td><td>Medium</td><td>${localStorage.getItem("Japanese JLPT-N2 Medium").split(",")[0]}</td><td>${localStorage.getItem("Japanese JLPT-N2 Medium").split(",")[1]}</td></tr>
                      <tr><td></td><td>Difficult</td><td>${localStorage.getItem("Japanese JLPT-N2 Difficult").split(",")[0]}</td><td>${localStorage.getItem("Japanese JLPT-N2 Difficult").split(",")[1]}</td></tr>
                      
                      <tr><td>Japanese JLPT-N1</td><td>Easy</td><td>${localStorage.getItem("Japanese JLPT-N1 Easy").split(",")[0]}</td><td>${localStorage.getItem("Japanese JLPT-N2 Easy").split(",")[1]}</td></tr>
                      <tr><td></td><td>Medium</td><td>${localStorage.getItem("Japanese JLPT-N1 Medium").split(",")[0]}</td><td>${localStorage.getItem("Japanese JLPT-N2 Medium").split(",")[1]}</td></tr>
                      <tr><td></td><td>Difficult</td><td>${localStorage.getItem("Japanese JLPT-N1 Difficult").split(",")[0]}</td><td>${localStorage.getItem("Japanese JLPT-N2 Difficult").split(",")[1]}</td></tr>`;
    p.innerHTML = records.innerHTML;
}

// initialization local storage
function setStorage() {
    fetch('data/records.json')
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(response){
                for (let theme in response) {
                    for (let level in response[theme]){
                        localStorage.setItem(`${theme} ${level}`, response[theme][level]);
                    }
                }
                localStorage.setItem("informed", true);
            })
        }
    });
}

// settings functions

function setTheme(clicked_id) {
    theme.classList.add("d-none");
    let infoTheme = clicked_id;
    if (clicked_id === "Chinese") {
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
            setSessionStorage(infoTheme, url, clicked_id);
        }
    }
}

function setSessionStorage(infoTheme, url, clicked_id) {
    sessionStorage.setItem('infoTheme', infoTheme);
    sessionStorage.setItem('infoLevel', clicked_id);
    sessionStorage.setItem('url', url);
}

// LOCAL STORAGE

if(!localStorage.getItem("informed")){
    setStorage();
}

// LAUNCH GAME

launchGame.onclick = function() {
    startContainer.classList.add("d-none");
    theme.classList.remove("d-none");
}