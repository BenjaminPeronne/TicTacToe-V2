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
        return player2.icon
    }
    else {
        player1.turn = true;
        player2.turn = false;
        currentPlayer.innerText = 'Player : ' + player2.icon + ' turn';
        return player1.icon
    }
}

// function blockClick to prevent click on already inserted element
function blockClick(element) {
    element.addEventListener('click', function (e) {
        e.preventDefault();
    })
}

// Check if there is 3 aligned elements in a row, column or diagonal
function checkWin(grid) {
    if (grid[0].innerText === grid[1].innerText && grid[1].innerText === grid[2].innerText && grid[0].innerText !== '') {
        return true
    }
    else if (grid[3].innerText === grid[4].innerText && grid[4].innerText === grid[5].innerText && grid[3].innerText !== '') {
        return true
    }
    else if (grid[6].innerText === grid[7].innerText && grid[7].innerText === grid[8].innerText && grid[6].innerText !== '') {
        return true
    }
    else if (grid[0].innerText === grid[3].innerText && grid[3].innerText === grid[6].innerText && grid[0].innerText !== '') {
        return true
    }
    else if (grid[1].innerText === grid[4].innerText && grid[4].innerText === grid[7].innerText && grid[1].innerText !== '') {
        return true
    }
    else if (grid[2].innerText === grid[5].innerText && grid[5].innerText === grid[8].innerText && grid[2].innerText !== '') {
        return true
    }
    else if (grid[0].innerText === grid[4].innerText && grid[4].innerText === grid[8].innerText && grid[0].innerText !== '') {
        return true
    }
    else if (grid[2].innerText === grid[4].innerText && grid[4].innerText === grid[6].innerText && grid[2].innerText !== '') {
        return true
    }
    else {
        return false
    }
}

function checkIfGridIsFull(grid) {
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].innerText === '') {
            return false
        }
    }
    return true
}

for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', function () {
        console.log(elements[i]);
        elements[i].firstElementChild.innerText = switchPlayer(player1, player2);

        if (blockClick(elements[i])) {
            console.log('blocked');
        }

        if (checkIfGridIsFull(elements)) {
            console.log('draw');
            setTimeout(function () {
                alert('draw');
                location.reload();
            }, 100);
            
        }

        // if (checkWinnerRow(elements)) {
        //     alert('Winner is ' + elements[i].firstElementChild.innerText);
        //     location.reload();
        // }
    });
}