import styled from 'styled-components';

import { Share } from './';
import { YEAR } from 'utils/constants';

function Outro() {
  return (
    <Sec>
      <h2 className='sr-only'>연말결산 공유하기</h2>
      <p>기록으로 돌아본 {YEAR}년 올해, 어떠셨나요?</p>
      <p>새해 복 많이 받으시고 다가올 {YEAR + 1}년도 아자아자 힘내봐요.!💖 </p>

      <div className='sec-emoji'>
        &nbsp;&nbsp;&nbsp;&nbsp;( ^ _ ^) <br />
        &nbsp;_(_つ/ ￣ ￣/_ <br />
        &nbsp;&nbsp;&nbsp;\/ _ _ /
      </div>

      {/* 공유하기 */}
      <Share />
    </Sec>
  );
}
const Sec = styled.section`
  p,
  div {
    position: relative;
    left: 3rem;
  }
  p::before,
  div::before {
    position: absolute;
    left: -3rem;
    content: '> ';
    width: 1rem;
    height: 1rem;
  }

  .sec-emoji {
    margin: 5rem 0;
  }
`;
export default Outro;
