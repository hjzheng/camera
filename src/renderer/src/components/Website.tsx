
import styled from 'styled-components'
import { GithubOutlined } from '@ant-design/icons' 

const Wrapper = styled.div`
  position: absolute;
  left: 10px;
  top: calc(50% - 16px);
  z-index: 10;
  cursor: pointer;
`

export const Website = () => {
  return (
    <Wrapper>
      <GithubOutlined title={'代码地址'} style={{ color: "#fff"}} onClick={() => {
        window.api.openWebsite('https://github.com/hjzheng/camera')
      }}/>
    </Wrapper>
  )
}