import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

const App = () => {

  const [repos, setRepos] = useState([]);

  // render initial page
  useEffect(() => {
    fetch();
  }, []);

  // update with db data
  // display only top 25
  let fetch = () => {
    axios.get('/repos')
      .then(data => {
        // console.log('data fetched', data);
        // sort data IN DATABASE
        setRepos(data);
      })
      .catch(err => console.log('Cannot fetch repos', err))
  }

  // post into db and rerender!!!
  const search = (term) => {
    console.log(`${term} was searched`);
    axios.post('/repos', { data: term })
    // update db and FETCH
      .then(() => fetch())
      .catch(err => console.error(err));
  }

  let length = (data) => 0;

  return (
    <div>
      <h1>Github Fetcher</h1>
      <Search onSearch={search} fetch={fetch}/>
      <p>There are {length(repos)} repos.</p>
      <RepoList repos={repos}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));