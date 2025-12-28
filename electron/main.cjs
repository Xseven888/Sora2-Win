const { app, BrowserWindow, shell, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');
const { URL } = require('url');
const crypto = require('crypto');

let mainWindow;
let outputDirectory = null;

// 数据库文件路径
const getDatabasePath = () => {
  const userDataPath = app.getPath('userData');
  return path.join(userDataPath, 'sora2-database.json');
};

// 读取数据库
const loadDatabase = () => {
  try {
    const dbPath = getDatabasePath();
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf-8');
      const parsed = JSON.parse(data);
      // 验证数据格式
      if (parsed && typeof parsed === 'object') {
        return parsed;
      }
    }
    // 文件不存在或格式错误，返回默认值（不是错误）
    return {
      config: null,
      projects: null,
      queue: [],
      activeProjectId: null
    };
  } catch (error) {
    console.error('读取数据库失败:', error);
    // 返回默认值而不是抛出错误
    return {
      config: null,
      projects: null,
      queue: [],
      activeProjectId: null,
      error: error.message
    };
  }
};

// 保存数据库
const saveDatabase = (data) => {
  try {
    const dbPath = getDatabasePath();
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    return { success: true };
  } catch (error) {
    console.error('保存数据库失败:', error);
    return { success: false, error: error.message };
  }
};

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: "Sora2 视频生成管理器",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs'),
      webviewTag: true, // 启用 webview 标签支持
    },
    autoHideMenuBar: true,
  });

  const isDev = !app.isPackaged;
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  ipcMain.on('download-video', (event, { url, filename, outputDir }) => {
    const saveDir = outputDir || outputDirectory || app.getPath('downloads');
    const savePath = path.join(saveDir, filename);
    mainWindow.webContents.downloadURL(url);
    mainWindow.webContents.session.once('will-download', (e, item) => {
      item.setSavePath(savePath);
    });
  });
};

// IPC 处理程序
ipcMain.handle('select-output-directory', async () => {
  if (!mainWindow) return null;
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory'],
    title: '选择输出目录'
  });
  
  if (!result.canceled && result.filePaths.length > 0) {
    outputDirectory = result.filePaths[0];
    return outputDirectory;
  }
  return null;
});

ipcMain.handle('get-output-directory', () => {
  return outputDirectory || app.getPath('downloads');
});

