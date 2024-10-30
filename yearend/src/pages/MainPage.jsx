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
  const [staredRepo, setStaredRepo] = useState([]);

  const [dataofAll, setDataofAll] = useState([]);
  const [dataof2024, setDataof2024] = useState([]);
  const [mostof2024, setMostof2024] = useState({
    sotredLang: [],
    sortedDate: [],
    sortedRepo: [],
  });

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

  const getUser = async (username) => {
    try {
      const { data } = await octokit.request('GET {url}', {
        account_id: username,
        url: '/users/{account_id}',
        headers: { 'X-GitHub-Api-Version': '2022-11-28' },
      });
      setUser(data);
    } catch (err) {
      console.error(err);
    }
  };
  const getUserRepo = async (username) => {
    try {
      const { data } = await octokit.request('GET {url}', {
        account_id: username,
        url: '/users/{account_id}/repos',
        headers: { 'X-GitHub-Api-Version': '2022-11-28' },
      });
      // console.log('data', data);

      setRepoList(data.map((ele) => ele.name));
    } catch (err) {
      console.error(err);
    }
  };

  // 모든 데이터
  const getAllYear = async (username) => {
    const reqList = [
      {
        // 모든 커밋
        url: 'commits',
        key: 'commits',
        q: `committer-date:<=2024-12-31 is:public author:${username}`,
      },
      {
        // 모든 이슈
        url: 'issues',
        key: 'issues',
        q: `type:issue created:<=2024-12-31 is:public author:${username}`,
      },
      {
        // 모든 pr
        url: 'issues',
        key: 'pr',
        q: `type:pr created:<=2024-12-31 is:public author:${username}`,
      },
      {
        // 모든 저장소
        url: 'repositories',
        key: 'repositories',
        q: `created:<=2024-12-31 is:public user:${username}`,
      },
    ];

    const promise = reqList.map(async (ele) => {
      try {
        const { data } = await octokit.request('GET {url}', {
          url: `/search/${ele.url}`,
          q: ele.q,
          // per_page: 1,
          // page: 1,

          headers: { 'X-GitHub-Api-Version': '2022-11-28' },
        });
        return { name: ele.key, counts: data.total_count };
      } catch (err) {
        console.error(err);
      }
    });
    const res = await Promise.all(promise);

    setDataofAll(res);
  };

  // 2024년 데이터 따로
  const getAll2024 = async (username) => {
    const reqList = [
      {
        // 2024 커밋
        url: 'commits',
        key: 'commits',
        // q: `committer-date:2024-01-01..2024-12-31 is:public author:${username}`,
        q: `committer-date:2024-01-01..2024-12-31 author:${username}`,
      },
      {
        // 2024 이슈
        url: 'issues',
        key: 'issues',
        // q: `type:issue created:2024-01-01..2024-12-31 is:public author:${username}`,
        q: `type:issue created:2024-01-01..2024-12-31 author:${username}`,
      },
      {
        // 2024 pr
        url: 'issues',
        key: 'pr',
        // q: `type:pr created:2024-01-01..2024-12-31 is:public author:${username}`,
        q: `type:pr created:2024-01-01..2024-12-31 author:${username}`,
      },
      {
        // 2024 저장소
        url: 'repositories',
        key: 'repositories',
        // q: `created:2024-01-01..2024-12-31 is:public user:${username}`,
        q: `created:2024-01-01..2024-12-31 user:${username}`,
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

  // 올해 자주 사용한 언어 순위
  const getRepoLang = async (username) => {
    const promise = repoList.map(async (ele) => {
      try {
        const { data } = await octokit.request('GET {url}', {
          account_id: username,
          repo: ele,
          url: '/repos/{account_id}/{repo}/languages',

          headers: { 'X-GitHub-Api-Version': '2022-11-28' },
        });
        return data;
      } catch (err) {
        console.error(err);
      }
    });
    const res = await Promise.all(promise);

    // 1. 길이가 없는 항목 제거
    const filteredRes = res.filter((e) => Object.keys(e).length);
    const totalLang = {};
    const sotredLang = [];

    // 2. 중복 값 모두 합산
    for (let i = 0; i < filteredRes.length; i++) {
      const obj = filteredRes[i];
      for (let key in obj) {
        totalLang[key] = (totalLang[key] || 0) + obj[key];
      }
    }

    // 3. 내림차순 정렬
    for (let key in totalLang) {
      sotredLang.push({ name: key, counts: totalLang[key] });
    }
    sotredLang.sort((a, b) => b.counts - a.counts);

    setMostof2024((prevState) => {
      return { ...prevState, sotredLang: sotredLang };
    });
  };

  // 2024년 데이터 따로
  const getCommits2024 = async (username) => {
    const dateCounts = {};
    const repoCounts = {};
    const sortedDate = [];
    const sortedRepo = [];

    try {
      // 1. 2024년 커밋 데이터 가져오기
      // const commits = await octokit.paginate(octokit.rest.repos.listForUser, {
      const commits = await octokit.paginate('GET {url}', {
        url: `/search/commits`,
        q: `committer-date:2024-01-01..2024-12-31 author:${username}`,
        per_page: 100,

        headers: { 'X-GitHub-Api-Version': '2022-11-28' },
      });

      // 커밋 날짜별, 저장소별 집계
      commits.forEach((commit) => {
        // 1. dateCounts 저장
        const commitDate = new Date(commit.commit.author.date);
        // const commitDate = new Date(commit.commit.committer.date);

        const dateKey = commitDate.toISOString().split('T')[0];
        dateCounts[dateKey] = (dateCounts[dateKey] || 0) + 1;

        // 2. repoCounts 저장
        const commitRepo = commit.repository.name;
        repoCounts[commitRepo] = (repoCounts[commitRepo] || 0) + 1;
      });

      // 3. 내림차순 정렬
      for (let key in dateCounts) {
        sortedDate.push({ name: key, counts: dateCounts[key] });
      }
      sortedDate.sort((a, b) => b.counts - a.counts);

      for (let key in repoCounts) {
        sortedRepo.push({ name: key, counts: repoCounts[key] });
      }
      sortedRepo.sort((a, b) => b.counts - a.counts);
    } catch (err) {
      console.error(err);
    }

    setMostof2024((prevState) => {
      return {
        ...prevState,
        sortedDate: sortedDate[0],
        sortedRepo: sortedRepo[0],
      };
    });
  };

  useEffect(() => {
    setLoading(false);

    // All
    getAllYear(testUserName);
    // 2024
    getAll2024(testUserName);
    // 올해 자주 사용한 언어 순위
    getRepoLang(testUserName);
    // 올해 많이 커밋한 날짜, 저장소
    getCommits2024(testUserName);

    getUser(testUserName);
    getUserRepo(testUserName);

    // getUserCommits();
    // getUserIssues();
    // getUserPRs();

    setLoading(true);
  }, []);

  useEffect(() => {
    setData({
      user: user,
      userRepoCommits: userRepoCommits,
      userIssues: userIssues,
      userPRs: userPRs,
      // staredRepo: staredRepo,
      dataofAll: dataofAll,
      dataof2024: dataof2024,
      mostof2024: mostof2024,
    });
  }, [
    user,
    userRepoCommits,
    userIssues,
    userPRs,
    dataof2024,
    dataofAll,
    mostof2024,
  ]);

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
