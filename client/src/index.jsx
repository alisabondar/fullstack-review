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
        console.log('data fetched', data);
        setRepos(data);
      })
      .catch(err => console.log('Cannot fetch repos', err))
  }

  // post into db and rerender..?
  const search = (term) => {
    console.log(`${term} was searched`);
    axios.post('/repos', { data: term })
      .catch(err => console.error(err));
  }

  return (
    <div>
      <h1>Github Fetcher</h1>
      <Search onSearch={search}/>
      {/* <p>There are {length()} repos.</p> */}
      <RepoList repos={repos}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));