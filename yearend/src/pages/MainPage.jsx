import styled from 'styled-components';

import { Outro, Result } from 'components';
import { Header, Footer } from 'components/layout';

import useOctokit from 'utils/useOctokit';
import { COLOR, YEAR } from 'utils/constants';

function MainPage() {
  const testRepoName = 'strawberry_market';

  const user = useOctokit(
    'nurimeansworld',
    testRepoName,
    '/users/{account_id}'
  );
  const userRepo = useOctokit(
    'nurimeansworld',
    testRepoName,
    '/users/{account_id}/repos'
  );

  const userRepoCommits = useOctokit(
    'nurimeansworld',
    testRepoName,
    '/repos/{account_id}/{repo}/commits?per_page=1&page=1&committer={account_id}'
  );

  // const userActivity = useOctokit(
  //   'nurimeansworld',
  //   '/repos/{account_id}/standup_log/stats/commit_activity'
  // );

  const userIssues = useOctokit(
    'nurimeansworld',
    testRepoName,
    '/issues?fliter=created&state=all&per_page=1&page=1'
  );
  const userPRs = useOctokit(
    'nurimeansworld',
    testRepoName,
    '/repos/{account_id}/{repo}/pulls?state=all&per_page=1&page=1'
    // CHECK:: 여기서 created_at 해서 올해로 정리 필요
  );
  const staredRepo = useOctokit(
    'nurimeansworld',
    testRepoName,
    '/repos/{account_id}/{repo}/stargazers?&per_page=1&page=1'
    // CHECK:: 여기서 created_at, 모든 repo 확인해서 정리 필요
  );

  const data = {
    user: user,
    userRepo: userRepo,
    userRepoCommits: userRepoCommits,
    userIssues: userIssues,
    userPRs: userPRs,
    staredRepo: staredRepo,
  };

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
          <Result {...data} />

          {/* 2 - Outro */}
          <Outro user={user} />
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
