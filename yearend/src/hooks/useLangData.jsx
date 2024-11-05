import { useEffect, useState } from 'react';
import { requestOctokit } from 'utils/octokit';
import { sortCounts } from 'utils/functions';

function useLangData(username, repoList) {
  const [loading, setLoading] = useState(false);
  const [langData, setLangData] = useState();

  console.log('useLangData');

  useEffect(() => {
    setLoading(false);

    const getRepoLang = async () => {
      const promise = repoList.map(async (ele) => {
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

    if (repoList?.length > 0) getRepoLang();
  }, []);

  return { langData, loading };
}
export default useLangData;
