import styled from 'styled-components';

import { Header, Footer } from './';
import { COLOR } from 'utils/constants';

function Layout({ children }) {
  return (
    <>
      <Header />
      <main>
        <Wrapper>{children}</Wrapper>
      </main>
      <Footer />
    </>
  );
}

const Wrapper = styled.section`
  /* width: 76.8rem; */
  width: 65rem;
  margin: 0 auto;

  font-size: 2rem;
  letter-spacing: 0.4rem;
  line-height: 3rem;

  section ~ section {
    margin-top: 5rem;
  }

  input {
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    letter-spacing: inherit;
    line-height: inherit;
    background-color: ${COLOR.bg};
    border-width: 0 0 1px;
    border-style: dashed;
    border-color: ${COLOR.text};
  }
  input:focus {
    color: inherit;
  }
`;

export default Layout;
