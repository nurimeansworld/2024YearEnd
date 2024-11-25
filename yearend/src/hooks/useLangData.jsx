import { useEffect, useState } from 'react';
import { requestOctokit } from 'utils/octokit';
import { sortCounts } from 'utils/functions';
import { useUserData } from 'hooks';

function useLangData(username) {
  const [loading, setLoading] = useState(true);
  const [data, setLangData] = useState();
  const { data: repoList, loading: loadingrepoList } = useUserData(
    username,
    'repos'
  );

  useEffect(() => {
    const getRepoLang = async () => {
      if (repoList.length === undefined) return;

      setLoading(true);
      const promise = repoList?.map(async (ele) => {
        try {
          const data = await requestOctokit({
            name: username,
            url: '/repos/{account_id}/{repo}/languages',
            params: { repo: ele },
          });

          return data;
        } catch (err) {
          console.error(err);
        }
      });
      const res = await Promise.all(promise);

      const totalLang = res.reduce((acc, obj) => {
        // 1. 길이가 없는 항목 제거
        if (Object.keys(obj).length === 0) return acc;
        // 2. 중복 값 모두 합산
        for (let key in obj) {
          acc[key] = (acc[key] || 0) + obj[key];
        }
        return acc;
      }, {});

      // 3. 내림차순 정렬
      const sortedLang = sortCounts(totalLang);

      setLangData(sortedLang);
      setLoading(false);
    };

    getRepoLang();
  }, [loadingrepoList]);

  return { data, loading };
}

export default useLangData;