// 清理文件夹名称，移除非法字符
function sanitizeFolderName(name) {
  // 移除或替换 Windows 文件系统不允许的字符
  return name.replace(/[<>:"/\\|?*]/g, '_').trim() || '未命名项目';
}

// 创建项目文件夹
ipcMain.handle('create-project-folder', async (event, { projectName, outputDir }) => {
  try {
    const baseDir = outputDir || outputDirectory || app.getPath('downloads');
    const folderName = sanitizeFolderName(projectName);
    const projectFolderPath = path.join(baseDir, folderName);
    
    if (!fs.existsSync(projectFolderPath)) {
      fs.mkdirSync(projectFolderPath, { recursive: true });
    }
    
    return { success: true, path: projectFolderPath };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// 删除项目文件夹
ipcMain.handle('delete-project-folder', async (event, { projectName, outputDir }) => {
  try {
    const baseDir = outputDir || outputDirectory || app.getPath('downloads');
    const folderName = sanitizeFolderName(projectName);
    const projectFolderPath = path.join(baseDir, folderName);
    
    if (fs.existsSync(projectFolderPath)) {
      fs.rmSync(projectFolderPath, { recursive: true, force: true });
    }
    
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// 获取项目文件夹路径
ipcMain.handle('get-project-folder-path', (event, { projectName, outputDir }) => {
  try {
    const baseDir = outputDir || outputDirectory || app.getPath('downloads');
    const folderName = sanitizeFolderName(projectName);
    return path.join(baseDir, folderName);
  } catch (error) {
    return null;
  }
});

// 上传图片到 OSS（公共写模式）
ipcMain.handle('upload-image-to-oss', async (event, { imageDataUrl, bucketDomain }) => {
  try {
    if (!bucketDomain || !bucketDomain.trim()) {
      return { success: false, error: 'OSS Bucket 域名未配置' };
    }

    // 解析 base64 数据
    const base64Data = imageDataUrl.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');
    
    // 生成唯一文件名（8位随机ID + .jpg）
    const uniqueId = crypto.randomBytes(4).toString('hex');
    const objectKey = `images/${uniqueId}.jpg`;
    
    // 构建上传 URL
    const bucketUrl = bucketDomain.trim().replace(/\/$/, '');
    const uploadUrl = `${bucketUrl}/${objectKey}`;
    
    // 解析 URL
    const urlObj = new URL(uploadUrl);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    return new Promise((resolve, reject) => {
      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || (isHttps ? 443 : 80),
        path: urlObj.pathname,
        method: 'PUT',
        headers: {
          'Content-Type': 'image/jpeg',
          'Content-Length': imageBuffer.length,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      };

      const req = client.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve({ success: true, url: uploadUrl });
          } else {
            reject(new Error(`OSS 上传失败: 状态码 ${res.statusCode}, ${data}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(new Error(`OSS 上传错误: ${error.message}`));
      });

      req.write(imageBuffer);
      req.end();
    });
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// 上传视频到 OSS（公共写模式）
ipcMain.handle('upload-video-to-oss', async (event, { videoDataUrl, bucketDomain }) => {
  try {
    if (!bucketDomain || !bucketDomain.trim()) {
      return { success: false, error: 'OSS Bucket 域名未配置' };
    }

    // 解析 base64 数据，支持多种视频格式
    let base64Data, fileExtension, contentType;
    if (videoDataUrl.startsWith('data:video/')) {
      const match = videoDataUrl.match(/^data:video\/(\w+);base64,(.+)$/);
      if (match) {
        const format = match[1];
        base64Data = match[2];
        fileExtension = format === 'mp4' ? 'mp4' : format === 'webm' ? 'webm' : 'mp4';
        contentType = `video/${format}`;
      } else {
        // 尝试通用格式
        base64Data = videoDataUrl.replace(/^data:video\/\w+;base64,/, '');
        fileExtension = 'mp4';
        contentType = 'video/mp4';
      }
    } else {
      // 假设是 base64 字符串
      base64Data = videoDataUrl.replace(/^data:.*;base64,/, '');
      fileExtension = 'mp4';
      contentType = 'video/mp4';
    }
    
    const videoBuffer = Buffer.from(base64Data, 'base64');
    
    // 生成唯一文件名（8位随机ID + 扩展名）
    const uniqueId = crypto.randomBytes(4).toString('hex');
    const objectKey = `videos/${uniqueId}.${fileExtension}`;
    
    // 构建上传 URL
    const bucketUrl = bucketDomain.trim().replace(/\/$/, '');
    const uploadUrl = `${bucketUrl}/${objectKey}`;
    
    // 解析 URL
    const urlObj = new URL(uploadUrl);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    return new Promise((resolve, reject) => {
      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || (isHttps ? 443 : 80),
        path: urlObj.pathname,
        method: 'PUT',
        headers: {
          'Content-Type': contentType,
          'Content-Length': videoBuffer.length,
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      };

      const req = client.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          if (res.statusCode === 200) {
            resolve({ success: true, url: uploadUrl });
          } else {
            reject(new Error(`OSS 上传失败: 状态码 ${res.statusCode}, ${data}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(new Error(`OSS 上传错误: ${error.message}`));
      });

      req.write(videoBuffer);
      req.end();
    });
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// 数据库 IPC 处理程序
ipcMain.handle('load-database', () => {
  return loadDatabase();
});

ipcMain.handle('save-database', (event, data) => {
  return saveDatabase(data);
});

// 打开外部链接
ipcMain.handle('open-external-url', async (event, { url }) => {
  try {
    await shell.openExternal(url);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// 创建新窗口显示网页
ipcMain.handle('open-web-window', async (event, { url, title }) => {
  try {
    const webWindow = new BrowserWindow({
      width: 1280,
      height: 800,
      title: title || '网页',
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
      },
      autoHideMenuBar: true,
    });
    
    await webWindow.loadURL(url);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// 从 URL 下载视频并转换为 base64
ipcMain.handle('download-video-to-base64', async (event, { videoUrl }) => {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(videoUrl);
      const client = url.protocol === 'https:' ? https : http;
      
      client.get(videoUrl, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`下载失败: HTTP ${response.statusCode}`));
          return;
        }
        
        const chunks = [];
        response.on('data', (chunk) => {
          chunks.push(chunk);
        });
        
        response.on('end', () => {
          try {
            const buffer = Buffer.concat(chunks);
            const base64 = buffer.toString('base64');
            const mimeType = response.headers['content-type'] || 'video/mp4';
            const dataUrl = `data:${mimeType};base64,${base64}`;
            resolve(dataUrl);
          } catch (error) {
            reject(new Error(`Base64 转换失败: ${error.message}`));
          }
        });
        
        response.on('error', (error) => {
          reject(new Error(`下载错误: ${error.message}`));
        });
      }).on('error', (error) => {
        reject(new Error(`请求错误: ${error.message}`));
      });
    } catch (error) {
      reject(new Error(`URL 解析失败: ${error.message}`));
    }
  });
});

// 应用关闭时保存数据
app.on('before-quit', () => {
  // 通知渲染进程保存数据
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('app-before-quit');
  }
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });