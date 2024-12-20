function BtnShare() {
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.origin).then(() => {
      alert('url이 복사되었습니다.');
    });
  };

  return (
    <>
      <button type='button' onClick={handleCopyUrl}>
        &#62;&#62; 링크 복사하기
      </button>
      {/* <ul>
        <li>- 링크 복사하기</li>
        <li>- Instagram</li>
        <li>- Facebook</li>
        <li>- KakaoTalk</li>
      </ul> */}
    </>
  );
}
export default BtnShare;
