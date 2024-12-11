import styled from 'styled-components';
import { COLOR, BREAK_POINT } from 'utils/constants';
import { Link } from 'react-router-dom';

function Share() {
  const handleShare = () => {};
  return (
    <>
      <Div>
        <button type='button' onClick={handleShare}>
          이미지 저장하기
        </button>
        <button type='button' onClick={handleShare}>
          내 결과 공유하기
        </button>
        <HomeLink to='/'>다시하기</HomeLink>
      </Div>

      {/* <ul>
        <li>- 이미지 저장하기</li>
        <li>- 링크 복사하기</li>
        <li>- Instagram</li>
        <li>- Facebook</li>
        <li>- KakaoTalk</li>
      </ul> */}
    </>
  );
}

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
const HomeLink = styled(Link)`
  /* padding: 1rem 2rem; */
  border: 1px solid;
`;
export default Share;
