import styled from 'styled-components';

import { Outro, Result } from 'components';
import { Header, Footer } from 'components/layout';

// import useOctokit from 'utils/useOctokit';
import { octokit } from 'utils/octokit';

import { COLOR, YEAR } from 'utils/constants';
import { useState, useEffect } from 'react';

function MainPage() {
  // const testRepoName = 'strawberry_market';
  const testUserName = 'nurimeansworld';

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [user, setUser] = useState([]);
  const [repoList, setRepoList] = useState([]);
  const [userRepoCommits, setUserRepoCommits] = useState([]);
  const [userIssues, setUserIssues] = useState([]);
  const [userPRs, setUserPRs] = useState([]);

  const [dataof2024, setDataof2024] = useState([]);

  // const resRepo = {
  //   stars: 0,
  //   repoList: [],
  // };
  // const staredRepo = useOctokit(
  //   testUserName,
  //   testRepoName,
  //   '/repos/{account_id}/{repo}/stargazers?&per_page=1&page=1'
  //   // CHECK:: 여기서 created_at, 모든 repo 확인해서 정리 필요
  // );

  const getUser = async () => {
    try {
      const res = await octokit.request('GET {url}', {
        account_id: testUserName,
        url: '/users/{account_id}',
        headers: { 'X-GitHub-Api-Version': '2022-11-28' },
      });
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getUserRepo = async () => {
    try {
      const res = await octokit.request('GET {url}', {
        account_id: testUserName,
        url: '/users/{account_id}/repos',
        headers: { 'X-GitHub-Api-Version': '2022-11-28' },
      });
      const userRepo = res.data;

      setRepoList(userRepo.map((ele) => ele.name));
    } catch (err) {
      console.error(err);
    }
  };

  const getUserCommits = async () => {
    let sumCommitCounts = 0;
    const promise = repoList.map(async (ele) => {
      try {
        const data = await octokit.request('GET {url}', {
          account_id: testUserName,
          repo: ele,
          url: '/repos/{account_id}/{repo}/commits?per_page=1&page=1&author={account_id}',
          // url: '/repos/{account_id}/{repo}/commits?per_page=100&author={account_id}',

          headers: { 'X-GitHub-Api-Version': '2022-11-28' },
        });

        const counts = getAllCounts(data);

        return { name: ele, counts: counts };
      } catch (err) {
        console.error(err);
      }
    });

    const userCommitList = await Promise.all(promise);
    userCommitList.map((ele) => (sumCommitCounts += ele.counts));

    setUserRepoCommits(sumCommitCounts);
  };

  const getAllCounts = (res) => {
    const headerString = res.headers.link;
    // const numOfPage = headerString.split(',')[1];

    const counts =
      headerString !== undefined
        ? headerString
            .split(',')[1]
            .match(/&page=[0-9]*[>&]/)
            .join('')
            .replace(/[^0-9]/g, '')
        : 0;

    return Number(counts);
  };

  const getUserIssues = async () => {
    let sumIssuesCounts = 0;

    const promise = repoList.map(async (ele) => {
      try {
        const data = await octokit.request('GET {url}', {
          account_id: testUserName,
          repo: ele,
          url: '/repos/{account_id}/{repo}/issues?state=all&creator={account_id}&per_page=1&page=1',
          // url: '/issues?fliter=created&state=all&per_page=1&page=1',

          headers: { 'X-GitHub-Api-Version': '2022-11-28' },
        });

        const counts = getAllCounts(data);

        return { name: ele, counts: counts };
      } catch (err) {
        console.error(err);
      }
    });
    const userIssuesList = await Promise.all(promise);
    userIssuesList.map((ele) => (sumIssuesCounts += ele.counts));

    setUserIssues(sumIssuesCounts);
  };

  const getUserPRs = async () => {
    let sumPRsCounts = 0;

    const promise = repoList.map(async (ele) => {
      try {
        const data = await octokit.request('GET {url}', {
          account_id: testUserName,
          repo: ele,
          // CHECK:: 여기서 created_at 해서 올해로 정리 필요
          url: '/repos/{account_id}/{repo}/pulls?state=all&per_page=1&page=1',

          headers: { 'X-GitHub-Api-Version': '2022-11-28' },
        });

        const counts = getAllCounts(data);
        return { name: ele, counts: counts };
      } catch (err) {
        console.error(err);
      }
    });
    const userPRsList = await Promise.all(promise);
    userPRsList.map((ele) => (sumPRsCounts += ele.counts));

    setUserPRs(sumPRsCounts);
  };

  // 2024년 데이터 따로
  const getAll2024 = async (username) => {
    const reqList = [
      {
        // 2024 커밋
        url: 'commits',
        key: 'commits',
        q: `committer-date:2024-01-01..2024-12-31 is:public author:${username}`,
      },
      {
        // 2024 이슈
        url: 'issues',
        key: 'issues',
        q: `type:issue created:2024-01-01..2024-12-31 is:public author:${username}`,
      },
      {
        // 2024 pr
        url: 'issues',
        key: 'pr',
        q: `type:pr created:2024-01-01..2024-12-31 is:public author:${username}`,
      },
      {
        // 2024 저장소
        url: 'repositories',
        key: 'repositories',
        q: `created:2024-01-01..2024-12-31 is:public user:${username}`,
      },
    ];

    const promise = reqList.map(async (ele) => {
      try {
        const { data } = await octokit.request('GET {url}', {
          url: `/search/${ele.url}`,
          q: ele.q,
          per_page: 1,
          page: 1,

          headers: { 'X-GitHub-Api-Version': '2022-11-28' },
        });

        return { name: ele.key, counts: data.total_count };
      } catch (err) {
        console.error(err);
      }
    });
    const res = await Promise.all(promise);

    setDataof2024(res);
  };

  useEffect(() => {
    setLoading(false);

    // 2024
    getAll2024(testUserName);

    // getUserData();
    getUser();
    getUserRepo();
    getUserCommits();
    getUserIssues();
    getUserPRs();

    setLoading(true);
  }, []);

  useEffect(() => {
    setData({
      user: user,
      userRepoCommits: userRepoCommits,
      userIssues: userIssues,
      userPRs: userPRs,
      // staredRepo: staredRepo,
      dataof2024: dataof2024,
    });
  }, [user, userRepoCommits, userIssues, userPRs, dataof2024]);

  return (
    <>
      <Header />

      <main>
        <Wrapper>
          {/* title */}
          <Title>
            <p>******************</p>
            <h2>
              {YEAR}
              <br />
              GitHub 연말결산
            </h2>
            <p>******************</p>
          </Title>
          {/* 1 - intro */}
          <Intro>
            <h2 className='sr-only'>연말결산 소개</h2>
            <div>
              <p>GitHub로 돌아보는 나의 {YEAR}년 개발 기록</p>
              <p>
                계속하려면 아무 키나 누르십시오. . .
                <br />
                (Press any key to continue. . .)
              </p>
            </div>
          </Intro>
          {/* 1 - input text */}
          <Form>
            <p>
              GitHub 아이디(username)을 입력하세요 :
              <input type='text' name='username' />
            </p>
            <p>
              입력하신 아이디(username)는 '<span id='userName'>___</span>'
              입니다.
            </p>
          </Form>
          {/* 2 - result */}
          <Result loading={loading} {...data} />
          {/* <Result loading={loading} data={data} /> */}
          {/* 2 - Outro */}
          <Outro {...data} />
        </Wrapper>
      </main>

      <Footer />
    </>
  );
}

const Wrapper = styled.section`
  /* width: 76.8rem; */
  width: 65rem;
  margin: 0 auto;

  font-size: 2rem;
  letter-spacing: 0.4rem;
  line-height: 3rem;

  section ~ section {
    margin-top: 5rem;
  }

  input {
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    letter-spacing: inherit;
    line-height: inherit;
    background-color: ${COLOR.bg};
    border-width: 0 0 1px;
    border-style: dashed;
    border-color: ${COLOR.text};
  }
  input:focus {
    color: inherit;
  }
`;

const Title = styled.section`
  text-align: center;
  line-height: 5rem;
  letter-spacing: 1.5rem;
`;

const Intro = styled.section`
  p {
    position: relative;
    left: 3rem;
  }
  p::before {
    position: absolute;
    left: -3rem;
    content: '> ';
    width: 1rem;
    height: 1rem;
  }
  /* p {
      overflow: hidden;
      border-right: 1rem solid white;
      white-space: nowrap;
      margin: 0 auto;
      letter-spacing: 0.15em;
      animation: typing 5s steps(50), blink-caret 0.5s step-end infinite;
    }
    @keyframes typing {
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    }
    @keyframes blink-caret {
      from,
      to {
        border-color: transparent;
      }
      50% {
        border-color: white;
      }
    } */
`;

const Form = styled.section`
  p {
    position: relative;
    left: 3rem;
  }
  p::before {
    position: absolute;
    left: -3rem;
    content: '> ';
    width: 1rem;
    height: 1rem;
  }
`;

export default MainPage;
