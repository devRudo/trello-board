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
    });

    // Update card content
    $('.cardDiv').each((i, card) => {
        $(card).hover(() => {
            $(card).children().children().next().toggleClass('d-none');
        });
        $(card).click((event) => {
            if ($(card).children().children().attr('contenteditable') !== 'true') {
                let cardId = $(card).children().attr('cardId');
                $('#' + cardId).modal('toggle');
            }
        });
    });

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
    });

    // delete card
    $('.deleteCard').each((i, card) => {
        $(card).click(() => {
            let obj = {};
            obj.cardId = $(card).attr('cardId');
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

    $('.listOption').each((i, option) => {
        $(option).click(() => {
            $(option).next().toggleClass('d-none');
        });
    });

    $('.editCard').each((i, edit) => {
        $(edit).click((event) => {
            event.stopPropagation();
            $(edit).prev().attr('contenteditable', 'true').focus();
            $(edit).parent().parent().next().toggleClass('d-none');
        });
    });

    $('.deleteList').each((i, list) => {
        $(list).click(() => {
            let obj = {};
            obj.listId = $(list).attr('listId');
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

    $('.deleteChecklist').each((i, deleteCheckList) => {
        $(deleteCheckList).click(() => {
            let obj = {};
            obj.checkListId = $(deleteCheckList).attr('checkListId');
            fetch('/deleteCheckList', {
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

    $('.updateCheckListbtn').each((i, btn) => {
        $(btn).click(() => {
            $(btn).parent().parent().next().toggleClass('d-none');
        });
    });

    $('.addChecklistBtn').each((i, btn) => {
        $(btn).click(() => {
            $(btn).next().toggleClass('d-none');
        });
    });

    $('.addChecklistItembtn').each((i, btn) => {
        $(btn).click(() => {
            $(btn).parent().prev().toggleClass('d-none');
        });
    });

    $('.deleteCheckItem').each((i, btn) => {
        $(btn).click(() => {
            let obj = {};
            obj.idChecklist = $(btn).attr('data').split(" ")[0];
            obj.idCheckItem = $(btn).attr('data').split(" ")[1];
            fetch('/deleteCheckItem', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
                .then(() => $(btn).parent().remove())
                .catch((err) => {
                    console.log(err);
                });
        });
    });

    $('.updateCheckItemStatus').each((i, btn) => {
        $(btn).change(() => {
            let obj = {};
            obj.idCard = $(btn).attr('data').split(" ")[0];
            obj.idCheckItem = $(btn).attr('data').split(" ")[1];
            if ($(btn).is(':checked')) {
                obj.checkItemState = 'complete';
            }
            else if (!$(btn).is(':checked')) {
                obj.checkItemState = 'incomplete';
            }
            fetch('/updateCheckItemStatus', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
                .then()
                .catch((err) => {
                    console.log(err);
                });
        });
    });

    $('.checklistName').each((i, name) => {
        $(name).click(() => {
            $(name).toggleClass('d-none');
            $(name).next().toggleClass('d-none');
        });
    });

    $('.updateCheckItemNameForm').each((i, form) => {
        $(form).submit((event) => {
            event.preventDefault();
            let obj = {};
            obj.checkItemName = $(form).children().children().val();
            obj.idCard = $(form).children().children().next().val().split(" ")[0];
            obj.idCheckItem = $(form).children().children().next().val().split(" ")[1];
            fetch('/updateCheckItemName', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(obj)
            })
                .then(() => {
                    $(form).toggleClass('d-none');
                    $(form).prev().text(obj.checkItemName);
                    $(form).prev().toggleClass('d-none');
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    });

});
