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

    domtoimage
      .toPng(imgNode, defaultOptions)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'section-image.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error(error);
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
