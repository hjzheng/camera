
import styled from 'styled-components'
import { PictureOutlined } from '@ant-design/icons' 
import { useEffect } from 'react';

const Wrapper = styled.div`
  position: absolute;
  left: 10px;
  top: calc(50% - 16px);
  z-index: 10;
  cursor: pointer;
`

interface IProps {
  videoEle?: HTMLVideoElement | null | undefined
  value?: string
}

export const FilterSetting = ({videoEle}: IProps) => {

  useEffect(() => {
    window.api.setFilter((_e, filterValue) => {
      if (videoEle) videoEle.style.filter = filterValue
    })
  }, [])

  const onClick = () => {
    window.api.openFilterSettingMenu(videoEle?.style?.filter || 'none')
  }

  return (
    <Wrapper>
      <PictureOutlined onClick={onClick} title={'滤镜'} style={{color: '#fff'}}/>
    </Wrapper>
  )
}