import styled from 'styled-components'
import { ScissorOutlined } from '@ant-design/icons' 
import html2canvas from 'html2canvas'

const Wrapper = styled.div`
  position: absolute;
  top: 10px;
  z-index: 10;
`
interface IProps {
  htmlEle?: HTMLElement | null | undefined
  onClick?: () => void
}

export function Screenshot({htmlEle, onClick}: IProps): JSX.Element {

  const screenShort = () => {
    html2canvas(htmlEle || document.body).then(function(canvas) {
      window.api.showSaveFileDialog(canvas.toDataURL()) 
    })
    onClick && onClick()
  }

  return <Wrapper>
      <ScissorOutlined title={'截图'} style={{color: '#fff'}} onClick={() => screenShort()}/>
  </Wrapper>
}