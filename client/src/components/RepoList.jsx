import React from 'react';

export default function RepoList({ repos }) {

  // an arr of object - access items accordingly
  // for some reason need to check for truthy value
  var array = repos.data;
  const repoView = array && array.map((repo, index) =>
  <>
  <span key={index}>
    <p><strong>{repo.username}</strong></p>
    {/* to create a hyperlink for the repo */}
    <a href={repo.url}>{repo.repoName}</a>
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
