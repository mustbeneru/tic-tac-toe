let isOver = false,
    scoreX = 0,
    scoreO = 0, 
    ties = 0,
    roundNumber = 1;     

const winnerX = document.querySelector('.playerX > .score'),
      winnerO = document.querySelector('.playerO > .score'),
      round = document.querySelector('.round > .score'),
      tie = document.querySelector('.ties > .score')
const Player = (marker) => {
    return {marker};
};

const gameBoard = (() => {
    let boardArray = ['', '', '',
                      '', '', '',
                      '', '', ''];
    
    const markerIntoArray = (index, sign) => {
        boardArray[index] = sign;
        return boardArray[index];
    }

    const resetArray = () => {
        for (let i = 0; i < 9; i++) {
            boardArray[i] = '';
        }
    }
    return {boardArray, markerIntoArray, resetArray}
})();

const display = (() => {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.addEventListener('click', (e) => {
            let arrayIndex = e.target.dataset.index;
            let boxContent = e.target.textContent;
            if (boxContent !== '') return;
            playGame.playRound(arrayIndex);
            updateBoard();
            
        });
    });

    const updateBoard = () => {
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].textContent = gameBoard.boardArray[i];
        }
    }    
    
    const resetRound = () => {
        if (activePlayer.marker === 'O') playGame.getNextPlayer();
        isOver = false;
        gameBoard.resetArray();
        updateBoard();
    } 

    const resetGame = () => {
        resetRound();
        scoreX = 0;
        scoreO = 0;
        roundNumber = 1;
        winnerX.textContent = 0
        winnerO.textContent = 0
        round.textContent = 1
    }

    const continueRound = document.querySelector('.continue')
    continueRound.addEventListener('click', (resetRound))

    const reset = document.querySelector('.reset')
    reset.addEventListener('click', (resetGame))
 
    return {boxes, resetRound, resetGame, updateBoard, continueRound}
})();

const playGame = (() => {
    const playerX = Player('X'),
          playerO = Player('O');

    let board = gameBoard.boardArray;
        activePlayer = playerX;

    const getNextPlayer = () => {
        console.log(activePlayer)  
        activePlayer === playerX ? activePlayer = playerO : activePlayer = playerX;
        console.log(activePlayer)  
    };

    const playRound = ((position) => {
        if (isOver) return;
        gameBoard.markerIntoArray(position, activePlayer.marker)
        checkWinner();
        getNextPlayer();
    })

    const checkWinner = (() => {
        const solutions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8], 
            [2, 4, 6]
        ];  

        for (let i = 0; i < solutions.length; i++) {
            const solution = solutions[i]
            const a = board[solution[0]]
            const b = board[solution[1]]
            const c = board[solution[2]]

            if (a === '' || b === '' || c === '') {
                continue;
            } 

            if (a === b && b === c && isOver === false) {
                round.textContent = roundNumber;
                if (activePlayer.marker === playerX.marker && a === 'X') {
                    scoreX++;
                    roundNumber++;
                    winnerX.textContent = scoreX;
                } else if (activePlayer.marker === playerO.marker && a === 'O') {
                    scoreO++;
                    roundNumber++
                    winnerO.textContent = scoreO;
                } else {
                    ties++;
                    tie.textContent = 'dsads';
                }
                return isOver = true;
            } 
        }
    })
    return {activePlayer, roundNumber, scoreX, scoreO, playRound, getNextPlayer, checkWinner}
})();
