import { BrowserWindow, app, BrowserView, Menu, ipcMain, globalShortcut } from 'electron';
import path from 'path';
import fs from 'fs';
import logger from 'electron-log';
import { sayHi } from './main/test';
import { autoUpdater } from 'electron-updater';

const mainLog = logger.scope('main.index');
autoUpdater.logger = mainLog;
autoUpdater.autoDownload = false;
mainLog.info('开始启动 app');
app.setAppUserModelId('electron-vite-boilerplate');

//-------------------------------------------------------------------
// Define the menu
//
// THIS SECTION IS NOT REQUIRED
//-------------------------------------------------------------------
let template: (Electron.MenuItemConstructorOptions | Electron.MenuItem)[] = [];
if (process.platform === 'darwin') {
    // OS X
    const name = app.getName();
    template.unshift({
        label: name,
        submenu: [
            {
                label: 'About ' + name,
                role: 'about',
            },
            {
                label: 'Quit',
                accelerator: 'Command+Q',
                click() {
                    app.quit();
                },
            },
        ],
    });
}

let mainWin: BrowserWindow;

const isSingleApp = app.requestSingleInstanceLock();

if (!isSingleApp) {
    app.quit();
}

//-------------------------------------------------------------------
// Open a window that displays the version
//
// THIS SECTION IS NOT REQUIRED
//
// This isn't required for auto-updates to work, but it's easier
// for the app to show a window than to have to click "About" to see
// that updates are working.
//-------------------------------------------------------------------

function sendStatusToWindow(text: string) {
    mainLog.info(text);
    mainWin.webContents.send('message', text);
}

autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
});
autoUpdater.on('update-available', (ev, info) => {
    sendStatusToWindow('Update available.');
});
autoUpdater.on('update-not-available', (ev, info) => {
    sendStatusToWindow('Update not available.');
});
autoUpdater.on('error', (ev, err) => {
    sendStatusToWindow('Error in auto-updater.');
});
autoUpdater.on('download-progress', (ev, progressObj) => {
    sendStatusToWindow('Download progress...');
});
autoUpdater.on('update-downloaded', (ev, info) => {
    sendStatusToWindow('Update downloaded; will install in 5 seconds');
});

app.on('ready', () => {
    // 注册一个'CommandOrControl+Alt+X' 快捷键监听器
    const ret = globalShortcut.register('CommandOrControl+Alt+X', () => {
        console.log('CommandOrControl+X is pressed');
        if (!mainWin.isMinimized()) {
            mainWin.minimize();
        } else {
            mainWin.restore();
        }
    })
    if (!ret) {
        console.log('registration failed');
    }
    // 检查快捷键是否注册成功
    console.log(globalShortcut.isRegistered('CommandOrControl+Alt+X'));
});

app.on('window-all-closed', () => {
    app.quit();
});

// window-minimize
ipcMain.on('window-min', () => {
    console.log('minimize');
    mainWin.minimize();
});

// window-maximize
ipcMain.on('window-max', () => {
    console.log('maximize');
    if (process.platform === 'darwin') { // Mac OS

    } else if (process.platform === 'win32'){ // Windows System
        mainWin.isMaximized() ? mainWin.restore() : mainWin.maximize();
    }
});

// widnow-close
ipcMain.on('window-close', () => {
    console.log('close');
    mainWin.close();
});

app.whenReady().then(res => {
    mainWin = new BrowserWindow({
        show: false,
        frame: false,
        height: 800,
        width: 975,
        minHeight: 800,
        minWidth: 975,
        backgroundColor: '#fff',
        webPreferences: {
            preload: path.resolve(app.getAppPath(), './buildMain/preload.js'),
            contextIsolation: false,
            nodeIntegration: true,
            webSecurity: false,
        },
    });
    console.log(process.env.NODE_ENV, process.env.NODE_CCC);
    if (process.env.NODE_ENV === 'staging') {
        mainWin.loadURL('http://localhost:3000');
    } else {
        mainWin.loadFile(path.resolve(app.getAppPath(), './buildRender/index.html'));
        const dirList = fs.readdirSync(path.resolve(app.getAppPath()));
        mainLog.info('🚀 ~ file: index.ts ~ line 35 ~ app.whenReady ~ dirList', dirList);
    }
    // mainWin.webContents.openDevTools(); // open devTools
    sayHi();

    // Create the Menu
    // const menu = Menu.buildFromTemplate(template);
    // Menu.setApplicationMenu(menu);

    mainWin.on('ready-to-show', () => {
        mainWin.show();
        if (process.env.NODE_ENV !== 'staging') {
            autoUpdater.checkForUpdates();
        }
    });
});

autoUpdater.on('update-downloaded', (ev, info) => {
    // Wait 5 seconds, then quit and install
    // In your application, you don't need to wait 5 seconds.
    // You could call autoUpdater.quitAndInstall(); immediately
    setTimeout(function () {
        autoUpdater.quitAndInstall();
    }, 5000);
});

ipcMain.handle('startDownload', (_e: Event, data: any) => {
    mainLog.info(data);
    autoUpdater.downloadUpdate();
});
