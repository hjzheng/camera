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
    // create reload menu item  
    // { label: '重新加载', role: 'reload' },
    // create toggle dev tools menu item
    // { label: '切换开发者工具', role: 'toggleDevTools' },
    // create toggle fullscreen menu item
    // { label: '切换全屏', role: 'togglefullscreen' },
  ])

  appIcon.setToolTip('摄像头')
  appIcon.setContextMenu(contextMenu)
}

export {createTray}

