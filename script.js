let gameBoard = (() => { //creating the board, an array of arrays
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

//render the game for the first time
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
const updateBoard = () => {
    console.log('hi')
};

let selectedPlayer = ['X','O'];

const updateCell = (cell)=> {
    cell.textContent = selectedPlayer[0];
    console.log(cell.classList);
    selectedPlayer = [selectedPlayer[1],selectedPlayer[0]]
};
let allCells = document.querySelectorAll('.gameCell');
allCells.forEach(cell => cell.addEventListener('click', function(){
    updateCell(cell)
}));






//select 'x' or 'o' to start the game




console.log(gameBoard)

const Player = (name, side) => {
    const _score = 0;
    const getScore = () => _score;
    return {getScore}
}


// const gamePlay = (() => {

// })();



//update the game with new array values
