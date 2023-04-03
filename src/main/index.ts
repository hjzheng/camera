import { app, shell, BrowserWindow, ipcMain, systemPreferences, powerMonitor, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { createTray } from './Tray'
import { createContextMenu } from './ContextMenu'
import { createCSSFilterMenu } from './CSSFilterMenu'
import fs from 'fs'


function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    minWidth: 200,
    minHeight: 200,
    width: 200,
    height: 200,
    maxWidth: 400,
    maxHeight: 400,
    show: false,
    frame: false,
    transparent: true,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    skipTaskbar: true, 
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.setAspectRatio(1)
  // mainWindow.webContents.openDevTools({mode: 'detach'})

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')
  // await systemPreferences.askForMediaAccess('microphone')
  await systemPreferences.askForMediaAccess('camera')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()
  createTray()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  // 隐藏 dock 上的图标 
  app.dock.hide()
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on('drag', (e, arg) => {
  const win = BrowserWindow.fromWebContents(e.sender)
  
  if (win) {
    const [x, y] = win.getPosition()
    const {x: dx, y: dy} = arg
    win.setPosition(x-dx, y-dy, false)
  }
})

ipcMain.on('showContextMenu', (e) => {
  let win = BrowserWindow.fromWebContents(e.sender)
  const contextMenu = createContextMenu(win)
  if (win) contextMenu.popup({ window: win})
})

ipcMain.on('openWebsite', async (_e, url) => {
  await shell.openExternal(url)
})

ipcMain.on('openFilterSettingMenu', async (e, filterValue) => {
  let win = BrowserWindow.fromWebContents(e.sender)
  const cssFilterMenu = createCSSFilterMenu(win, filterValue)
  if (win) cssFilterMenu.popup({ window: win})
})

ipcMain.on('showSaveFileDialog', async (e, fileData) => {
  let win = BrowserWindow.fromWebContents(e.sender)
  if (win) {
    const { filePath } = await dialog.showSaveDialog(win, {
      title: '保存文件', 
      defaultPath: '~/Desktop',
      buttonLabel: '保存',
      filters: [
        { name: 'Img', extensions: ['png'] },
      ],
      properties: ['createDirectory']
    })
    if (filePath) {
      const opt = {
        flag: 'w', // a：追加写入；w：覆盖写入
      }
      const base64 = fileData.replace(/^data:image\/\w+;base64,/, "");
      const dataBuffer = Buffer.from(base64, 'base64');
      fs.writeFile(filePath, dataBuffer, opt, (err) => {
        if (err) {
          dialog.showErrorBox(`保存${filePath}失败`, err.message) 
          console.error(err)
        } else {
          dialog.showMessageBox(win as BrowserWindow, {
            type: 'info',
            title: '保存成功',
            message: `保存${filePath}成功`,
            buttons: ['确定']
          })
        }
      })
    }
  }
})

powerMonitor.on('suspend', () => {
  console.log('The system is going to sleep');
});

powerMonitor.on('resume', () => {
  console.log('The system is resuming');
  const apps = BrowserWindow.getAllWindows()
  if (apps[0]) apps[0].webContents.reload()
});

