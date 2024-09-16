import { useState, useEffect } from 'react';
import { octokit } from 'utils/octokit';

function useOctokit(username, repo, url) {
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    try {
      const res = await octokit.request('GET {url}', {
        // const res = await octokit.request('GET /users/{account_id}', {
        // const res = await octokit.request('GET /users/{account_id}/repos?type=all', {
        // const res = await octokit.request('GET /repos/{account_id}/{repo}/commits', {
        account_id: username,
        repo: repo,
        url: url,
        // params: params,
        // per_page: 100,

        headers: { 'X-GitHub-Api-Version': '2022-11-28' },
      });

      setUser(res.data);

      // const headerString = res ? res.headers.link : '';
      const headerString = res.headers.link;
      const numOfPage = headerString.split(',')[1];
      const counts = res.headers.link
        ? numOfPage
            .match(/&page=[0-9]*[>&]/)
            .join('')
            .replace(/[^0-9]/g, '')
        : 0;

      setUser({ ...res.data, counts: counts });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return user;
}

export default useOctokit;
