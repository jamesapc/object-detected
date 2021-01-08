import axios from 'axios';
import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam';
import styled from 'styled-components';

const api = 'cdb29f355cb4059995e054208cd7c06a332acfb83a0a29592e88c58f78a7e4f8a8c0c3cfd71391e67b466dc00b475424ac'

const CapturePic = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null)

  const capture = useCallback(() => {
    const imgeSrc = webcamRef.current.getScreenshot({width: 1200, height: 1000});
    setImgSrc(imgeSrc)
  }, [webcamRef, setImgSrc])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    await axios.post(api, formData, {
      pic: imgSrc
    })
    .then(response => {
      alert('upload success')
      console.log(response);
    }).catch(err => {
      console.log(err, 'err message')
    })
  }

  return (
    <Warpper>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        forceScreenshotSourceSize={false}
      />
      <Button onClick={capture}>Capture</Button>
      <form onSubmit={handleSubmit}>
        {imgSrc && (
          <img
            alt={imgSrc}
          />
        )}
        <Button>Upload Pic</Button>
      </form>
    </Warpper>
  )
}

export default CapturePic

const Button = styled.button`
  width: 100px;
  height: 35px;
  border: none;
  border-radius: 5px;
  margin: 20px;
  color: white;
  background-color: blue;
`;

const Warpper = styled.div`
  padding: 20px;
  width: 1300px;
  text-align: center;
`;