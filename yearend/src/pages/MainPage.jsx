import styled from 'styled-components';

import { Outro, Result } from 'components';
import { Header, Footer } from 'components/layout';
import { COLOR, YEAR } from 'utils/constants';

import { useState, useEffect } from 'react';
import { useUserData, useYearData } from 'hooks';
import { requestOctokit, paginateOctokit } from 'utils/octokit';
import { sortCounts } from 'utils/functions';
// import useLangData from 'hooks/useLangData';

function MainPage() {
  const testUserName = 'nurimeansworld';

  // main에서 세팅
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mostof2024, setMostof2024] = useState({
    sortedLang: [],
    sortedDate: [],
    sortedRepo: [],
    sortedStar: [],
  });

  const { data: user, loading: loadingUser } = useUserData(testUserName);
  const { data: repoList, loading: loadingrepoList } = useUserData(
    testUserName,
    'repos'
  );
  const { data: dataofAll, loading: loadingAll } = useYearData(testUserName);
  const { data: dataof2024, loading: loading2024 } = useYearData(
    testUserName,
    '2024'
  );

  // 2024 자주 사용한 언어 순위
  // const { langData, loadingLang } = useLangData(testUserName, repoList);
  const getRepoLang = async (username) => {
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
    const sortedLang = sortCounts(totalLang).slice(0, 5);

    setMostof2024((prevState) => {
      return { ...prevState, sortedLang: sortedLang };
    });
  };

  // 2024 많이 커밋한 날짜, 저장소
  const getCommits2024 = async (username) => {
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

    setMostof2024((prevState) => {
      return {
        ...prevState,
        sortedDate: sortedDate[0],
        sortedRepo: sortedRepo[0],
      };
    });
  };

  useEffect(() => {
    repoList?.length > 0 && getRepoLang(testUserName);
    getCommits2024(testUserName); // 2024 많이 커밋한 날짜, 저장소
  }, [repoList]);

  useEffect(() => {
    // TODO:: mostof2024 값까지 업데이트 후 loading 업데이트 필요
    if (loadingAll && loading2024 && loadingUser && loadingrepoList)
      setLoading(true);
  }, [loadingAll, loading2024, loadingUser, loadingrepoList]);

  useEffect(() => {
    setData({
      user: user,
      dataofAll: dataofAll,
      dataof2024: dataof2024,
      mostof2024: mostof2024,
    });
  }, [user, dataof2024, dataofAll, mostof2024]);

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
          {/* <Result loading={loadingAll} data={data} /> */}
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
