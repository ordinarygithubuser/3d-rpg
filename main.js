'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') app.quit();
});

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        'frame': false,
        'width': 1600,
        'height': 1000,
        'min-width': 1600,
        'min-height': 1000
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.setMenu(null);
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => mainWindow = null);
});