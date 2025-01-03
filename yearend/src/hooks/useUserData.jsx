import { useState, useEffect } from 'react';
import { requestOctokit } from 'utils/octokit';

function useUserData(username, type) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const url = type ? `/users/{account_id}/${type}` : '/users/{account_id}';

  useEffect(() => {
    if (!username) return;
    // if (!username) {
    //   setLoading(false); // param 없으면 로딩 종료
    //   return;
    // }

    const getUser = async () => {
      setLoading(true);

      try {
        const data = await requestOctokit({
          name: username,
          url: url,
        });

        const res = type === 'repos' ? data.map((ele) => ele.name) : data;

        setData(res);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    getUser();
  }, [username, type, url]);

  return { data, loading };
}
export default useUserData;
