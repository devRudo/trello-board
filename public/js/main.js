document.addEventListener("DOMContentLoaded", () => {
    let addList = document.getElementById('addlist');
    let addCard = Array.from(document.getElementsByClassName('addcard'));
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
    addList.addEventListener('click', (event) => addListFun(event));
    addCard.forEach((addcard) => {
        addcard.addEventListener('click', (event) => addCardFun(event));
    });

});
