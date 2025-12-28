const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('electronAPI', {
  downloadVideo: (url, filename, outputDir) => ipcRenderer.send('download-video', { url, filename, outputDir }),
  selectOutputDirectory: () => ipcRenderer.invoke('select-output-directory'),
  getOutputDirectory: () => ipcRenderer.invoke('get-output-directory'),
  createProjectFolder: (projectName, outputDir) => ipcRenderer.invoke('create-project-folder', { projectName, outputDir }),
  deleteProjectFolder: (projectName, outputDir) => ipcRenderer.invoke('delete-project-folder', { projectName, outputDir }),
  getProjectFolderPath: (projectName, outputDir) => ipcRenderer.invoke('get-project-folder-path', { projectName, outputDir }),
  uploadImageToOSS: (imageDataUrl, bucketDomain) => ipcRenderer.invoke('upload-image-to-oss', { imageDataUrl, bucketDomain }),
  uploadVideoToOSS: (videoDataUrl, bucketDomain) => ipcRenderer.invoke('upload-video-to-oss', { videoDataUrl, bucketDomain }),
  downloadVideoToBase64: (videoUrl) => ipcRenderer.invoke('download-video-to-base64', { videoUrl }),
  openExternalUrl: (url) => ipcRenderer.invoke('open-external-url', { url }),
  openWebWindow: (url, title) => ipcRenderer.invoke('open-web-window', { url, title }),
  loadDatabase: () => ipcRenderer.invoke('load-database'),
  saveDatabase: (data) => ipcRenderer.invoke('save-database', data),
  onAppBeforeQuit: (callback) => {
    ipcRenderer.on('app-before-quit', callback);
    return () => ipcRenderer.removeAllListeners('app-before-quit');
  }
});
