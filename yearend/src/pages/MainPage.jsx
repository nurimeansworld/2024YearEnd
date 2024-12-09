import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { YEAR, COLOR, BREAK_POINT } from 'utils/constants';
import { validateID, checkExistID } from 'utils/functions';
import { Title } from 'components/layout';

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
      <Title />
      {/* 1 - intro */}
      <Intro>
        <h2 className='sr-only'>연말결산 소개</h2>
        <p id='writing1'>
          {' '}
          GitHub로 돌아보는 나의
          <br />✨{YEAR}년✨ 개발 기록
        </p>
        {/* 1 - input text */}
        <p>
          GitHub username(ID)를 입력하세요. <br />
          (최소 4자 이상의 영문 or 숫자 조합)
        </p>
        <Form>
          <input
            type='text'
            name='username'
            className='inputID'
            maxLength='40'
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            onKeyDown={handleEnter}
          />
          <button type='button' onClick={handleEnter}>
            ENTER
          </button>
        </Form>
      </Intro>
      {/* 2 - result */}
    </>
  );
}
const Intro = styled.section`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  p ~ p {
    margin-top: 5rem;
  }

  /* p::before {
    position: absolute;
    left: -3rem;
    content: '> ';
    width: 1rem;
    height: 1rem;
  }
  p {
    position: relative;
    left: 3rem;
  } */
  @media (max-width: ${BREAK_POINT.tablet}px) {
    .inputID {
      font-size: 1.5rem;
      letter-spacing: 0.2rem;
    }
    p ~ p {
      margin-top: 3rem;
    }
    /* p {
      left: 2rem;
    }
    p::before {
      left: -2rem;
    } */
  }
  /* 
  p[id*='writing'] {
    overflow: hidden;
    border-right: 1rem solid white;
    white-space: nowrap;
    letter-spacing: 0.15em;
    animation: blink-caret 0.5s step-end infinite;
  }

  p#writing1 {
    animation: typing 5s steps(50), blink-caret 0.5s step-end infinite 0s;
  }
  p#writing2 {
    visibility: hidden;
    animation: typing 5s steps(50) 5s, blink-caret 0.5s step-end infinite;
    animation-delay: 5s;
  } */

  /* @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 70%;
    }
  }
  @keyframes blink-caret {
    50% {
      border-color: white;
    }
  } */
`;

const Form = styled.section`
  .inputID {
    color: ${COLOR.text};
    margin-top: 2rem;
    text-align: center;
    background-color: ${COLOR.bg};
    border-width: 0 0 2px;
    border-bottom: 2px dashed #fff;
    font-family: 'NeoDunggeunmo Pro', 'Spoqa Han Sans Neo';
    font-size: 2rem;
    letter-spacing: 0.4rem;
  }
  input:focus {
    color: inherit;
  }
  button {
    font-size: 2rem;
    color: ${COLOR.text};
    text-align: center;
    display: block;
    margin: 5rem auto 0 auto;
    border: 1px solid ${COLOR.text};
    padding: 1rem 3rem;
  }
`;

export default MainPage;
