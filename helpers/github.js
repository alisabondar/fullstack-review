const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (req, res) => {
  // accepts original req, res from server/index
  const username = req.body.data;
  // dont forget to return the axios promise
  return axios({
    method: 'get',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }})
    .then(response => {
      // return statement!
      return response;
    })
    .catch(err => {
      console.error(err);
  });
};

module.exports.getReposByUsername = getReposByUsername;