const { app, BrowserWindow } = require('electron');
const is_development = process.env.NODE_ENV === 'development';

if (is_development) {
  require('electron-reload')(__dirname);
}

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('./dist/index.html');

  if (is_development) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
  app.quit();
});

app.on('activate', function() {
  if (mainWindow === null) createWindow();
});
