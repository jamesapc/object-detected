// import axios from 'axios';
import React, { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam';
import styled from 'styled-components';
const nvision = require("@nipacloud/nvision/dist/browser/nvision.js");

const api = 'cdb29f355cb4059995e054208f8cc73c327e9bbc3a0c290e7d88c58022f3e4f8a6c491cf8411c1b1291068c25c15042aac'

const CapturePic = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null)
  const [getData, setgetData] = useState('');

  const capture = useCallback(() => {
    const imgeSrc = webcamRef.current.getScreenshot({width: 1200, height: 1000});
    setImgSrc(imgeSrc)
  }, [webcamRef, setImgSrc])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const str = imgSrc.indexOf(',')
    const convert = imgSrc.slice(str+1)
    const objectDetectionService = nvision.objectDetection({
      apiKey: api
    });
    objectDetectionService.predict({
      rawData: convert
    }).then((result) => { 
      const toStr = JSON.stringify(result)
      setgetData(toStr)
      console.log(result);
    });
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
            src={imgSrc}
          />
        )}
        <Button>Send To API</Button>
        <p>{getData}</p>
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