const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    quitApplication: () => ipcRenderer.send('quit-app')
})