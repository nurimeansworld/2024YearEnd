import { useState, useEffect } from 'react';
import { octokit } from 'utils/octokit';

function useOctokit(username, url) {
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    try {
      const res = await octokit.request('GET {url}', {
        // const res = await octokit.request('GET /users/{account_id}', {
        // const res = await octokit.request('GET /users/{account_id}/repos?type=all', {
        // const res = await octokit.request('GET /repos/{account_id}/{repo}/commits', {
        account_id: username,
        url: url,
        // params: params,
        // repo: 'nu-pedia',
        headers: { 'X-GitHub-Api-Version': '2022-11-28' },
      });
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, [username]);

  return user;
}

export default useOctokit;
