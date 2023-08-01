const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (req, res) => {
  // TODO - Use the axios module to request repos for a specific user from the github API

  // accepts original req, res from server/index
  const username = req.body.data;
  // console.log('9 getRepos username', username);

  // dont forget to return the axios promise
  return axios({
    method: 'get',
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }})
    .then(response => {
      // console.log('18 GET success,', response.data);
      // return statement!
      return response;
    })
    .catch(err => {
      console.error(err);
  });
};

module.exports.getReposByUsername = getReposByUsername;