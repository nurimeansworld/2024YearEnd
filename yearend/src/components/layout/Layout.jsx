import styled from 'styled-components';

import { Header, Footer } from './';
import { COLOR, BREAK_POINT } from 'utils/constants';

function Layout({ children }) {
  return (
    <>
      {/* <Header /> */}
      <main>
        <Wrapper>{children}</Wrapper>
      </main>
      {/* <Footer /> */}
    </>
  );
}

const Wrapper = styled.section`
  /* width: 76.8rem; */
  width: 65rem;
  max-width: calc(100vw - 4rem);
  margin: 5rem auto;

  font-size: 2rem;
  letter-spacing: 0.4rem;
  line-height: 3rem;

  display: flex;
  flex-direction: column;
  align-items: center;

  section ~ section {
    margin-top: 5rem;
  }

  @media (max-width: ${BREAK_POINT.tablet}px) {
    width: 30rem;
    font-size: 1.5rem;
    letter-spacing: 0.2rem;
  }
`;

export default Layout;
