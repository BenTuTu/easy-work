interface Window {
	appVersion: string;
	ipcRenderer: Electron.IpcRenderer;
	__store: Store;
}

declare module '*.json';
declare module '@schema-plugin-flow/*';
declare module '*.module.scss';
declare module 'kill-port';
declare module 'captcha-mini';
declare module 'notistack';
