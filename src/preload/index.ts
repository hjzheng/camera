import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  drag: (param: {x: number, y: number}) => {
    ipcRenderer.send('drag', param)
  },
  showContextMenu: () => {
    ipcRenderer.send('showContextMenu')
  },
  showSaveFileDialog: (fileData, fileType) => {
    ipcRenderer.send('showSaveFileDialog', fileData, fileType)
  },
  openWebsite: (url) => {
    ipcRenderer.send('openWebsite', url)
  },
  openFilterSettingMenu: (value) => {
    return ipcRenderer.send('openFilterSettingMenu', value)
  },
  setFilter: (callback) => {
    ipcRenderer.on('setFilter', callback)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
