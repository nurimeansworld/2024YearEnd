import { YEAR } from 'utils/constants';

import { useState, useEffect } from 'react';
import { requestOctokit } from 'utils/octokit';

function useYearData(username, year = 'all') {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const query =
    year === 'all' ? `<=${YEAR}-12-31` : `${year}-01-01..${year}-12-31`;

  useEffect(() => {
    if (!username) return;

    setLoading(true);

    // 모든 데이터
    const fetchData = async () => {
      let starred = 0;

      const reqList = [
        {
          // 모든 커밋
          url: 'commits',
          key: 'commits',
          q: `committer-date:${query} is:public author:${username}`,
        },
        {
          // 모든 이슈
          url: 'issues',
          key: 'issues',
          q: `type:issue created:${query} is:public author:${username}`,
        },
        {
          // 모든 pr
          url: 'issues',
          key: 'pr',
          q: `type:pr created:${query} is:public author:${username}`,
        },
        {
          // 모든 저장소
          url: 'repositories',
          key: 'repo',
          q: `created:${query} is:public user:${username}`,
        },
      ];

      const promise = reqList.map(async (ele) => {
        try {
          const data = await requestOctokit({
            name: username,
            url: `/search/${ele.url}`,
            params: {
              q: ele.q,
            },
          });

          // starred 카운트
          if (ele.key === 'repo') {
            data.items.map((e) => (starred += e.stargazers_count));
            // starred += data.items.reduce((acc, item) => acc + item.stargazers_count,0);
          }

          return { name: ele.key, counts: data.total_count };
        } catch (err) {
          console.error(err);
        }
      });
      const res = await Promise.all(promise);

      setData(res);
      setLoading(false);
    };

    fetchData();
  }, [username, query]);

  return { data, loading };
}

export default useYearData;
