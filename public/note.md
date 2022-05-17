```js
for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', function () {
        console.log(elements[i]);
        elements[i].firstElementChild.innerText = switchPlayer(player1, player2);

        if (checkIfGridIsFull(elements)) {
            console.log('draw');
            setTimeout(function () {
                alert('draw');
                location.reload();
            }, 100);

        }

        if (blockUserInput(elements)) {
            console.log('block');
        }


        // if (checkWinnerRow(elements)) {
        //     alert('Winner is ' + elements[i].firstElementChild.innerText);
        //     location.reload();
        // }
    });
}
```

````
function createIA(elements) {
    let random = Math.floor(Math.random() * 9);
    if (elements[random].firstElementChild.innerText === '') {
        elements[random].firstElementChild.innerText = player2.icon;
        elements[random].classList.add('player2');
        switchPlayer(player1, player2);
        return true
    }
    else {
        return false
    }
}
```