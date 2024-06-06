import styled from 'styled-components';

import { Header, Footer } from 'components/layout';
import { Outro, Result } from 'components';

import { COLOR } from 'utils/constants';

function MainPage() {
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

  return (
    <>
      <Header />

      <main>
        <Wrapper>
          {/* title */}
          <Title>
            <p>******************</p>
            <h2>
              2023
              <br />
              GitHub 연말결산
            </h2>
            <p>******************</p>
          </Title>

          {/* 1 - intro */}
          <Intro>
            <h2 className='sr-only'>연말결산 소개</h2>
            <div>
              <p>GitHub로 돌아보는 나의 2023년 개발 기록</p>
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
          <Result />

          {/* 2 - Outro */}
          <Outro />
        </Wrapper>
      </main>

      <Footer />
    </>
  );
}
export default MainPage;
