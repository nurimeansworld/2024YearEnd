import styled from 'styled-components';

import { Share } from './';
import { YEAR } from 'utils/constants';

function Outro() {
  return (
    <Section>
      <h2 className='sr-only'>연말결산 공유하기</h2>
      <p>---</p>

      <div className='sec-emoji'>
        &nbsp;&nbsp;&nbsp;&nbsp;( ^ _ ^) 💭 <br />
        &nbsp;_(_つ/ ￣ ￣/_ <br />
        &nbsp;&nbsp;&nbsp;\/ _ _ /
      </div>

      <p>기록으로 돌아본 {YEAR}년 올해, 어떠셨나요?</p>
      <p>
        새해 복 많이 받으시고
        <br />
        다가올 {YEAR + 1}년도 행코즐코 되세요!
      </p>

      {/* 공유하기 */}
      <Share />
    </Section>
  );
}
const Section = styled.section`
  margin-top: 10rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  .sec-emoji {
    margin: 5rem 0;
  }
`;
export default Outro;
