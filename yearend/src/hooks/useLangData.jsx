import { useEffect, useState } from 'react';
import { requestOctokit } from 'utils/octokit';
import { sortCounts } from 'utils/functions';
import { useUserData } from 'hooks';

function useLangData(username) {
  const [loading, setLoading] = useState(false);
  const [data, setLangData] = useState();

  const { data: repoList, loading: loadingrepoList } = useUserData(
    username,
    'repos'
  );

  useEffect(() => {
    const getRepoLang = async () => {
      setLoading(false);

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
        if (Object.keys(obj).length === 0) return acc; // 1. 길이가 없는 항목 제거
        // 2. 중복 값 모두 합산
        for (let key in obj) {
          acc[key] = (acc[key] || 0) + obj[key];
        }
        return acc;
      }, {});

      // 3. 내림차순 정렬
      const sortedLang = sortCounts(totalLang);

      setLangData(sortedLang);
      setLoading(true);
    };

    loadingrepoList && getRepoLang();
  }, [repoList]);

  return { data, loading };
}

export default useLangData;
