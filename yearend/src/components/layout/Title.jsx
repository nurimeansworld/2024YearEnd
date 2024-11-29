import styled from 'styled-components';
import { YEAR } from 'utils/constants';

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
  text-align: center;
  line-height: 5rem;
  letter-spacing: 1.5rem;
`;

export default Title;
