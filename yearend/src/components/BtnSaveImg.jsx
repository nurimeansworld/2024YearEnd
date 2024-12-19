import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import domtoimage from 'dom-to-image';

import { Title } from './layout';
import { COLOR } from 'utils/constants';

function BtnSaveImg({ name, res }) {
  const imgRef = useRef(null);
  const imgNode = imgRef.current;

  const saveAsImage = () => {
    const scale = 3,
      imgW = 540,
      imgH = 1050;

    const defaultOptions = {
      width: imgW * scale,
      height: imgH * scale,
      bgcolor: `${COLOR.bg}`,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${imgW}px`,
        height: `${imgH}px`,
        fontSmooth: 'always',
      },
    };

    const originalStyles = {
      position: imgNode.style.position,
      top: imgNode.style.top,
      left: imgNode.style.left,
      opacity: imgNode.style.opacity,
      pointerEvents: imgNode.style.pointerEvents,
    };

    // 캡처용 스타일 설정
    Object.assign(imgNode.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      opacity: '1',
      pointerEvents: 'auto',
      width: `${imgW}px`,
      height: `${imgH}px`,
    });

    domtoimage
      .toPng(imgNode, defaultOptions)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = '2024GithubYearEnd.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        // 스타일 복원
        Object.assign(imgNode.style, originalStyles);
      });
  };

  useEffect(() => {
    if (res && imgRef.current) {
      const hiddenDiv = imgRef.current.querySelector('.resultDiv');
      if (hiddenDiv) {
        hiddenDiv.innerHTML = res.outerHTML;
      }
    }
  }, [res]);

  return (
    <>
      <ImgDiv className='imgDiv' ref={imgRef}>
        <Title name={name} />
        <div className='resultDiv' />
      </ImgDiv>

      <button type='button' onClick={saveAsImage}>
        이미지 저장하기
      </button>
    </>
  );
}

const ImgDiv = styled.div`
  // 보이지 않게 스타일링
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: -9999px;
  left: -9999px;

  width: 50rem;
  height: 100rem;
  padding: 2rem;
  font-size: 1.8rem;
  letter-spacing: 0.2rem;
  div {
    /* margin-top: 2rem; */
    width: 50rem;
    margin: 2rem auto 0 auto;
  }
  div ~ div {
    margin-top: 2rem;
  }
`;

export default BtnSaveImg;
