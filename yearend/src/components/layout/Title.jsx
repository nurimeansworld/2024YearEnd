import styled from 'styled-components';
import { YEAR, BREAK_POINT } from 'utils/constants';

function Title() {
  return (
    <>
      {/* title */}
      <TitleSec>
        <p>******************</p>
        <h2>
          {YEAR}
          <br />
          GitHub 연말결산
        </h2>
        <p>******************</p>
      </TitleSec>
    </>
  );
}
const TitleSec = styled.section`
  width: 100%;
  text-align: center;
  line-height: 5rem;
  letter-spacing: 1.5rem;

  @media (max-width: ${BREAK_POINT.tablet}px) {
    font-size: 1.5rem;
    letter-spacing: 1rem;
  }
`;

export default Title;
