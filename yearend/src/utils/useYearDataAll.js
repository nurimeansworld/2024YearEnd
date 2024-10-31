import { useState, useEffect } from 'react';
import { requestOctokit } from 'utils/octokit';

function useYearDataAll(username) {
  const [dataofAll, setDataofAll] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
    // 모든 데이터
    const fetchData = async () => {
      let starred = 0;

      const reqList = [
        {
          // 모든 커밋
          url: 'commits',
          key: 'commits',
          q: `committer-date:<=2024-12-31 is:public author:${username}`, // All
          // q: `committer-date:2024-01-01..2024-12-31 is:public author:${username}`, // 2024
        },
        {
          // 모든 이슈
          url: 'issues',
          key: 'issues',
          q: `type:issue created:<=2024-12-31 is:public author:${username}`, // All
          // q: `type:issue created:2024-01-01..2024-12-31 is:public author:${username}`, // 2024
        },
        {
          // 모든 pr
          url: 'issues',
          key: 'pr',
          q: `type:pr created:<=2024-12-31 is:public author:${username}`, // All
          // q: `type:pr created:2024-01-01..2024-12-31 is:public author:${username}`, // 2024
        },
        {
          // 모든 저장소
          url: 'repositories',
          key: 'repo',
          q: `created:<=2024-12-31 is:public user:${username}`, // All
          // q: `created:2024-01-01..2024-12-31 is:public user:${username}`, // 2024
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
          }
          // if (ele.key === 'repo') {
          //   starred += data.items.reduce((acc, item) => acc + item.stargazers_count,0);
          // }

          return { name: ele.key, counts: data.total_count };
        } catch (err) {
          console.error(err);
        }
      });
      const res = await Promise.all(promise);
      setDataofAll(res);

      setLoading(true);
    };

    fetchData();
  }, [username]);

  return { dataofAll, loading };
}

export default useYearDataAll;
