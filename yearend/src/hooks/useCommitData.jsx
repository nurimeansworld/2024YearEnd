import { useEffect, useState } from 'react';
import { paginateOctokit } from 'utils/octokit';
import { sortCounts } from 'utils/functions';

function useCommitData(username) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const getCommits2024 = async () => {
      setLoading(false);

      const dateCounts = {},
        repoCounts = {};

      // 1. 2024년 커밋 데이터 가져오기
      const commits = await paginateOctokit(username, `/search/commits`);

      // 2. 커밋 날짜별, 저장소별 집계
      commits.forEach((commit) => {
        // 1) dateCounts 저장
        const dateKey = commit.commit.author.date.slice(0, 10);
        dateCounts[dateKey] = (dateCounts[dateKey] || 0) + 1;

        // 2) repoCounts 저장
        const commitRepo = commit.repository.name;
        repoCounts[commitRepo] = (repoCounts[commitRepo] || 0) + 1;
      });

      // 3. 내림차순 정렬
      const sortedDate = sortCounts(dateCounts);
      const sortedRepo = sortCounts(repoCounts);

      setData({ date: sortedDate[0], repo: sortedRepo[0] });
      setLoading(true);
    };

    getCommits2024();
  }, []);

  return { data, loading };
}

export default useCommitData;
