import styled from 'styled-components';
import { useRef } from 'react';

import { Outro } from 'components';
import { COLOR, YEAR, BREAK_POINT } from 'utils/constants';

function Result({
  loading,
  user,
  dataofAll = [{}],
  dataof2024 = [{}],
  mostof2024 = [{}],
}) {
  const name = user?.login;
  const startDate = user?.created_at.slice(0, 10);
  const countDate = Math.round(
    (new Date() - new Date(user?.created_at)) / (1000 * 60 * 60 * 24) + 1
  );
  const resAll = [];
  dataofAll.forEach((e) => {
    resAll[e.name] = e.counts;
  });
  const res2024 = [];
  dataof2024.forEach((e) => {
    res2024[e.name] = e.counts;
  });
  const { sortedDate, sortedLang, sortedRepo } = mostof2024;
  const countedLang = sortedLang.slice(0, 6);

  const resRef = useRef();
  const res = resRef.current;

  return loading ? (
    <p>loading . . .</p>
  ) : (
    <>
      <Section ref={resRef}>
        <h2 className='sr-only'>연말결산 결과</h2>
        <div>
          💌 GitHub와 함께 개발 여정을 시작한 <br />
          <span>'{startDate}'</span> 로부터 <span>'{countDate}'</span>일이
          지났어요.
        </div>

        <div>
          <span>✨ {name}</span>님은 그동안
          <ul>
            <li>
              - <span>{resAll.commits}</span> 개의 커밋
            </li>
            <li>
              - <span>{resAll.issues}</span>개의 이슈
            </li>
            <li>
              - <span>{resAll.pr}</span>개의 PR
            </li>
            <li>
              - <span>{resAll.repo}</span>개의 저장소를 생성하였어요.
            </li>
          </ul>
        </div>

        <div>
          <span>💙 {YEAR}년</span> 올해에는
          <ul>
            <li>
              - <span>{res2024.commits}</span>개의 커밋
            </li>
            <li>
              - <span>{res2024.issues}</span>개의 이슈
            </li>
            <li>
              - <span>{res2024.pr}</span>개의 PR
            </li>
            <li>
              - <span>{res2024.repo}</span>개의 저장소를 생성하였어요.
            </li>
          </ul>
        </div>

        <div>
          <span>🏆 올해 자주 사용한 언어 순위</span>는 아래와 같아요.
          <ol>
            {countedLang.slice(0, 3).map((ele, ind) => (
              <li key={ind}>
                <span>{ele.name}</span>
              </li>
            ))}
            {countedLang.length > 3 && (
              <li>
                {'그 외 '}
                {countedLang.slice(3).map((ele, ind) => (
                  <span key={ind}>
                    {ele.name}
                    {ind < 2 ? ', ' : ''}
                  </span>
                ))}
                {' ...'}
              </li>
            )}
          </ol>
        </div>

        <div>
          <span>🌱 올해 제일 많은 커밋을 한 날</span>은 <br />
          <span>{sortedDate?.name}</span>로 총 <span>{sortedDate?.counts}</span>
          개의 커밋을 하셨어요!
        </div>

        <div>
          <span>🪴 올해 제일 많은 커밋을 한 저장소</span>는 <br />
          <span>{sortedRepo?.name}</span>로 총 <span>{sortedRepo?.counts}</span>
          개의 커밋을 하셨어요!
        </div>
      </Section>
      <Outro name={name} res={res} />
    </>
  );
}

const Section = styled.section`
  text-align: left;
  color: ${COLOR.inactive};
  div {
    position: relative;
    left: 3rem;
  }
  div::before {
    position: absolute;
    left: -3rem;
    content: '> ';
    width: 1rem;
    height: 1rem;
  }
  ol {
    margin-left: 4rem;
  }
  div ~ div {
    margin-top: 5rem;
  }

  .userName {
    text-align: center;
    margin-bottom: 4rem;
  }

  @media (max-width: ${BREAK_POINT.tablet}px) {
    /* width: 30rem; */
    div {
      position: relative;
      left: 2rem;
    }
    div::before {
      left: -2rem;
    }
    div ~ div {
      margin-top: 3rem;
    }
  }
`;

export default Result;
