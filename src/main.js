let bot = localStorage.getItem('gamemode') == 'Singleplayer';
let currentPlayer = 1;
let rows;
let cols ;
let positionPlayers
let possibleValidMove = true;
let usedCells;
let scores = {};
let names = [localStorage.getItem('player1'), bot ? 'Maxel the Bot' : localStorage.getItem('player2')]
updateScoreDisplay()
updatePlayerTurnDisplay()

let tableMatrix = [];

initializeGenerateTable()

//document.getElementById('btn').addEventListener('click', initializeGenerateTable);

function initializeGenerateTable() {

    const tableBody = document.querySelector("tbody");

    scores.player1 = 0
    scores.player2 = 0

    tableMatrix = [];

    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }


    rows = Number(localStorage.getItem('rows'));
    cols = Number(localStorage.getItem('cols'));


    currentPlayer = 1;
    positionPlayers = [{ x: 0, y: 0 }, { x: cols - 1, y: rows - 1 }]
    usedCells = [{ x: 0, y: 0 }, { x: cols - 1, y: rows - 1 }];
    scores = { player1: 0, player2: 0 }
    updateScoreDisplay()
    updatePlayerTurnDisplay()


    generateTable(rows, cols)
}


function updatePlayerTurnDisplay() {
    document.querySelectorAll('.name')[0].textContent = names[currentPlayer - 1];
}


function updateScoreDisplay() {
    document.querySelectorAll('span')[0].textContent = scores.player1?.toFixed(2);
    document.querySelectorAll('span')[1].textContent = scores.player2?.toFixed(2);
}

function createControlledCell(num, opr) {
    const randx = getRandomInt(1, cols - 2);
    const randy = getRandomInt(1, rows - 2);


    const specialCell = tableMatrix[randy][randx];
    specialCell.operation = opr;
    specialCell.textContent = opr + num;
    specialCell.number = num;
}

function handleCellClick(event) {
    let x1 = positionPlayers[currentPlayer - 1].x
    let y1 = positionPlayers[currentPlayer - 1].y

    const x2 = event.target.position.x;
    const y2 = event.target.position.y;

    const playerToMove = Array.from(document.getElementsByClassName('pawn' + currentPlayer))[0];

    if ((tableMatrix[y2]?.[x2 + 1] == undefined || tableMatrix[y2]?.[x2 + 1].classList.contains('used'))
            && (tableMatrix[y2 + 1]?.[x2 + 1] == undefined || tableMatrix[y2 + 1]?.[x2 + 1].classList.contains('used'))
            && (tableMatrix[y2 + 1]?.[x2] == undefined || tableMatrix[y2 + 1]?.[x2].classList.contains('used'))
            && (tableMatrix[y2 + 1]?.[x2 - 1] == undefined || tableMatrix[y2 + 1]?.[x2 - 1].classList.contains('used'))
            && (tableMatrix[y2]?.[x2 - 1] == undefined || tableMatrix[y2]?.[x2 - 1].classList.contains('used'))
            && (tableMatrix[y2 - 1]?.[x2 - 1] == undefined || tableMatrix[y2 - 1]?.[x2 - 1].classList.contains('used'))
            && (tableMatrix[y2 - 1]?.[x2] == undefined || tableMatrix[y2 - 1]?.[x2].classList.contains('used'))
            && (tableMatrix[y2 - 1]?.[x2 + 1] == undefined || tableMatrix[y2 - 1]?.[x2 + 1].classList.contains('used'))) {


            endGame()
        }


    if (((Math.abs(x1 - x2) === 1 || Math.abs(x1 - x2) === 0)) && ((Math.abs(y1 - y2) === 1 || Math.abs(y1 - y2) === 0)) && !event.target.classList.contains('used')) {



        event.target.appendChild(playerToMove);

        positionPlayers[currentPlayer - 1].x = x2;
        positionPlayers[currentPlayer - 1].y = y2;

        usedCells.push({ x: x2, y: y2 });

        event.target.classList.add('used')

        switch (event.target.operation) {
            case '':
                scores['player' + currentPlayer] += event.target.number;
                break;
            case '-':
                scores['player' + currentPlayer] -= event.target.number;
                break;
            case 'x':
                scores['player' + currentPlayer] *= event.target.number;
                break;
            case '/':
                scores['player' + currentPlayer] /= event.target.number;
                break;

        }

        scores['player' + currentPlayer].toFixed(2);

        updateScoreDisplay()



        currentPlayer = currentPlayer == 1 ? 2 : 1;

        updatePlayerTurnDisplay()


        if (checkIfPlayersAreLocked()){
            endGame()
        }


        if (bot && currentPlayer == 2) {
            botTurn()
        }

    }




}

