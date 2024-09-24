import { useState, useEffect } from 'react';
import { octokit } from 'utils/octokit';

function useOctokit(username, repo, url) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);
  const [loading, isLoading] = useState(false);

  const getUserData = async () => {
    isLoading(false);
    try {
      const res = await octokit.request('GET {url}', {
        account_id: username,
        repo: repo,
        url: url,
        // params: params,
        // per_page: 100,

        headers: { 'X-GitHub-Api-Version': '2022-11-28' },
      });

      setData(res.data);
      const counts = getAllCounts(res);

      setData({ ...res.data, counts: counts });
    } catch (err) {
      // console.error(err);
      setErr(err);
    }
    isLoading(true);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return data;
}

const getAllCounts = (res) => {
  // const headerString = res ? res.headers.link : '';
  const headerString = res.headers.link;
  const numOfPage = headerString.split(',')[1];
  const counts = res.headers.link
    ? numOfPage
        .match(/&page=[0-9]*[>&]/)
        .join('')
        .replace(/[^0-9]/g, '')
    : 0;

  return counts;
};

export default useOctokit;
