import styled from 'styled-components';

function Footer() {
  return (
    <WrapFooter>
      <ul>
        <li>만든이 : nurimeansworld@gmail.com</li>
        <li>관련 문의사항은 해당 메일로 부탁드립니다.</li>
      </ul>
      <a
        href='https://www.flaticon.com/kr/free-icons/-'
        title='소설 속의 인물 아이콘'
        className='sr-only'
      >
        소설 속의 인물 아이콘 제작자: Freepik - Flaticon
      </a>
    </WrapFooter>
  );
}
const WrapFooter = styled.footer`
  text-align: center;
`;
export default Footer;
