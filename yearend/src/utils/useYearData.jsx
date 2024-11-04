import { useState, useEffect } from 'react';
import { requestOctokit } from 'utils/octokit';
import { YEAR } from './constants';

function useYearData(username, year) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // const [dataofAll, setDataofAll] = useState([]);
  // const [dataof2024, setDataof2024] = useState([]);

  const query =
    year === 'all' ? `<=${YEAR}-12-31` : `${year}-01-01..${year}-12-31`;

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

      setData(res);
      setLoading(true);
    };

    fetchData();
  }, [username]);

  return { data, loading };
}

export default useYearData;