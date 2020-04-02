const express = require("express");
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

// Serving static files
app.use(express.static(path.join(cwd, "/public")));

// setting middleware view engine
app.set("views", viewsDirectory);
app.set("view engine", "ejs");

// defining routes
app.get('/', (request, response) => {
  response.render("index");
});

app.get('/board/:id', (request, response) => {
  response.render('pages/board');
});

// listening to server on defined port
app.listen(port, () => {
  console.log(`Web app is running on ${port}`);
});
