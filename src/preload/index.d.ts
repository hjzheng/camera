import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      drag: ({x: number, y: number}) => void
      showContextMenu: () => void
      showSaveFileDialog: (fileData: any) => void,
      openWebsite: (url: string) => void
      openFilterSettingMenu: (filterValue: string) => void
      setFilter: (callback: (e, filterValue: string) => void) => void
    }
  }
}
