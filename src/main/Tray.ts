import { Menu, Tray } from 'electron'
import path from 'path'

const createTray = () => {
  const appIcon = new Tray(
    path.resolve(__dirname, 
      process.platform === 'darwin' ? 
      '../../resources/appTemplate@2x.png' : 
      '../../resources/app.png')
  )

  const contextMenu = Menu.buildFromTemplate([
    { label: '退出', role: 'quit' },
  ])

  appIcon.setToolTip('摄像头')
  appIcon.setContextMenu(contextMenu)
}

export {createTray}

