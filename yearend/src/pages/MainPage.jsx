import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { YEAR } from 'utils/constants';

function MainPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      // var reg = /^[A-Za-z0-9]{4,39}$/;

      // return !reg.test(e.target.value)
      //   ? alert('올바른 형식으로 입력해주세요.')
      //   : setName(e.target.value);
      setName(e.target.value);

      // CHECK:: loading 모두 완료되기 전 까지 비활성화
    }
  };

  const handleTimeout = () => {
    setTimeout(() => {
      navigate('/result', { state: name });
    }, 5000);
  };

  useEffect(() => {
    name && handleTimeout();
  }, [name]);

  return (
    <>
      {/* 1 - intro */}
      <Intro>
        <h2 className='sr-only'>연말결산 소개</h2>
        <p>GitHub로 돌아보는 나의 {YEAR}년 개발 기록</p>
        <p>
          계속하려면 아무 키나 누르십시오. . .
          <br />
          (Press any key to continue. . .)
        </p>
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
          <>
            <p>
              입력하신 아이디(username)는 '<span id='userName'>{name}</span>'
              입니다.
            </p>
            <p>5초 뒤 이동합니다 . . .</p>
          </>
        )}
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
`;

export default MainPage;
