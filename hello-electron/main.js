// reference: https://electron.atom.io/docs/tutorial/quick-start/

const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

// keep a global reference of the window object, if you don't, the window will
// be closed automatically when the Javascript object is garbase collected.
let win;

function createWindow() {
    // create the browser window.
    win = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // open the Devtools.
    win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the windwos object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});