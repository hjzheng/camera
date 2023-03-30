import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Dropdown } from 'antd'
import type { MenuProps } from 'antd';
import { SettingOutlined } from '@ant-design/icons' 

const Wrapper = styled.div`
  position: absolute;
  bottom: 10px;
  z-index: 10;
`
interface IProps {
  value?: string
  onChange: (deviceId: string) => void
}

export function Setting({onChange}: IProps): JSX.Element {

  const [ cameras, setCameras] = useState([] as MediaDeviceInfo[])

  useEffect(() => {
    (async () => {
      const devices = await navigator.mediaDevices.enumerateDevices()
      let filterDevices = devices.filter(device => device.kind.includes('video'))
      setCameras(filterDevices)
      onChange && onChange(filterDevices[0].deviceId)
    })();
   
  }, [])

  const items: MenuProps['items'] = cameras.map(c => {
    return {key: c.deviceId, label: c.label}
  })

  return <Wrapper>
    <Dropdown
      menu={{
        items,
        onClick: (e) => onChange(e.key),
      }}
      placement={'top'}
      >
      <SettingOutlined title={'设置'} style={{color: '#fff'}}/>
    </Dropdown>
  </Wrapper>
}