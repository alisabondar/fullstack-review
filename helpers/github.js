const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (req, res) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API
  const username = req.body.username;

  axios({
    // req.url?
    url: `https://api.github.com/users/${username}`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }})
    .then(response => {
      res.json(response.data);
    })
    .catch(err => console.error(err));
  };

module.exports.getReposByUsername = getReposByUsername;