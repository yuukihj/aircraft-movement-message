// preload.js
const { contextBridge, clipboard } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    copyToClipboard: (text) => clipboard.writeText(text),
});
