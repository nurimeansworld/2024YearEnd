import { useState, useEffect } from 'react';
import { octokit } from 'utils/octokit';

function useOctokit(username, url, params) {
  const [user, setUser] = useState(null);

  const getUserData = async () => {
    try {
      const res = await octokit.request('GET /users/{account_id}', {
        account_id: username,
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