function checkIfPlayersAreLocked() {
    let locked = false;


    let x2 = positionPlayers[0].x;
    let y2 = positionPlayers[0].y;

    if ((tableMatrix[y2]?.[x2 + 1] == undefined || tableMatrix[y2]?.[x2 + 1].classList.contains('used'))
            && (tableMatrix[y2 + 1]?.[x2 + 1] == undefined || tableMatrix[y2 + 1]?.[x2 + 1].classList.contains('used'))
            && (tableMatrix[y2 + 1]?.[x2] == undefined || tableMatrix[y2 + 1]?.[x2].classList.contains('used'))
            && (tableMatrix[y2 + 1]?.[x2 - 1] == undefined || tableMatrix[y2 + 1]?.[x2 - 1].classList.contains('used'))
            && (tableMatrix[y2]?.[x2 - 1] == undefined || tableMatrix[y2]?.[x2 - 1].classList.contains('used'))
            && (tableMatrix[y2 - 1]?.[x2 - 1] == undefined || tableMatrix[y2 - 1]?.[x2 - 1].classList.contains('used'))
            && (tableMatrix[y2 - 1]?.[x2] == undefined || tableMatrix[y2 - 1]?.[x2].classList.contains('used'))
            && (tableMatrix[y2 - 1]?.[x2 + 1] == undefined || tableMatrix[y2 - 1]?.[x2 + 1].classList.contains('used'))) {


        locked = true;
    }

    x2 = positionPlayers[1].x;
    y2 = positionPlayers[1].y;

    if ((tableMatrix[y2]?.[x2 + 1] == undefined || tableMatrix[y2]?.[x2 + 1].classList.contains('used'))
            && (tableMatrix[y2 + 1]?.[x2 + 1] == undefined || tableMatrix[y2 + 1]?.[x2 + 1].classList.contains('used'))
            && (tableMatrix[y2 + 1]?.[x2] == undefined || tableMatrix[y2 + 1]?.[x2].classList.contains('used'))
            && (tableMatrix[y2 + 1]?.[x2 - 1] == undefined || tableMatrix[y2 + 1]?.[x2 - 1].classList.contains('used'))
            && (tableMatrix[y2]?.[x2 - 1] == undefined || tableMatrix[y2]?.[x2 - 1].classList.contains('used'))
            && (tableMatrix[y2 - 1]?.[x2 - 1] == undefined || tableMatrix[y2 - 1]?.[x2 - 1].classList.contains('used'))
            && (tableMatrix[y2 - 1]?.[x2] == undefined || tableMatrix[y2 - 1]?.[x2].classList.contains('used'))
            && (tableMatrix[y2 - 1]?.[x2 + 1] == undefined || tableMatrix[y2 - 1]?.[x2 + 1].classList.contains('used'))) {


            locked = true;
    }

    return locked;
}


function generateTable(rows, cols) {
    const tableBody = document.querySelector("tbody");

    const allowedOperations = ['', '-', 'x', '/'];

    for (let i = 0; i < rows; i++) {
        const tr = document.createElement("tr");
        tableMatrix.push([]);
        for (let j = 0; j < cols; j++) {
            const td = document.createElement("td");

            td.addEventListener("click", handleCellClick);

            const index = getRandomInt(0, 3);
            const operation = allowedOperations[index];
            td.position = { x: j, y: i }
            td.operation = operation;
            td.textContent += operation;

            const randomCellNumber = getRandomInt(1, getAverage(rows, cols) / 2);
            td.number = randomCellNumber;
            td.textContent += randomCellNumber;

            tableMatrix[i][j] = td;
            tr.appendChild(td);
        }
        tableBody.appendChild(tr);
    }

    const countOfContoroledSpaces = Math.floor(getAverage(rows, cols) / 3);

    for (let i = 0; i < countOfContoroledSpaces; i++) {

        createControlledCell(0, 'x')

    }

    createControlledCell(2, 'x')
    createControlledCell(2, '/')



    const player1 = document.createElement("div");
    player1.classList.add('pawn1')
    const player2 = document.createElement("div");
    player2.classList.add('pawn2')

    const firstElement = tableMatrix[0][0]
    const lastElement = tableMatrix[rows - 1][cols - 1];

    firstElement.textContent = "0"
    firstElement.appendChild(player1);
    firstElement.contents = "0";
    firstElement.classList.add('used')

    lastElement.textContent = "0";
    lastElement.appendChild(player2);
    lastElement.contents = "0";
    lastElement.classList.add('used')

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.getRandomInt = getRandomInt;

function getAverage(num1, num2) {
    return (num1 + num2) / 2;
}





function endGame() {

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            tableMatrix[i][j].removeEventListener('click', handleCellClick);
        }
    }

    localStorage.clear();

    if(scores.player1 > scores.player2){
        localStorage.setItem('winner', names[0]);
        setTimeout(4000, window.location.replace("winner.html"))
    }else{
        localStorage.setItem('winner', names[1]);
        setTimeout(4000, window.location.replace("winner.html"))
    }
    
}


