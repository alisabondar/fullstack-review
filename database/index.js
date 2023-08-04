const mongoose = require('mongoose');
// import bluebird for promisification
var Promise = require("bluebird");
Promise.promisifyAll(require("mongoose"));

// define connection
mongoose.connect('mongodb://localhost/fetcher', {useNewUrlParser: true, useUnifiedTopology: true});
// const db = mongoose.connection;

// define schema
let repoSchema = mongoose.Schema({
  username: String,
  // add unique true
  url: {
    type: String,
    unique: true
  },
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

repoSchema.methods.save = (req, res) => {
  // This function should save a repo/repos to the MongoDB
  // call Repo.create() with req values
  // return Repo.find();
  console.log(req.data);
  // req.data returns an array of obj
  req.data.forEach(repo => {
    // account for duplicates!
    Repo.create({ username: repo.owner.login, url: repo.html_url, forks: repo.forks_count })
      // .then(() => Repo.find({}))
      .catch(err => console.error(err));
  })
}

// how to refactor into one export?
module.exports.save = repoSchema.methods.save;
module.exports.Repo = Repo;