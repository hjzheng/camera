import { useRef } from 'react';
import styled from 'styled-components'
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons' 
// https://github.com/muaz-khan/RecordRTC
import { RecordRTCPromisesHandler } from 'recordrtc'
import { sleep } from '@renderer/utils/tools';

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  cursor: pointer;
`

interface IProps {
  videoEle: HTMLVideoElement | null | undefined
  deviceId: string
  isPlaying: boolean
  onPlay: () => void
  onStop: () => void
  style: any
}

export const Record = ({videoEle, deviceId, onPlay, onStop, isPlaying, style}: IProps) => {
  const recorder: React.MutableRefObject<RecordRTCPromisesHandler | null> = useRef(null)

  const startRecord = async () => {
    try {
      onPlay && onPlay()

      let stream = await navigator.mediaDevices.getUserMedia({video: {deviceId}, audio: false})

      let video = videoEle
      
      if (video) {
          video.srcObject = stream
          video.muted = true
          video.play()
      }
    
      recorder.current = new RecordRTCPromisesHandler(stream, {
        type: 'video'
      });

      recorder.current.startRecording()

      await sleep(3000);
    } catch (error) {
      console.error(error);
    }
  }

  const stopRecord = async () => {
    if (recorder.current) {
      onStop && onStop()
      await recorder.current.stopRecording();
      let blob = await recorder.current.getBlob();
      let buffer = await blob.arrayBuffer();
      // send to main process to save file
      window.api.showSaveFileDialog(buffer, 'video/webm')
    }
  }

  return (
    <Wrapper style={style}>
      { isPlaying ? 
        <PauseCircleOutlined 
          onClick={stopRecord} 
          title={'停止录制'} 
          style={{color: '#fff'}} /> : 
        <PlayCircleOutlined 
          onClick={startRecord} 
          title={'开始录制'} 
          style={{color: '#fff'}} /> }
    </Wrapper>
  )
}