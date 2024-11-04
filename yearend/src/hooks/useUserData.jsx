import { useState, useEffect } from 'react';
import { requestOctokit } from 'utils/octokit';

function useUserData(username, type) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const url = type ? `/users/{account_id}/${type}` : '/users/{account_id}';

  useEffect(() => {
    const getUser = async () => {
      setLoading(false);

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
      setLoading(true);
    };

    getUser();
  }, [username]);

  return { data, loading };
}
export default useUserData;
