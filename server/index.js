const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
let app = express();
const {Repo, save} = require('../database/index');
const {getReposByUsername} = require('../helpers/github');

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
  // pass this info into getRepos

  getReposByUsername(req, res)
    .then(response => {
      // pass appropriate info to save
      save(response);
      res.end();
    })
    .catch(err => {
      console.error(err);
    })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  Repo.find({}).sort({forks: 'desc'}).limit(25)
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

