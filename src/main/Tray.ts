import { Menu, Tray, shell, BrowserWindow } from 'electron'
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
    { label: '刷新', role: 'reload'},
    { label: '源码', click: () => {
      shell.openExternal('https://github.com/hjzheng/camera')
    }},
    { label: 'dev', click: () => {
      const wins = BrowserWindow.getAllWindows()
      // @ts-ignore
      if (wins[0]) wins[0].webContents.toggleDevTools({mode: 'detach'})
    }},
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

