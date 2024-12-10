import styled from 'styled-components';
import { YEAR, BREAK_POINT } from 'utils/constants';
import dragon from '../../assets/dragon_w.png';

function Title() {
  return (
    <>
      {/* title */}
      <TitleSec>
        <div>
          <img src={dragon} alt='2024 상징 용 이미지' />
          <img src={dragon} alt='2024 상징 용 이미지' />
          <img src={dragon} alt='2024 상징 용 이미지' />
        </div>
        <h2>
          {YEAR}
          <br />
          GitHub 연말결산
        </h2>
        <p>---</p>
      </TitleSec>
    </>
  );
}
const TitleSec = styled.section`
  width: 100%;
  text-align: center;
  line-height: 5rem;
  letter-spacing: 1rem;

  img {
    width: 3rem;
    margin: 0 0.5rem;
  }

  /* @media (max-width: ${BREAK_POINT.tablet}px) {
    font-size: 1.5rem;
  } */
`;

export default Title;
