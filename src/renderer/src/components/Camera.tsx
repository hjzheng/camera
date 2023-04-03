import { useEffect, useState ,useRef } from 'react'
import styled from 'styled-components'
import { Setting } from './Setting'
import { Screenshot } from './Screenshot'
import { StyleSetting } from './StyleSetting'
import { Website } from './Website'
// import { useDrag } from '../utils/drag'
// https://github.com/kapetan/electron-drag/blob/master/README.md
import drag from 'electron-drag'

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  position: absolute;
  border-radius: 50%;
  overflow: hidden;
  background: #000;
  -webkit-app-region: drag;

  video {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
`

export function Camera(): JSX.Element {
  const videoRef: React.MutableRefObject<HTMLVideoElement|null> = useRef(null)
  const wrapperRef: React.MutableRefObject<typeof Wrapper|null> = useRef(null)

  const [deviceId, setDeviceId] = useState('')
  const [over, setOver] = useState(false)
  const [isCycle, setIsCycle] = useState(true)

  useEffect(() => {
    // const drag = useDrag()
    // drag.run();

    const clear = drag('body')

    return () => {
      clear && clear()
    }
  }, [])

  useEffect(() => {

    (async () => {
      if (!deviceId) return

      const constraints = {
        audio: false,
        video: {deviceId},
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        let video = videoRef.current
        if (video) {
           video.srcObject = stream
           video.play()
        }
      } catch(error) {
        console.error(error);
      }
  
    })();
   
  }, [deviceId, videoRef])

  const toggle = (isCycle: boolean) => {
    if (isCycle) {
      wrapperRef.current.style.borderRadius = '50%'
    } else {
      wrapperRef.current.style.borderRadius = '5%'
    }
    setIsCycle(isCycle)
  }

  return <Wrapper 
    ref={wrapperRef}
    onMouseOver={() => setOver(true)} 
    onMouseOut={() => setOver(false)} >
    <video ref={videoRef}></video>
    { 
      over && 
      <>
        <Website />
        <Screenshot htmlEle={videoRef.current}/>
        <StyleSetting toggle={toggle} isCycle={isCycle}/>
        <Setting value={deviceId} onChange={setDeviceId}/>
      </> 
    }
  </Wrapper>
}