import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { YEAR } from 'utils/constants';
import { validateID, checkExistID } from 'utils/functions';
// import { Title } from 'components/layout';

function MainPage() {
  const navigate = useNavigate();
  const [userID, setUserID] = useState('');

  const handleEnter = async (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      // 1. 유효성 검사
      const errorMessage = validateID(userID);
      if (errorMessage) {
        alert(errorMessage);
        return;
      }

      // 2. username 실존 검사
      const checkUser = await checkExistID(userID);
      return !checkUser ? alert('유효한 ID가 아닙니다.') : handleNavigate();
    }
  };
  const handleNavigate = () => {
    // CHECK:: 효과음 넣기
    setTimeout(() => {
      navigate('/result', { state: userID });
    }, 1000);
  };

  return (
    <>
      {/* <Title /> */}
      {/* 1 - intro */}
      <Intro>
        <h2 className='sr-only'>연말결산 소개</h2>
        <p id='writing1'> GitHub로 돌아보는 나의 {YEAR}년 개발 기록</p>
        <p id='writing2'>
          계속하려면 아무 키나 누르십시오. . .
          <br />
          (Press any key to continue. . .)
        </p>
      </Intro>
      {/* 1 - input text */}
      <Form>
        <p>
          GitHub ID(username)를 입력하세요 . . . <br />
          (최소 4자 이상의 영문 or 숫자 조합)
          <br />
          <input
            type='text'
            name='username'
            placeholder='영문 or 숫자 조합'
            maxLength='40'
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            onKeyDown={handleEnter}
          />
        </p>
        <button type='button' onClick={handleEnter}>
          ENTER
        </button>
      </Form>
      {/* 2 - result */}
    </>
  );
}
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
  button {
    color: inherit;
    font-size: 2rem;
    text-align: center;
    display: block;
    margin: 0 auto;
    border: 1px solid;
    padding: 1rem 3rem;
  }
`;

export default MainPage;
