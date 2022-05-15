const elements = document.querySelectorAll('.element');
const currentPlayer = document.querySelector('#currentPlayer');
console.log(elements);

let player1 = {
    icon: 'X',
    turn: false
}

let player2 = {
    icon: 'O',
    turn: true
}

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

function checkWinnerRow(row) {
    if (row[0].innerText === row[3].innerText) {
        return true;
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