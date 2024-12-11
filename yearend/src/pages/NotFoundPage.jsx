import styled from 'styled-components';

function NotFoundPage() {
  return (
    <>
      <Title>
        <p>******************</p>
        <h2>
          404 <br />
          NOT FOUND
        </h2>
        <p>******************</p>
        <a href='/'>메인으로 돌아가기</a>
      </Title>
    </>
  );
}
const Title = styled.section`
  padding: 10rem 0;
  text-align: center;
  line-height: 5rem;
  letter-spacing: 1.5rem;
  a {
    padding: 3rem 0;
    position: relative;
  }
  a::before {
    position: absolute;
    left: -3rem;
    content: '> ';
    width: 1rem;
    height: 1rem;
  }
`;
export default NotFoundPage;
