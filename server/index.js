const express = require('express');
const path = require('path');
let app = express();
let github = require('../helpers/github');
let db = require('../database/index');

// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.

// runs before EVERYTHING - establishes HOST
app.use(express.static(path.join(__dirname, '../client/dist')));
// parse JSON bodies
app.use(express.json());

// routes between client and server
app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  const username = req.body.username;
  // GET from API -> getReposByUsername
  // save to DB -> save/index.js
  if (err) {
    console.error(err);
  } else {
    github.getReposByUsername(username)
      .then(data => {
        console.log('getReposByUser data,', data);
        // dont forget return statement
        return db.save(null, data);
      })
      .then(updated => {
        res.json(updated);
      })
      .catch(err => {
        console.error(err);
      })
  }
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.getAll()
    .then(data => {
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

