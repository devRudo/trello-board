$(document).ready(() => {
    let addList = document.getElementById('addlist');
    let addCard = Array.from(document.getElementsByClassName('addcard'));

    // function to add a new card
    let addCardFun = (event) => {
        let input = document.createElement('input');
        input.classList.add('list-group-item', 'rounded-lg', 'p-1', 'mb-3', 'shadow-sm');
        input.setAttribute('name', 'name');
        input.setAttribute('placeholder', 'Enter the title of this card...');
        let submit = document.createElement('button');
        submit.setAttribute('type', 'submit');
        submit.classList.add('btn', 'btn-success');
        submit.innerText = 'Add Card';
        event.target.previousElementSibling.lastElementChild.appendChild(input);
        event.target.previousElementSibling.lastElementChild.appendChild(submit);
        input.focus();
    }

    // function to add a new list
    let addListFun = (event) => {
        let input = document.createElement('input');
        input.classList.add('list-group-item', 'rounded-lg', 'p-1', 'mb-3', 'shadow-sm');
        input.setAttribute('name', 'name');
        input.setAttribute('placeholder', 'Enter the list title...');
        let submit = document.createElement('button');
        submit.setAttribute('type', 'submit');
        submit.classList.add('btn', 'btn-success');
        submit.innerText = 'Add List';
        event.target.previousElementSibling.children[0].appendChild(input);
        event.target.previousElementSibling.children[0].appendChild(submit);
        input.focus();
    }

    // event listener for addlist and addcard
    addList.addEventListener('click', (event) => addListFun(event));
    addCard.forEach((addcard) => {
        addcard.addEventListener('click', (event) => addCardFun(event));
    });

    // update boardname
    $('#boardName').keypress((e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            let obj = {}
            obj.boardName = $('#boardName').text();
            fetch('/updateBoardName', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
                .then(() => location.reload())
                .catch((err) => {
                    console.log(err);
                });
        }
    });

    // update list name
    $('.listName').each((i, listName) => {
        $(listName).keypress((e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                let obj = {}
                obj.listName = $(listName).text();
                obj.listId = $(listName).attr('listId');
                fetch('/updateListName', {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                })
                    .then(() => location.reload())
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
        $(listName).mouseenter((event) => {
            $(event.target).children().removeClass('d-none');
        });
        $(listName).mouseleave((event) => {
            $(event.target).children().addClass('d-none');
        });
    });

    // Update card content
    $('.cardName').each((i, cardName) => {
        $(cardName).keypress((e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                let obj = {}
                obj.cardName = $(cardName).text();
                obj.cardId = $(cardName).attr('cardId');
                fetch('/updateCardName', {
                    method: 'post',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(obj)
                })
                    .then(() => location.reload())
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
        $(cardName).mouseenter((event) => {
            $(event.target).children().removeClass('d-none');
        });
        $(cardName).mouseleave((event) => {
            $(event.target).children().addClass('d-none');
        });
    });

    // delete card
    $('.deleteCard').each((i, card) => {
        $(card).click(() => {
            let obj = {};
            obj.cardId = $(card).parent().attr('cardId');
            fetch('/deleteCard', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
                .then(() => location.reload())
                .catch((err) => {
                    console.log(err);
                });
        });
    });

    $('.deleteList').each((i, list) => {
        $(list).click(() => {
            let obj = {};
            obj.listId = $(list).parent().attr('listId');
            fetch('/deleteList', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
                .then(() => location.reload())
                .catch((err) => {
                    console.log(err);
                });
        });
    });

});
