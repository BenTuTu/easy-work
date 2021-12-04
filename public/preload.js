const { ipcRenderer, contextBridge } = require("electron");
const packJson = require("../package.json");

window.global = global;

window.ipcRenderer = ipcRenderer;
window.appVersion = packJson.version;

// contextBridge.exposeInMainWorld("electron", {
//   ipcRenderer,
// });
