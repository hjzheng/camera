import { Menu } from "electron"

const createContextMenu = (win) => {

  const contextMenu = Menu.buildFromTemplate([
    { label: '退出', role: 'quit' },
    { label: '刷新', role: 'reload'},
    { label: 'dev', click: () => {
      if (win) win.webContents.openDevTools({mode: 'detach'})
    }},
  ])
  
  return contextMenu
}

export { createContextMenu }