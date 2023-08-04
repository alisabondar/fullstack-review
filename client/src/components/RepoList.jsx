import React from 'react';

export default function RepoList({ repos }) {
  // console.log('repos', repos.data);
  // console.log(Array.isArray(repos.data));
  var array = repos.data;
  // an arr of object - access items accordingly

  // const repoCheck = () => {
  //   if (array === undefined) {
  //     return <h3>No repos to display</h3>;
  //   } else {
  //     console.log(array);
  //     return (
  //     <>
  //       <p>There are {array.length} repos.</p>
  //       <div>{repoView}</div>
  //     </>
  //     )
  //   }
  // }

  const repoView = array && array.map((repo, index) =>
  <>
  <span key={index}>
    <h3>{repo.username}</h3>
    {/* to create a hyperlink for the repo */}
    <a href={repo.url}>{repo.url}</a>
    <h4>This repo has {repo.forks} forks!</h4>
  </span>
  </>
  );

  return (
    <div>
    <h4> Repo List Component </h4>
    <div>{repoView}</div>
  </div>
  )
}
