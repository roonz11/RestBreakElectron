const { app, BrowserWindow, Notification } = require("electron");
const path = require("path");
const fs = require("fs");
const url = require("url");

let win;
const args = process.argv.slice(1),
  serve = args.some((val) => val === "--serve");

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      allowRunningInsecureContent: serve ? true : false,
      //preload: path.join(__dirname, "preload.js"),
    },
  });

  if (serve) {
    win.webContents.openDevTools();
    require("electron-reload")(__dirname, {
      electron: require(path.join(__dirname, "node_modules/electron")),
    });
    win.loadURL("http://localhost:4200");
  } else {
    // Path when running electron executable
    let pathIndex = "./index.html";

    if (fs.existsSync(path.join(__dirname, "../dist/index.html"))) {
      // Path when running electron in local folder
      pathIndex = "../dist/index.html";
    }

    //win.loadURL(`file://${(path.join(__dirname, `/dist/RestBreakElectron/index.html`))}`);
    win.loadURL(
      url.format({
        protocol: "file:",
        //pathname: path.join(__dirname, '/dist/RestBreakElectron/index.html'),
        pathname: path.join(__dirname, pathIndex),
        slashes: true,
      })
    );
  }

  win.webContents.send("showNotificaiton", showNotification);
}

const NOTIFICATION_TITLE = "Basic Notification HOT";
const NOTIFICATION_BODY = "Notification from the Main process";

const showNotification = () => {
  new Notification({
    title: NOTIFICATION_TITLE,
    body: NOTIFICATION_BODY,
  }).show();
};

app.whenReady().then(createWindow);
//.then(showNotification);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
