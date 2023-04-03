import { useState } from 'react'
import styled from 'styled-components'
import { BorderOutlined, CheckCircleOutlined } from '@ant-design/icons' 

const Wrapper = styled.div`
  position: absolute;
  right: 10px;
  top: calc(50% - 16px);
  z-index: 10;
  cursor: pointer;
`
interface IProps {
 isCycle?: boolean
 toggle: (isCycle) => void
}

export function StyleSetting({isCycle, toggle }: IProps): JSX.Element {

  const [bool, setBool] = useState(isCycle ?? true)

  return <Wrapper>
      <div 
        onClick={() => {
          toggle && toggle(!bool)
          setBool(!bool)
        }
      }>
        { !bool ? <CheckCircleOutlined title={'圆形'} style={{color: '#fff'}} /> : <BorderOutlined title={'方形'} style={{color: '#fff'}} />}
      </div>
  </Wrapper>
}