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
app.get('/', (request, response) => {
  fetch(`https://api.trello.com/1/members/me/boards/?key=${trello_api_key}&token=${trello_token}`)
    .then(response => response.json())
    .then(boards => response.render('index', { boards }))
    .catch(err => console.log(err));
});

app.get('/board/:id', (request, response) => {
  fetch(`https://api.trello.com/1/boards/${request.params.id}?lists=all&cards=all&key=${trello_api_key}&token=${trello_token}`)
    .then(response => response.json())
    .then(board => response.render('pages/board', { board, boards: [] }))
    .catch(err => console.log(err));
});

app.post('/cards', (request, response) => {
  fetch(`https://api.trello.com/1/cards?idList=${request.body.list_id}&name=${request.body.name}&key=${trello_api_key}&token=${trello_token}`, {
    method: 'POST'
  })
    .then(response => {
      console.log(`Response : ${response.status} ${response.statusText}`);
      return response.text();
    })
    .then(text => response.redirect(request.get('Referer')))
    .catch(err => console.log(err));
});

app.post('/lists', (request, response) => {
  fetch(`https://api.trello.com/1/lists?idBoard=${request.body.board_id}&name=${request.body.name}&pos=bottom&key=${trello_api_key}&token=${trello_token}`, {
    method: 'POST'
  })
    .then(response => {
      console.log(`Response : ${response.status} ${response.statusText}`);
      return response.text();
    })
    .then(text => response.redirect(request.get('Referer')))
    .catch(err => console.log(err));
});

// listening to server on defined port
app.listen(port, () => {
  console.log(`Web app is running on ${port}`);
});
