const { app, BrowserWindow, Notification } = require("electron");
const url = require("url");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  //win.loadURL(`file://${(path.join(__dirname, `/dist/RestBreakElectron/index.html`))}`);
  win.loadURL(url.format({
    protocol: 'file:',
    pathname: path.join(__dirname, '/dist/RestBreakElectron/index.html'),
    slashes: true
  }));

}

const NOTIFICATION_TITLE = "Basic Notification HOT";
const NOTIFICATION_BODY = "Notification from the Main process";

function showNotification() {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show();
}

app.whenReady()
  .then(createWindow);
//.then(showNotification);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

try {
  require('electron-reloader')(module)
} catch (_) { }