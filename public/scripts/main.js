const elements = document.querySelectorAll('.element'); // Get all elements
const currentPlayer = document.querySelector('#currentPlayer'); // Reset the game

let player1 = {
    icon: 'X',
    turn: false,
    win: false,
    score: 0
}

let player2 = {
    icon: 'O',
    turn: true,
    win: false,
    score: 0
}

// Switch player turn between X and O
function switchPlayer(player1, player2) {
    if (player1.turn === true) {
        player1.turn = false;
        player2.turn = true;
        currentPlayer.innerText = 'Player : ' + player1.icon + ' turn';
        return player2.icon;
    }
    else {
        player1.turn = true;
        player2.turn = false;
        currentPlayer.innerText = 'Player : ' + player2.icon + ' turn';
        return player1.icon;
    }
}

// Check if the grid is full, if is it then stop the game
function checkIfGridIsFull(grid) {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].innerText === '') {
            return false;
        }
    }
    return true
}

// Check if there is 3 aligned elements in a row, column or diagonal
function checkWin(grid) {
    if (grid[0].innerText === grid[1].innerText && grid[1].innerText === grid[2].innerText && grid[0].innerText !== '') {
        return true;
    }
    else if (grid[3].innerText === grid[4].innerText && grid[4].innerText === grid[5].innerText && grid[3].innerText !== '') {
        return true;
    }
    else if (grid[6].innerText === grid[7].innerText && grid[7].innerText === grid[8].innerText && grid[6].innerText !== '') {
        return true;
    }
    else if (grid[0].innerText === grid[3].innerText && grid[3].innerText === grid[6].innerText && grid[0].innerText !== '') {
        return true;
    }
    else if (grid[1].innerText === grid[4].innerText && grid[4].innerText === grid[7].innerText && grid[1].innerText !== '') {
        return true;
    }
    else if (grid[2].innerText === grid[5].innerText && grid[5].innerText === grid[8].innerText && grid[2].innerText !== '') {
        return true;
    }
    else if (grid[0].innerText === grid[4].innerText && grid[4].innerText === grid[8].innerText && grid[0].innerText !== '') { 
        return true;
    }
    else if (grid[2].innerText === grid[4].innerText && grid[4].innerText === grid[6].innerText && grid[2].innerText !== '') {  
        return true;
    }
    else {
        return false; 
    }
}

// min max algorithm to find the best move for the computer
function minMax(grid, player) {
    let bestMove = {
        score: -Infinity,
        move: null
    }
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].firstElementChild.innerText === '') {
            grid[i].firstElementChild.innerText = player.icon
            if (checkWin(grid) === true) {
                grid[i].firstElementChild.innerText = ''                
                return {
                    score: 1,
                    move: i
                }
            }
            else if (checkIfGridIsFull(grid) === true) {
                grid[i].firstElementChild.innerText = ''
                return {
                    score: 0,
                    move: i
                }
            }
            else {
                let result = minMax(grid, player)
                grid[i].firstElementChild.innerText = ''
                if (result.score > bestMove.score) {
                    bestMove.score = result.score
                    bestMove.move = i
                }
            }
        }
    }
    return bestMove
}


// Start the game
function startGame() {
    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', function () {
            if (elements[i].firstElementChild.innerText === '') {
                elements[i].firstElementChild.innerText = switchPlayer(player1, player2)
                if (checkWin(elements) === true) {
                    currentPlayer.innerText = 'Game is done with a victory ...';
                    player1.win = true;
                    player2.win = false;
                    player1.score++;
                    setTimeout(function () {
                        switchPlayer(player1, player2);  // Lazy version ...
                        alert('Player ' + switchPlayer(player1, player2) + ' win');
                        location.reload();
                    }, 100);
                    // document.querySelector('#player1').innerText = player1.score;
                }
                else if (checkIfGridIsFull(elements) === true) {
                    currentPlayer.innerText = 'Draw';
                    player1.win = false;
                    player2.win = false;
                    setTimeout(function () {
                        alert('Game is a draw');
                        location.reload();
                    }, 100);
                }
                else {
                    let result = minMax(elements, player1)
                    elements[result.move].firstElementChild.innerText = switchPlayer(player1, player2)
                    if (checkWin(elements) === true || checkIfGridIsFull(elements) === true && checkWin(elements) === true) {
                        currentPlayer.innerText = 'Game is done with a victory ...';
                        player1.win = true;
                        player2.win = false;
                        player1.score++;
                        // document.querySelector('#player1').innerText = player1.score;
                        setTimeout(function () {
                            switchPlayer(player1, player2);  // Lazy version ...
                            alert('Player ' + switchPlayer(player1, player2) + ' win');
                            location.reload();
                        }, 100);
                    }
                }
            }
        })
    }
}

startGame();