import styled from 'styled-components';

function Result() {
  const Section = styled.section`
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
  `;

  return (
    <Section>
      <h2 className='sr-only'>연말결산 결과</h2>
      <p class='userName'>
        username : '<span id='userName'>___</span>'
      </p>
      <div>
        GitHub와 함께 개발 여정을 시작한 <br />
        <span id='startDate'>'YYYY-mm-dd'</span> 로부터{' '}
        <span id='countDate'>'000'</span>일이 지났어요.
      </div>

      <div>
        그동안 '<span id='userName'>___</span>'님은
        <ul>
          <li>
            - <span>000</span>개의 커밋
          </li>
          <li>
            - <span>000</span>개의 이슈
          </li>
          <li>
            - <span>000</span>개의 PR
          </li>
          <li>
            - <span>000</span>개의 저장소를 생성하였어요.
          </li>
        </ul>
      </div>

      <div>
        2023년 올해에는
        <ul>
          <li>
            - <span>000</span>개의 커밋
          </li>
          <li>
            - <span>000</span>개의 이슈
          </li>
          <li>
            - <span>000</span>개의 PR
          </li>
          <li>
            - <span>000</span>개의 저장소를 생성하였어요.
          </li>
        </ul>
      </div>

      <div>
        올해 자주 사용한 언어 순위는 아래와 같아요.
        <ol>
          <li>aaaa</li>
          <li>bbbb</li>
          <li>cccc</li>
          <li>그 외, dddd, ffff</li>
        </ol>
      </div>

      <div>
        올해 제일 많은 커밋을 한 날은 <br />
        <span>'YYYY-mm-dd'</span>로 총 <span>'00'</span>개의 커밋을 하셨어요!
      </div>

      <div>
        올해 제일 많은 커밋을 한 저장소는 <br />
        <span>'YYYY-mm-dd'</span>로 총 <span>'00'</span>개의 커밋을 하셨어요!
      </div>

      <div>
        올해 제일 많은 스타를 받은 저장소는 <br />
        <span>'0000'</span>로 총 <span>'00'</span>개의 스타를 받으셨어요!
      </div>
    </Section>
  );
}

export default Result;