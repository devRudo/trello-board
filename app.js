const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const cwd = process.cwd();
const config = require(path.join(cwd, "/config/config"));
const viewsDirectory = path.join(cwd, "/views");
const port = config.port;
const trello_api_key = config.TRELLO_API_KEY;
const trello_token = config.TRELLO_TOKEN;

const fetch = require("node-fetch");

// overriding environment variable in development environment mode
let options = {};
if (config.NODE_ENV !== "production") {
  options.overrideProcessEnv = true;
  require("dotenv-extended").load();
}

// Creating new express server instance
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serving static files
app.use(express.static(path.join(cwd, "/public")));

// setting middleware view engine
app.set("views", viewsDirectory);
app.set("view engine", "ejs");

// defining routes

// getting all boards
app.get('/', (request, response) => {
  fetch(`https://api.trello.com/1/members/me/boards/?key=${trello_api_key}&token=${trello_token}`)
    .then(response => response.json())
    .then(boards => response.render('index', { boards, error: [] }))
    .catch(err => console.log(err));
});

// getting all information about a particular board
app.get('/board/:id', (request, response) => {
  fetch(`https://api.trello.com/1/boards/${request.params.id}?lists=open&cards=open&checklists=all&key=${trello_api_key}&token=${trello_token}`)
    .then(response => response.json())
    .then(board => response.render('pages/board', { board, boards: [] }))
    .catch(err => console.log(err));
});


// adding a new board
app.post('/addboard', (request, response) => {
  fetch(`https://api.trello.com/1/boards?name=${request.body.board_name}&key=${trello_api_key}&token=${trello_token}`, {
    method: 'POST'
  })
    .then(response => {
      console.log(`Response : ${response.status} ${response.statusText}`);
      return response.text();
    })
    .then(text => response.redirect(request.get('Referer')))
    .catch(err => console.log(err));
});

// deleting a board
app.post('/deleteBoard', (request, response) => {
  let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886', '5e888bce45f5e186182c5c8e'];
  if (!notAllowedToDelete.includes(request.body.boardId)) {
    fetch(`https://api.trello.com/1/boards/${request.body.boardId}/?key=${trello_api_key}&token=${trello_token}`, {
      method: 'DELETE'
    })
      .then(response => {
        console.log(`Response : ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then(text => {
        let status = {};
        status.statusType = "success";
        status.statusText = "Card Deleted";
        response.set('Content-type', 'text/plain');
        response.send(status);
      })
      .catch(err => console.log(err));
  }
  else {
    let status = {};
    status.statusType = "error";
    status.statusText = "Not allowed to delete this board";
    response.set('Content-type', 'text/plain');
    response.send(status);
  }
});

// Adding a card to a list
app.post('/cards', (request, response) => {
  let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886'];
  let Referer = request.get('Referer').split('/');
  Referer = Referer[Referer.length - 1];
  if (!notAllowedToDelete.includes(Referer)) {
    fetch(`https://api.trello.com/1/cards?idList=${request.body.list_id}&name=${request.body.name}&key=${trello_api_key}&token=${trello_token}`, {
      method: 'POST'
    })
      .then(response => {
        console.log(`Response : ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then(text => response.redirect(request.get('Referer')))
      .catch(err => console.log(err));
  }
  else {
    response.redirect(request.get('Referer'));
  }
});


// Adding a list to a board
app.post('/lists', (request, response) => {
  let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886'];
  let Referer = request.get('Referer').split('/');
  Referer = Referer[Referer.length - 1];
  if (!notAllowedToDelete.includes(Referer)) {
    fetch(`https://api.trello.com/1/lists?idBoard=${request.body.board_id}&name=${request.body.name}&pos=bottom&key=${trello_api_key}&token=${trello_token}`, {
      method: 'POST'
    })
      .then(response => {
        console.log(`Response : ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then(text => response.redirect(request.get('Referer')))
      .catch(err => console.log(err));
  }
  else {
    response.redirect(request.get('Referer'));
  }
});


// Updating Board Name
app.post('/updateBoardName', (request, response) => {
  let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886'];
  let urlsplit = request.get('Referer').split('/');
  let boardId = urlsplit[urlsplit.length - 1];
  if (!notAllowedToDelete.includes(boardId)) {
    fetch(`https://api.trello.com/1/boards/${boardId}?name=${request.body.boardName}&key=${trello_api_key}&token=${trello_token}`, {
      method: 'PUT'
    })
      .then(response => {
        console.log(`Response : ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then(text => response.redirect(request.get('Referer')))
      .catch(err => console.log(err));
  }
  else {
    response.redirect(request.get('Referer'));
  }
});

// Updating List Name
app.post('/updateListName', (request, response) => {
  let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886'];
  let urlsplit = request.get('Referer').split('/');
  let boardId = urlsplit[urlsplit.length - 1];
  if (!notAllowedToDelete.includes(boardId)) {
    fetch(`https://api.trello.com/1/lists/${request.body.listId}?name=${request.body.listName}&key=${trello_api_key}&token=${trello_token}`, {
      method: 'PUT'
    })
      .then(response => {
        console.log(`Response : ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then(text => response.redirect(request.get('Referer')))
      .catch(err => console.log(err));
  }
  else {
    response.redirect(request.get('Referer'));
  }
});


// Updating card name
app.post('/updateCardName', (request, response) => {
  let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886'];
  let urlsplit = request.get('Referer').split('/');
  let boardId = urlsplit[urlsplit.length - 1];
  if (!notAllowedToDelete.includes(boardId)) {
    fetch(`https://api.trello.com/1/cards/${request.body.cardId}?name=${request.body.cardName}&key=${trello_api_key}&token=${trello_token}`, {
      method: 'PUT'
    })
      .then(response => {
        console.log(`Response : ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then(text => response.redirect(request.get('Referer')))
      .catch(err => console.log(err));
  }
  else {
    response.redirect(request.get('Referer'));
  }
});

// deleting a card
app.post('/deleteCard', (request, response) => {
  let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886'];
  let urlsplit = request.get('Referer').split('/');
  let boardId = urlsplit[urlsplit.length - 1];
  if (!notAllowedToDelete.includes(boardId)) {
    fetch(`https://api.trello.com/1/cards/${request.body.cardId}?key=${trello_api_key}&token=${trello_token}`, {
      method: 'DELETE'
    })
      .then(response => {
        console.log(`Response : ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then(text => response.redirect(request.get('Referer')))
      .catch(err => console.log(err));
  }
  else {
    response.redirect(request.get('Referer'));
  }
});

// deleting a list
app.post('/deleteList', (request, response) => {
  let notAllowedToDelete = ['5e65bd8ff425e525aca64631', '5e845a3b779e06357216fd3d', '5e60b76c5b928d283db14923', '5e8876da77268e2656264886'];
  let urlsplit = request.get('Referer').split('/');
  let boardId = urlsplit[urlsplit.length - 1];
  if (!notAllowedToDelete.includes(boardId)) {
    fetch(`https://api.trello.com/1/lists/${request.body.listId}/closed?value=true&key=${trello_api_key}&token=${trello_token}`, {
      method: 'PUT'
    })
      .then(response => {
        console.log(`Response : ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then(text => response.redirect(request.get('Referer')))
      .catch(err => console.log(err));
  }
  else {
    response.redirect(request.get('Referer'));
  }
});

// listening to server on defined port
app.listen(port, () => {
  console.log(`Web app is running on ${port}`);
});
