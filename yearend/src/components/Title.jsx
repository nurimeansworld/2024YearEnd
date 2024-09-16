import styled from 'styled-components';

import { YEAR } from 'utils/constants';

function Intro() {
  return (
    {/* title */}
    <Title>
      
      <CenterSec>
        <p>******************</p>
        <h2>
          {YEAR}
          <br />
          GitHub 연말결산
        </h2>
        <p>******************</p>
      </CenterSec>
    </Title>
  );
}

const Title = styled.section`
  font-size: 3.6rem;
  text-align: center;
  letter-spacing: 0.7rem;

  h2 {
    margin: 3rem 0;
  }
`;

export default Title;
