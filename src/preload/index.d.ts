import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      drag: ({x: number, y: number}) => void
      showContextMenu: () => void
      showSaveFileDialog: (fileData: any) => void,
      openWebsite: (url: string) => void
    }
  }
}
