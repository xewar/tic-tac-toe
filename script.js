//Creating the board, an array of arrays
let gameBoard = (() => { 
    let size = [3,3]
    let val = ''
    let makeMatrix = function(size){ 
        let matrix = []
        for (let j = 0; j< size[0];j++) {
            for (let i = 0; i < size[1]; i++) {
                matrix.push([i,j,val])
            }
        } return matrix
    }
    let board = makeMatrix(size)
return board
})();

//Initial rendering of the game
const renderGame = (() => {
    let gameContainer = document.querySelector('#gameContainer');
    for (cell in gameBoard) {
        let newCell = document.createElement('div')
        newCell.classList.add('gameCell')
        newCell.setAttribute('id',gameBoard[cell].slice(0,2));
        newCell.textContent = gameBoard[cell][3]
        gameContainer.appendChild(newCell)
    }
})();

let selectedPlayer = ['X','O']; //start as 'X' unless you select 'O'
let gameHasStarted = 0;

//Activating buttons that can be used to select a player
let buttonInitialization = (() => {
    let playerButtons = document.querySelectorAll('.player');
    playerButtons.forEach(button => button.addEventListener('click', function () {choosePlayer(button); animate(button)}));
})();

//Able to choose either 'X' or 'O' at the beginning of each game
const choosePlayer = ((button) => {    
    if (gameHasStarted === 1) {
        return
    } if (button.textContent === 'O') {
            selectedPlayer = ['O','X'];
    } if (button.textContent === 'X') { //in case a player is going back and forth between them at the beginning
        selectedPlayer = ['X','O'];
    }
});
//button animations
function animate(button){
    if (gameHasStarted === 1){
        return
    }
    let players = document.querySelector('#players');
    button.setAttribute('id','pressed');
    if (players.firstElementChild === button) { //remove highlight from the button that's not selected
        button.nextElementSibling.removeAttribute('id','pressed');
    }
    else {
        players.firstElementChild.removeAttribute('id','pressed');
    }
}
function removeAnimation(button){
    if (button.getAttribute('class') === 'pressed'){
        button.removeAttribute('class','pressed');
    }
}


//Updating the display and board each time a square is selected
const updateCellandBoard = (cell) => {
    gameHasStarted = 1;
    if (cell.textContent != ''){ //can't click the same square twice
        return
    }
    cell.textContent = selectedPlayer[0]; //update display
    for (item in gameBoard) { //update Board
        if (cell.getAttribute('id') === String(gameBoard[item].slice(0,2))) {
            gameBoard[item][2] = selectedPlayer[0]
        }
    }
    selectedPlayer = [selectedPlayer[1],selectedPlayer[0]]
    console.log(gameBoard)
    return{gameBoard}
};

//Clicking on a cell updates it with new value
let allCells = document.querySelectorAll('.gameCell');
allCells.forEach(cell => cell.addEventListener('click', function(){
    updateCellandBoard(cell)
}));


const Player = (name, side) => {
    const _score = 0;
    const getScore = () => _score;
    return {getScore}
}


//update the game with new array values
