const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

var win;
var isFrameless = true;

const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        transparent: true,
        title: 'ScreenTypr',
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    })

    ipcMain.on('quit-app', (_) => {
        app.quit()
    })
    
    win.loadFile('index.html')
    win.maximize()
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
