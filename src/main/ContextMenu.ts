import { Menu, shell } from "electron"

const createContextMenu = (win) => {

  const contextMenu = Menu.buildFromTemplate([
    { label: '退出', role: 'quit' },
    { label: '刷新', role: 'reload'},
    { label: '源码', click: () => {
      shell.openExternal('https://github.com/hjzheng/camera')
    }},
    { label: 'dev', click: () => {
      if (win) win.webContents.toggleDevTools({mode: 'detach'})
    }},
  ])
  
  return contextMenu
}

export { createContextMenu }