import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BtnSaveImg, BtnShare } from 'components';

import { YEAR, COLOR, BREAK_POINT } from 'utils/constants';

function Outro({ name, res }) {
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

      <Div>
        <BtnSaveImg name={name} res={res} />
        <BtnShare />
        <LinkHome to='/'>&#62;&#62; 다시하기</LinkHome>
      </Div>
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
const LinkHome = styled(Link)`
  padding: 0.5rem;
  border: 1px solid;
  @media (max-width: ${BREAK_POINT.tablet}px) {
    padding: 0.25rem;
  }
`;
const Div = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 5rem;

  button {
    font-size: 2rem;
    color: ${COLOR.text};
    text-align: center;
    border: 1px solid ${COLOR.text};
    padding: 1rem 2rem;
  }
  button:disabled {
    color: ${COLOR.inactive};
    border-color: ${COLOR.inactive};
  }

  @media (max-width: ${BREAK_POINT.tablet}px) {
    gap: 3rem;
    button {
      font-size: 1.5rem;
    }
  }
`;
export default Outro;
