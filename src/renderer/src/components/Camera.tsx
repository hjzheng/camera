import { useEffect, useState, useRef, useMemo } from 'react'
import styled from 'styled-components'
import { Setting } from './Setting'
import { Screenshot } from './Screenshot'
import { StyleSetting } from './StyleSetting'
import { FilterSetting } from './FilterSetting'
import { Record } from './Record'
import { formatTime } from '../utils/tools'
// import { useDrag } from '../utils/drag'
// https://github.com/kapetan/electron-drag/blob/master/README.md
import drag from 'electron-drag'

const TimeWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 20px;
`

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
  const intervalRef: React.MutableRefObject<any | null> = useRef(null)

  const [deviceId, setDeviceId] = useState('')
  const [over, setOver] = useState(false)
  const [isCycle, setIsCycle] = useState(true)
  const [time, setTime] = useState(0)
  const [isRecording, setIsRecoding] = useState(false)

  const timeInfo = useMemo(() => {
    return formatTime(time)
  }, [time])

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

  const play = async () => {
    setIsRecoding(true)
    intervalRef.current = setInterval(() => {
      setTime(time => time + 1)
    }, 1000)
  }

  const stop = async () => {
    intervalRef.current && clearInterval(intervalRef.current)
    setIsRecoding(false)
  }

  return <Wrapper 
    ref={wrapperRef}
    onMouseOver={() => setOver(true)} 
    onMouseOut={() => setOver(false)} >
    <video ref={videoRef}></video>
    {
      !over && isRecording && <TimeWrapper>{timeInfo}</TimeWrapper>
    }
    {
      <Record videoEle={videoRef.current} 
        deviceId={deviceId} 
        isPlaying={isRecording}
        onPlay={play}
        onStop={stop} 
        style={{display: over ? 'block' : 'none'}}
      />
    }
    { 
      over && 
      <>
        <FilterSetting videoEle={videoRef.current} value="none"/>
        <Screenshot htmlEle={videoRef.current}/>
        <StyleSetting toggle={toggle} isCycle={isCycle}/>
        <Setting value={deviceId} onChange={setDeviceId}/>
      </> 
    }
  </Wrapper>
}