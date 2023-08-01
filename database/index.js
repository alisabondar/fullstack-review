const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  username: String,
  url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (req, res, next) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  Repo.updateOne({username: req.owner.login, url: req.html_url, forks: req.forks});

  next();
}

let getAll = (req, res, next) => {
  Repo.find({})
    .then(repos => {
      res.json(repos);
    })
  next();
}

module.exports.save = save;
module.exports.getAll = getAll;