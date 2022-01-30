import { app, ipcMain, globalShortcut } from 'electron';

export function shortcutRegister(mainWin: any) {
	// regist'CommandOrControl+Alt+X'
	const ret = globalShortcut.register('CommandOrControl+Alt+X', () => {
		// console.log('CommandOrControl+X is pressed');
		if (!mainWin.isMinimized()) {
			mainWin.minimize();
		} else {
			mainWin.restore();
		}
	});
	if (!ret) {
		// console.log('registration failed');
	}
}

export function windowsChange(mainWin: any) {
	// window-minimize
	ipcMain.on('window-min', () => {
		mainWin.minimize();
	});

	// window-maximize
	ipcMain.on('window-max', () => {
		mainWin.setFullScreen(!mainWin.isFullScreen());
	});

	// widnow-close
	ipcMain.on('window-close', () => {
		mainWin.close();
	});
}
