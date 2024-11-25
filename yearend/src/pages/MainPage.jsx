import styled from 'styled-components';
import { useState, useEffect } from 'react';

import { COLOR, YEAR } from 'utils/constants';
import { Outro, Result } from 'components';
import { Header, Footer } from 'components/layout';
import { useCommitData, useLangData, useUserData, useYearData } from 'hooks';

function MainPage() {
  const testUserName = 'nurimeansworld';

  const [name, setName] = useState('nurimeansworld');

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      // var reg = /^[A-Za-z0-9]{4,39}$/;

      // return !reg.test(e.target.value)
      //   ? alert('올바른 형식으로 입력해주세요.')
      //   : setName(e.target.value);
      setName(e.target.value);

      console.log(e.target.value);

      // CHECK:: loading 모두 완료되기 전 까지 비활성화
    }
  };

  // name이 빈 값이었다가 setName으로 state update 되었을 때
  const { data: user, loading: loadingUser } = useUserData(name);
  const { data: dataofAll, loading: loadingAll } = useYearData(name);
  const { data: dataof2024, loading: loading2024 } = useYearData(name, '2024');
  const { data: langData, loading: loadingLang } = useLangData(name);
  const { data: commitData, loading: loadingCommit } = useCommitData(name);

  useEffect(() => {
    const loadingList = {
      loadingAll: loadingAll,
      loading2024: loading2024,
      loadingUser: loadingUser,
      loadingLang: loadingLang,
      loadingCommit: loadingCommit,
    };
    // if (name) {
    setLoading(
      loadingAll || loading2024 || loadingUser || loadingLang || loadingCommit
    );
    // }

    if (process.env.NODE_ENV !== 'production') {
      var consoleLoading = '';
      for (var e in loadingList) {
        consoleLoading += loadingList[e] == false ? `${e}, ` : '';
      }
      console.log('update 완료:', consoleLoading);
    }
  }, [name, loadingAll, loading2024, loadingUser, loadingLang, loadingCommit]);

  useEffect(() => {
    // if (!loading) {
    setData({
      user: user,
      dataofAll: dataofAll,
      dataof2024: dataof2024,
      mostof2024: {
        sortedDate: commitData?.date,
        sortedRepo: commitData?.repo,
        sortedLang: langData,
      },
    });
    // }
  }, [loading, name, user, dataofAll, dataof2024, commitData, langData]);

  return (
    <>
      {/* <Header /> */}

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
              GitHub 아이디(username)을 입력하세요 . . . <br />
              (최소 4자 이상의 영문 or 숫자 조합)
              <br />
              <input
                type='text'
                name='username'
                placeholder='영문 or 숫자 조합'
                maxLength='40'
                onKeyDown={handleEnter}
              />
            </p>
            {/* <span> alert('올바른 형식으로 입력해주세요.') </span> */}
            {name && (
              <p>
                입력하신 아이디(username)는 '<span id='userName'>{name}</span>'
                입니다.
              </p>
            )}
          </Form>
          {/* 2 - result */}
          {/* {data && (
            <>
              <Result loading={loading} {...data} />
              <Outro {...data} />
            </>
          )} */}
          {loading ? (
            <p> 안보여야함 </p>
          ) : data ? (
            <>
              <Result loading={loading} {...data} />
              <Outro {...data} />
            </>
          ) : (
            <p> no data . . . </p>
          )}
        </Wrapper>
      </main>

      {/* <Footer /> */}
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
  #userName {
    border-width: 0 0 1px;
    border-style: dashed;
  }
`;

export default MainPage;
