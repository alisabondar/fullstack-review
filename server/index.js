const express = require('express');
const path = require('path');
let app = express();
var bodyParser = require('body-parser');

let db = require('../database/index');
let github = require('../helpers/github');

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.

// runs before EVERYTHING - establishes HOST
app.use(express.static(path.join(__dirname, '../client/dist')));
// parse JSON bodies
app.use(bodyParser.json());

// routes between client and server
app.post('/repos', function (req, res) {
  // GET from API -> getReposByUsername
  // save to DB -> save/index.js

  // let username = req.body;
  // console.log('25 username in app.post, ', username);
  // pass this info into getRepos

  github.getReposByUsername(req, res)
    .then(response => {
      // console.log('29 getReposByUser data,', response);
      // dont forget return statement
      // pass appropriate info to save
      db.save(response);
      res.end();
    })
    .catch(err => {
      console.error(err);
    })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.Repo.find({}).sort({forks: 'desc'})
    .then(data => {
      // sort by forks!
      // console.log('get success', data);
      res.json(data);
    })
    .catch(err => {
      console.error(err);
    })
});

// listens to host at specified port
let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

