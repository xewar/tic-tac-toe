let gameBoard = (() => { 
    let size = [3,3]            //Creating the board, an array of arrays
    let val = ''
    let makeMatrix = function(size){ 
        let matrix = []
        for (let j = 0; j< size[0];j++) {
            for (let i = 0; i < size[1]; i++) {
                matrix.push([i,j,val])
            }
        } return matrix
    }
    let board = makeMatrix(size);
    let gameContainer = document.querySelector('#gameContainer');  //initial rendering of the board
    for (cell in board) {
        let newCell = document.createElement('div')
        newCell.classList.add('gameCell')
        newCell.setAttribute('id',board[cell].slice(0,2));
        newCell.textContent = board[cell][3]
        gameContainer.appendChild(newCell)
    }
return board
})();

let turnNumber = 0;
let selectedPlayer = ['X','O']; //start as 'X' unless you select 'O'

//Activating buttons that can be used to select a player
let playerInit = (() => {
    let playerButtons = document.querySelectorAll('.player');
    playerButtons.forEach(button => button.addEventListener('click', function () {choosePlayer(button); animate(button)}));
    const choosePlayer = ((button) => {    //Able to choose either 'X' or 'O' at the beginning of each game 
        if (turnNumber > 0) {
            return
        } if (button.textContent === 'O') {
                selectedPlayer = ['O','X'];
        } if (button.textContent === 'X') { //in case a player is going back and forth between them at the beginning
            selectedPlayer = ['X','O'];
        }
    });
    //button animations
    function animate(button){
        if (turnNumber > 0){
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
})();


let xSet = new Set(); //store each players position in a set
let oSet = new Set(); //store each players position in a set
//Updating the display and board each time a square is selected
const updateCellandBoard = (cell) => {
    turnNumber += 1;
    if (cell.textContent != ''){ //can't click the same square twice
        return
    }
    (selectedPlayer[0] === 'X')? xSet.add(cell.getAttribute('id')) : oSet.add(cell.getAttribute('id')) 
    cell.textContent = selectedPlayer[0]; //update display
    for (item in gameBoard) { //update Board
        if (cell.getAttribute('id') === String(gameBoard[item].slice(0,2))) {
            gameBoard[item][2] = selectedPlayer[0]
        }
    } selectedPlayer = [selectedPlayer[1],selectedPlayer[0]]
};


//Clicking on a cell updates it with new value
let allCells = document.querySelectorAll('.gameCell');
allCells.forEach(cell => cell.addEventListener('click', function(){
    updateCellandBoard(cell); findWinner()
}));

let lastTurn = 0
let winner = [];
//Check for a winner
const findWinner = () => {
    let message = document.querySelector('#message');
    let winningArrays = [['0,0', '0,1', '0,2'],['1,0', '1,1', '1,2'],['2,0', '2,1', '2,2'],
    ['0,0', '1,0', '2,0'],['0,1', '1,1', '2,1'],['0,2', '1,2', '2,2'],
    ['0,0', '1,1', '2,2'],['2,0', '1,1', '0,2']
        ];
    for (set of winningArrays) { //checking the players positions against the winning combinations of positions
        let xCount = 0 
        let oCount = 0
        for (item of set) {
            if (xSet.has(item)) {
                xCount+=1;
            } else if (oSet.has(item)) {
                oCount +=1
            }
        } if (xCount === 3){
            winner.push('X');
            lastTurn += 1;
        } if (oCount === 3){
            winner.push('O');
            lastTurn += 1;
        }
    
    //Second player wins
    } if ((lastTurn === 1) && (xSet.size === oSet.size)) {
        message.textContent = `${winner[0]} wins.`
    //First player wins
    } else if (lastTurn === 2) {
        message.textContent = `${winner[0]} wins.`
    //Tie
    } else if ((lastTurn === 3) || (xSet.size +oSet.size === 9)){ 
        message.textContent = 'Tie.';
    } 
}    

//Restart
const restartGame = () => {
    turnNumber = 0;
    for (item of gameBoard) {
        item[2] = '';
        let cellToClear = document.getElementById(String(item.slice(0,2)));
        cellToClear.textContent = '';
    }
    xSet = new Set();
    oSet = new Set();
    winner = [];
    lastTurn = 0;
    message.textContent='';
}

let restart = document.querySelector('.restart');
restart.addEventListener('click', restartGame)