function botTurn() {
    let x = positionPlayers[1].x
    let y = positionPlayers[1].y;
    let max = -99999999999999;
    let maxel;


    function computeNewScoreHighEnd(n1, n2) {
       return computeNewScore(scores.player2, tableMatrix[y + n1]?.[x + n2]?.operation, tableMatrix[y + n1]?.[x + n2]?.number);
    }

    const score1 = computeNewScoreHighEnd(0, 1); 
    if(score1 > max && score1 != undefined && !tableMatrix[y]?.[x + 1]?.classList.contains('used') && tableMatrix[y]?.[x + 1]) {
        max = score1;
        maxel = tableMatrix[y]?.[x + 1];
    }

    const score2 = computeNewScoreHighEnd(1, 1); 
    if(score2 > max && score2 != undefined && !tableMatrix[y + 1]?.[x + 1]?.classList.contains('used')  && tableMatrix[y + 1]?.[x + 1]) {
        max = score2;
        maxel = tableMatrix[y + 1]?.[x + 1];
    }

    const score3 = computeNewScoreHighEnd(1, 0); 
    if(score3 > max && score3 != undefined && !tableMatrix[y + 1]?.[x]?.classList.contains('used') && tableMatrix[y + 1]?.[x]) {
        max = score3;
        maxel = tableMatrix[y + 1]?.[x];
    }

    const score4 = computeNewScoreHighEnd(1, -1);  
    if(score4 > max && score4 != undefined && !tableMatrix[y + 1]?.[x - 1]?.classList.contains('used')  && tableMatrix[y + 1]?.[x - 1]) {
        max = score4;
        maxel = tableMatrix[y + 1]?.[x - 1];
    }

    const score5 = computeNewScoreHighEnd(0, -1); 
    if(score5 > max && score5 != undefined && !tableMatrix[y]?.[x - 1]?.classList.contains('used') && tableMatrix[y]?.[x - 1]) {
        max = score5;
        maxel = tableMatrix[y]?.[x - 1];
    }

    const score6 = computeNewScoreHighEnd(-1, -1);
    if(score6 > max && score6 != undefined && !tableMatrix[y - 1]?.[x - 1]?.classList.contains('used') && tableMatrix[y - 1]?.[x - 1]) {
        max = score6;
        maxel = tableMatrix[y - 1]?.[x - 1];
    }

    const score7 = computeNewScoreHighEnd(-1, 0);
    if(score7 > max && score7 != undefined && !tableMatrix[y - 1]?.[x]?.classList.contains('used') && tableMatrix[y - 1]?.[x]) {
        max = score7;
        maxel = tableMatrix[y - 1]?.[x];
    }

    const score8 = computeNewScoreHighEnd(-1, 1);
    if(score8 > max && score8 != undefined && !tableMatrix[y - 1]?.[x + 1]?.classList.contains('used')  && tableMatrix[y - 1]?.[x + 1]) {
        max = score8;
        maxel = tableMatrix[y - 1]?.[x + 1];
    }


    maxel.click();

}


function computeNewScore(score, action, number) {

    switch (action) {
        case '':
            score += number;
            break;
        case '-':
            score -= number;
            break;
        case 'x':
            score *= number;
            break;
        case '/':
            score /= number;
            break;

    }
    return score;
}