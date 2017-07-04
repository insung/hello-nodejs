const {app, BrowserWindow, ipcMain} = require('electron');
let onlineStatusWindow;

app.on('ready', () => {
    onlineStatusWindow = new BrowserWindow({width: 0, height: 0, show: false});
    onlineStatusWindow.loadURL('file://${__dirname}/online-status.html');
});

ipcMain.on('online-status-changed', (event, status) => {
    console.log(status);
});