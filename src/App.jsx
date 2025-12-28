import React, { useState, useEffect, useRef } from 'react';

// --- 图标组件 (Icons) ---
const IconPlus = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);
const IconMinus = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M5 12h14"/></svg>
);
const IconEdit = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
);
const IconFolder = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>
);
const IconSettings = ({ size = 20, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);
const IconTerminal = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>
);
const IconCheck = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>
);
const IconLink = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
);
const IconLoader = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`animate-spin ${className}`}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
);
const IconX = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const IconTrash = ({ size = 16, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
);
const IconClock = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
const IconLayers = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
);
const IconImage = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
);
const IconType = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/></svg>
);
const IconRepeat = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>
);
const IconScript = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
);
const IconCopy = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
);
const IconQueue = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
);
const IconVideo = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
);
const IconDownload = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
);
const IconInfo = ({ size = 16, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>
);


export default function App() {
  // --- 全局配置 ---
  const [config, setConfig] = useState({
    baseUrl: 'http://localhost:8000/v1/chat/completions',
    apiKey: 'han1234',
    maxConcurrent: 3, 
    taskInterval: 1.0, 
    outputDirectory: null, // 输出目录路径
    ossBucketDomain: '', // OSS Bucket 域名，例如: https://your-bucket.oss-cn-hangzhou.aliyuncs.com
  });

  // --- 项目管理状态 ---
  const [projects, setProjects] = useState([
      { id: 1, name: '示例项目 A', prompt: 'Product cinematic shot on a wooden table, 这是台词文案, 4k resolution.', image: null, imageName: null }
  ]);
  const [activeProjectId, setActiveProjectId] = useState(1);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editName, setEditName] = useState('');

  // --- 当前项目输入状态 ---
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [orientation, setOrientation] = useState('portrait');
  const [duration, setDuration] = useState('15s');
  const [modelName, setModelName] = useState('sora2-portrait-15s');
  const [generationType, setGenerationType] = useState('image'); 
  const [videoStyle, setVideoStyle] = useState(''); // 视频风格，空字符串表示无风格 

  // --- 批量生成状态 ---
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [batchMode, setBatchMode] = useState('script'); 
  const [batchScripts, setBatchScripts] = useState(['']);
  const [repeatCount, setRepeatCount] = useState(5);
  
  // --- App 状态 ---
  const [showDebug, setShowDebug] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [queue, setQueue] = useState([]);
  const [logs, setLogs] = useState([]);
  const [curlPreview, setCurlPreview] = useState('');
  const [showRemixModal, setShowRemixModal] = useState(false);
  const [remixTask, setRemixTask] = useState(null);
  const [remixPrompt, setRemixPrompt] = useState('');
  const [remixId, setRemixId] = useState('');
  const [creatingCharacter, setCreatingCharacter] = useState(false);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [showVideoEnhance, setShowVideoEnhance] = useState(false);
  const [showSoraWatermark, setShowSoraWatermark] = useState(false);
  const [showCreateCharacter, setShowCreateCharacter] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  
  // 创建角色页面状态
  const [characterVideo, setCharacterVideo] = useState(null);
  const [characterVideoName, setCharacterVideoName] = useState(null);
  const [characterPrompt, setCharacterPrompt] = useState('');
  const [characterModel, setCharacterModel] = useState('sora2-landscape-10s');
  const [characterCreating, setCharacterCreating] = useState(false);
  const [characterResult, setCharacterResult] = useState(null);
  const [characters, setCharacters] = useState([]); // 角色列表
  
  // --- 交互状态 (Toast, Tooltip) ---
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);
  
  // --- 输入法组合状态 ---
  const [isComposing, setIsComposing] = useState(false);
  const [isBatchComposing, setIsBatchComposing] = useState(false);

  // --- 调度器状态 ---
  const logsEndRef = useRef(null);
  const batchInputRef = useRef(null);
  const lastTaskStartTime = useRef(0);
  const [tick, setTick] = useState(0);
  const toastTimer = useRef(null);

  // --- 辅助函数：复制并显示 Toast ---
  const handleCopy = (text) => {
      if (!text) return;
      const strToCopy = typeof text === 'string' ? text : JSON.stringify(text);
      navigator.clipboard.writeText(strToCopy);
      if (toastTimer.current) clearTimeout(toastTimer.current);
      setToastVisible(true);
      toastTimer.current = setTimeout(() => setToastVisible(false), 1000);
  };

  // --- 效果钩子 ---

  // 从数据库加载数据
  const hasLoadedDatabase = useRef(false);
  useEffect(() => {
    if (hasLoadedDatabase.current) return;
    hasLoadedDatabase.current = true;
    
    if (window.electronAPI && typeof window.electronAPI.loadDatabase === 'function') {
      window.electronAPI.loadDatabase().then((dbData) => {
        if (dbData) {
          let hasLoadedData = false;
          
          // 检查是否有错误
          if (dbData.error) {
            console.error('数据库加载错误:', dbData.error);
            addLog("系统: 数据库文件损坏，使用默认配置。", "error");
          } else {
            // 加载配置
            if (dbData.config) {
              setConfig(prev => ({ ...prev, ...dbData.config }));
              hasLoadedData = true;
            } else {
              // 如果没有保存的配置，从 Electron 获取默认输出目录
              if (window.electronAPI && typeof window.electronAPI.getOutputDirectory === 'function') {
                window.electronAPI.getOutputDirectory().then(path => {
                  if (path) {
                    setConfig(prev => ({ ...prev, outputDirectory: path }));
                  }
                });
              }
            }
            
            // 加载项目列表
            if (dbData.projects && dbData.projects.length > 0) {
              setProjects(dbData.projects);
              if (dbData.activeProjectId) {
                setActiveProjectId(dbData.activeProjectId);
              }
              hasLoadedData = true;
            }
            
            // 加载队列（只加载已完成和失败的任务）
            if (dbData.queue && dbData.queue.length > 0) {
              setQueue(dbData.queue);
              hasLoadedData = true;
            }
            
            // 加载角色列表
            if (dbData.characters && dbData.characters.length > 0) {
              setCharacters(dbData.characters);
              hasLoadedData = true;
            }
            
            if (hasLoadedData) {
              addLog("系统: 数据已从数据库加载。", "success");
            } else {
              addLog("系统: 首次运行，使用默认配置。", "info");
            }
          }
        }
      }).catch(error => {
        console.error('加载数据库失败:', error);
        addLog(`系统: 加载数据库失败 - ${error.message}，使用默认配置。`, "error");
      });
    } else {
      // 回退到 localStorage（网页模式）
      const savedConfig = localStorage.getItem('sora2-config');
      if (savedConfig) {
        try {
          const parsed = JSON.parse(savedConfig);
          setConfig(prev => ({ ...prev, ...parsed }));
        } catch (e) {
          console.error('Failed to load config:', e);
        }
      }
    }
  }, []);

  // 为现有项目创建文件夹（如果还没有）- 只在应用启动时执行一次
  const hasInitializedFolders = useRef(false);
  useEffect(() => {
    if (!hasInitializedFolders.current && projects.length > 0 && config.outputDirectory && window.electronAPI && typeof window.electronAPI.createProjectFolder === 'function') {
      hasInitializedFolders.current = true;
      // 异步创建文件夹，不阻塞 UI
      Promise.all(projects.map(async (project) => {
        try {
          await window.electronAPI.createProjectFolder(project.name, config.outputDirectory);
        } catch (error) {
          // 静默失败，文件夹可能已存在
          console.log('项目文件夹可能已存在:', project.name);
        }
      })).catch(() => {
        // 忽略错误
      });
    }
  }, [config.outputDirectory, projects.length]);

  // 使用 ref 存储最新状态，用于保存
  const configRef = useRef(config);
  const projectsRef = useRef(projects);
  const queueRef = useRef(queue);
  const activeProjectIdRef = useRef(activeProjectId);
  const charactersRef = useRef(characters);

  // 更新 ref
  useEffect(() => {
    configRef.current = config;
  }, [config]);
  useEffect(() => {
    projectsRef.current = projects;
  }, [projects]);
  useEffect(() => {
    queueRef.current = queue;
  }, [queue]);
  useEffect(() => {
    activeProjectIdRef.current = activeProjectId;
  }, [activeProjectId]);
  useEffect(() => {
    charactersRef.current = characters;
  }, [characters]);

  // 保存数据到数据库
  const saveToDatabase = async () => {
    if (!window.electronAPI || typeof window.electronAPI.saveDatabase !== 'function') {
      // 回退到 localStorage（网页模式）
      localStorage.setItem('sora2-config', JSON.stringify(configRef.current));
      return;
    }
    
    try {
      // 只保存已完成和失败的任务
      const completedQueue = queueRef.current.filter(task => 
        task.status === 'COMPLETED' || task.status === 'FAILED'
      );
      
      const dbData = {
        config: configRef.current,
        projects: projectsRef.current,
        queue: completedQueue,
        activeProjectId: activeProjectIdRef.current,
        characters: charactersRef.current
      };
      
      await window.electronAPI.saveDatabase(dbData);
    } catch (error) {
      console.error('保存数据库失败:', error);
    }
  };

  // 自动保存配置和项目到数据库（防抖）
  const saveConfigTimeout = useRef(null);
  useEffect(() => {
    if (saveConfigTimeout.current) {
      clearTimeout(saveConfigTimeout.current);
    }
    saveConfigTimeout.current = setTimeout(() => {
      saveToDatabase();
    }, 1000); // 1秒后保存
    
    return () => {
      if (saveConfigTimeout.current) {
        clearTimeout(saveConfigTimeout.current);
      }
    };
  }, [config, projects, activeProjectId]);

  // 保存队列（只保存已完成和失败的任务）
  const completedQueueRef = useRef([]);
  useEffect(() => {
    const completedQueue = queue.filter(task => 
      task.status === 'COMPLETED' || task.status === 'FAILED'
    );
    
    // 只在已完成任务变化时保存
    if (JSON.stringify(completedQueue) !== JSON.stringify(completedQueueRef.current)) {
      completedQueueRef.current = completedQueue;
      saveToDatabase();
    }
  }, [queue]);

  // 保存角色列表
  useEffect(() => {
    if (characters.length > 0) {
      saveToDatabase();
    }
  }, [characters]);

  // 应用关闭前保存数据
  useEffect(() => {
    if (window.electronAPI && typeof window.electronAPI.onAppBeforeQuit === 'function') {
      const removeListener = window.electronAPI.onAppBeforeQuit(() => {
        saveToDatabase();
      });
      return removeListener;
    }
  }, []);

  useEffect(() => {
    const checkConnection = () => {
        if (window.electronAPI && typeof window.electronAPI.downloadVideo === 'function') {
            addLog("系统: 原生模块已成功连接。", "success");
        } else {
            addLog("系统: 未检测到原生模块，功能受限 (网页模式)。", "error");
        }
    };
    const timer = setTimeout(checkConnection, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const runningCount = queue.filter(t => t.status === 'GENERATING' || t.status === 'STARTING' || t.status === 'PROCESSING' || t.status === 'CACHING').length;
    const pendingTasks = queue.filter(t => t.status === 'PENDING');

    if (runningCount < parseInt(config.maxConcurrent) && pendingTasks.length > 0) {
        const now = Date.now();
        const intervalMs = (parseFloat(config.taskInterval) || 1.0) * 1000;
        const timeSinceLastStart = now - lastTaskStartTime.current;
        
        if (timeSinceLastStart < intervalMs) {
            const delay = intervalMs - timeSinceLastStart;
            const timerId = setTimeout(() => setTick(t => t + 1), delay);
            return () => clearTimeout(timerId);
        }

        const nextTask = pendingTasks[pendingTasks.length - 1]; 
        if (nextTask) {
            lastTaskStartTime.current = Date.now();
            updateTask(nextTask.id, { status: 'STARTING', stage: '准备发射' });
            // 对于角色创建，使用 video 字段；对于其他类型，使用 image 字段
            const mediaData = nextTask.generationType === 'character' ? nextTask.video : nextTask.image;
            processTask(nextTask.id, nextTask.prompt, mediaData, nextTask.generationType, nextTask.videoStyle);
        }
    }
  }, [queue, config.maxConcurrent, config.taskInterval, tick]);

  useEffect(() => {
      const proj = projects.find(p => p.id === activeProjectId);
      if (proj) setActiveProject(proj);
  }, [activeProjectId, projects]);

  // 当方向和时长改变时，如果当前模型是标准格式，则自动更新模型名称
  // 注意：如果用户手动选择了其他模型（如 Pro 版），则不会自动更新
  useEffect(() => {
    const currentModel = modelName || '';
    // 兼容旧的 sora-video- 格式，自动转换为 sora2- 格式
    if (currentModel.startsWith('sora-video-')) {
      const newModelName = `sora2-${orientation}-${duration}`;
    setModelName(newModelName);
      return;
    }
    // 只有当当前模型名称符合标准格式时才自动更新
    if (currentModel.startsWith('sora2-') && !currentModel.includes('pro') && !currentModel.includes('third-party')) {
      const newModelName = `sora2-${orientation}-${duration}`;
      if (newModelName !== currentModel) {
        setModelName(newModelName);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orientation, duration]);

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  useEffect(() => {
    if (!activeProject) return;
    let previewPrompt = String(activeProject.prompt || '');
    if (previewPrompt.includes('台词文案')) {
        previewPrompt = previewPrompt.replace('这是台词文案', '[台词文案]');
    }
    // 如果选择了视频风格，在预览提示词前面添加风格ID
    if (videoStyle && videoStyle.trim()) {
        previewPrompt = `{${videoStyle}}${previewPrompt}`;
    }
    const content = generationType === 'text'
        ? previewPrompt
        : [{ type: "text", text: previewPrompt }, { type: "image_url", image_url: { url: activeProject.image || "data:image/..." } }];
    const payload = {
        model: modelName,
        messages: [{ role: "user", content: content }],
        stream: true
    };
    const previewJson = JSON.parse(JSON.stringify(payload));
    if (generationType === 'image' && Array.isArray(previewJson.messages[0].content)) {
        const imageUrl = previewJson.messages[0].content[1].image_url.url;
        if (imageUrl.startsWith('data:image/') && imageUrl.length > 100) {
            previewJson.messages[0].content[1].image_url.url = "data:image/...[已截断]";
        } else if (imageUrl.startsWith('http')) {
            // OSS URL 不截断，完整显示
            previewJson.messages[0].content[1].image_url.url = imageUrl;
        }
    }
    const cmd = `curl -X POST "${config.baseUrl}" \\\n  -H "Authorization: Bearer ${config.apiKey}" \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(previewJson, null, 2)}'`;
    setCurlPreview(cmd);
  }, [config, activeProject, modelName, generationType, videoStyle]);

  // --- 处理器 ---

  const handleCreateProject = async () => {
      const newId = Date.now();
      const newProject = { id: newId, name: `新项目 ${projects.length + 1}`, prompt: '', image: null, imageName: null };
      setProjects([...projects, newProject]);
      setActiveProjectId(newId);
      
      // 创建项目文件夹
      if (window.electronAPI && typeof window.electronAPI.createProjectFolder === 'function') {
          try {
              const result = await window.electronAPI.createProjectFolder(newProject.name, config.outputDirectory);
              if (result.success) {
                  addLog(`项目文件夹已创建: ${result.path}`, 'success');
              } else {
                  addLog(`创建项目文件夹失败: ${result.error}`, 'error');
              }
          } catch (error) {
              addLog(`创建项目文件夹时出错: ${error.message}`, 'error');
          }
      }
  };

  const handleDeleteProject = async (e, id) => {
      e.stopPropagation();
      if (projects.length <= 1) return; 
      
      const projectToDelete = projects.find(p => p.id === id);
      if (!projectToDelete) return;
      
      // 删除项目文件夹
      if (window.electronAPI && typeof window.electronAPI.deleteProjectFolder === 'function') {
          try {
              const result = await window.electronAPI.deleteProjectFolder(projectToDelete.name, config.outputDirectory);
              if (result.success) {
                  addLog(`项目文件夹已删除: ${projectToDelete.name}`, 'success');
              } else {
                  addLog(`删除项目文件夹失败: ${result.error}`, 'error');
              }
          } catch (error) {
              addLog(`删除项目文件夹时出错: ${error.message}`, 'error');
          }
      }
      
      const newProjects = projects.filter(p => p.id !== id);
      setProjects(newProjects);
      if (activeProjectId === id) setActiveProjectId(newProjects[0].id);
  };

  const startRenaming = (e, project) => {
      e.stopPropagation();
      setEditingProjectId(project.id);
      setEditName(project.name);
  };

  const saveRename = async () => {
      if (!editName.trim()) return;
      
      const projectToRename = projects.find(p => p.id === editingProjectId);
      if (!projectToRename) return;
      
      const oldName = projectToRename.name;
      const newName = editName.trim();
      
      // 如果名称改变，需要重命名文件夹（删除旧文件夹，创建新文件夹）
      if (oldName !== newName && window.electronAPI) {
          // 删除旧文件夹
          if (typeof window.electronAPI.deleteProjectFolder === 'function') {
              try {
                  await window.electronAPI.deleteProjectFolder(oldName, config.outputDirectory);
              } catch (error) {
                  console.error('删除旧项目文件夹失败:', error);
              }
          }
          
          // 创建新文件夹
          if (typeof window.electronAPI.createProjectFolder === 'function') {
              try {
                  const result = await window.electronAPI.createProjectFolder(newName, config.outputDirectory);
                  if (result.success) {
                      addLog(`项目文件夹已重命名: ${oldName} -> ${newName}`, 'success');
                  }
              } catch (error) {
                  addLog(`重命名项目文件夹失败: ${error.message}`, 'error');
              }
          }
      }
      
      setProjects(prev => prev.map(p => p.id === editingProjectId ? { ...p, name: newName } : p));
      setEditingProjectId(null);
  };

  const updateActiveProject = (field, value) => {
      setProjects(prev => prev.map(p => p.id === activeProjectId ? { ...p, [field]: value } : p));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const dataUrl = reader.result;
        
        // 如果配置了 OSS，且是图生视频模式，上传到 OSS
        if (config.ossBucketDomain && config.ossBucketDomain.trim() && window.electronAPI && typeof window.electronAPI.uploadImageToOSS === 'function') {
          try {
            addLog('正在上传图片到 OSS...', 'info');
            const result = await window.electronAPI.uploadImageToOSS(dataUrl, config.ossBucketDomain);
            if (result.success) {
              addLog(`图片已上传到 OSS: ${result.url}`, 'success');
              // 保存 OSS URL 而不是 base64
              setProjects(prev => prev.map(p => p.id === activeProjectId ? {
                ...p,
                image: result.url,
                imageName: file.name,
                imageType: 'oss'
              } : p));
            } else {
              addLog(`OSS 上传失败: ${result.error}，使用本地图片`, 'error');
              // 上传失败，使用本地 base64
              setProjects(prev => prev.map(p => p.id === activeProjectId ? {
                ...p,
                image: dataUrl,
                imageName: file.name,
                imageType: 'local'
              } : p));
            }
          } catch (error) {
            addLog(`OSS 上传出错: ${error.message}，使用本地图片`, 'error');
            // 出错时使用本地 base64
            setProjects(prev => prev.map(p => p.id === activeProjectId ? {
              ...p,
              image: dataUrl,
              imageName: file.name,
              imageType: 'local'
            } : p));
          }
        } else {
          // 未配置 OSS 或不在 Electron 环境，使用本地 base64
          setProjects(prev => prev.map(p => p.id === activeProjectId ? {
            ...p,
            image: dataUrl,
            imageName: file.name,
            imageType: 'local'
          } : p));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScriptChange = (index, value) => {
      const newScripts = [...batchScripts];
      newScripts[index] = value;
      if (index === newScripts.length - 1 && value !== '') {
          newScripts.push('');
      }
      setBatchScripts(newScripts);
  };

  const handleOpenBatchModal = () => {
      if (generationType === 'image' && !activeProject.image) {
          addLog("错误: 图生视频模式下必须上传项目图片。", 'error');
          return;
      }
      setShowBatchModal(true);
  };

  const handleBatchAddToQueue = () => {
      if (batchMode === 'script') {
          const validScripts = batchScripts.filter(s => s.trim() !== '');
          if (validScripts.length === 0) return;
          validScripts.forEach((script) => {
              let finalPrompt = String(activeProject.prompt || '');
              if (finalPrompt.includes('这是台词文案')) {
                  finalPrompt = finalPrompt.replace('这是台词文案', script);
              } else {
                  finalPrompt = `${finalPrompt} ${script}`;
              }
              addToQueue(finalPrompt, script);
          });
      } else {
          const count = parseInt(repeatCount) || 1;
          for(let i=0; i<count; i++) {
              addToQueue(String(activeProject.prompt || ''), `重复任务 #${i + 1}`);
          }
      }
      setShowBatchModal(false);
      if (batchMode === 'script') setBatchScripts(['']);
  };
  
  const addToQueue = (prompt, scriptSnippet) => {
      const newTaskId = Date.now() + Math.random(); 
      const newTask = {
          id: newTaskId,
          projectName: activeProject.name,
          prompt: String(prompt),
          scriptSnippet: String(scriptSnippet), 
          status: 'PENDING',
          stage: '等待中',
          progress: 0,
          videoUrl: null,
          errorMessage: null,
          streamLog: '', 
          warning: null, 
          timestamp: new Date().toLocaleString(),
          modelUsed: modelName,
          image: activeProject.image,
          generationType: generationType, 
          videoStyle: videoStyle, // 保存当前选择的视频风格
          remixId: null, // Remix ID 或链接
      };
      setQueue(prev => [newTask, ...prev]);
  };

  // 从 videoUrl 中提取 Remix ID
  const extractRemixId = (videoUrl) => {
      if (!videoUrl) return null;
      const urlStr = String(videoUrl);
      // 检查是否是 sora.chatgpt.com 的链接（完整链接）
      const soraFullMatch = urlStr.match(/https?:\/\/sora\.chatgpt\.com\/p\/([^\s"']+)/);
      if (soraFullMatch) {
          return urlStr; // 返回完整链接
      }
      // 检查是否是 sora.chatgpt.com 的链接（相对路径）
      const soraMatch = urlStr.match(/sora\.chatgpt\.com\/p\/([^\s"']+)/);
      if (soraMatch) {
          return `https://${soraMatch[0]}`; // 返回完整链接
      }
      // 检查是否包含 Remix ID 格式 (s_xxxxx)
      const idMatch = urlStr.match(/s_[a-zA-Z0-9]+/);
      if (idMatch) {
          return `https://sora.chatgpt.com/p/${idMatch[0]}`;
      }
      return null;
  };

  // 打开 Remix 编辑对话框
  const handleOpenRemix = (task) => {
      const extractedId = extractRemixId(task.videoUrl);
      setRemixTask(task);
      setRemixId(extractedId || '');
      setRemixPrompt('');
      setShowRemixModal(true);
  };

  // 提交 Remix 任务
  const handleSubmitRemix = () => {
      if (!remixTask || !remixId.trim()) {
          addLog('错误: 请提供 Remix ID 或链接', 'error');
          return;
      }
      if (!remixPrompt.trim()) {
          addLog('错误: 请输入新的提示词', 'error');
          return;
      }

      // 组合 Remix ID 和新提示词
      const finalPrompt = `${remixId}${remixPrompt.trim()}`;
      
      // 创建新任务（使用 Remix）
      const newTaskId = Date.now() + Math.random();
      const newTask = {
          id: newTaskId,
          projectName: remixTask.projectName,
          prompt: finalPrompt,
          scriptSnippet: `Remix: ${remixTask.prompt}`,
          status: 'PENDING',
          stage: '等待中',
          progress: 0,
          videoUrl: null,
          errorMessage: null,
          streamLog: '',
          warning: null,
          timestamp: new Date().toLocaleString(),
          modelUsed: remixTask.modelUsed || modelName,
          image: null, // Remix 不需要图片
          generationType: 'remix', // 标记为 Remix 类型
          videoStyle: remixTask.videoStyle || videoStyle,
          remixId: remixId,
      };
      setQueue(prev => [newTask, ...prev]);
      addLog(`已创建 Remix 任务: ${remixPrompt}`, 'success');
      setShowRemixModal(false);
      setRemixTask(null);
      setRemixId('');
      setRemixPrompt('');
  };

  // 创建角色（仅创建角色，不生成视频）
  const handleCreateCharacter = async (task) => {
      if (!task.videoUrl) {
          addLog('错误: 任务没有视频 URL', 'error');
          return;
      }

      setCreatingCharacter(true);
      addLog(`开始创建角色: 正在下载视频...`, 'info');

      try {
          // 从 URL 下载视频并转换为 base64
          let videoBase64 = null;
          if (window.electronAPI && typeof window.electronAPI.downloadVideoToBase64 === 'function') {
              try {
                  videoBase64 = await window.electronAPI.downloadVideoToBase64(task.videoUrl);
                  addLog(`视频已下载并转换为 base64`, 'success');
              } catch (electronError) {
                  // 如果 Electron API 失败，回退到网页模式
                  addLog(`Electron API 失败，使用网页模式下载: ${electronError.message}`, 'warning');
                  const response = await fetch(task.videoUrl);
                  if (!response.ok) {
                      throw new Error(`下载失败: HTTP ${response.status}`);
                  }
                  const blob = await response.blob();
                  const reader = new FileReader();
                  videoBase64 = await new Promise((resolve, reject) => {
                      reader.onloadend = () => resolve(reader.result);
                      reader.onerror = reject;
                      reader.readAsDataURL(blob);
                  });
                  addLog(`视频已下载并转换为 base64 (网页模式)`, 'success');
              }
          } else {
              // 网页模式：使用 fetch 下载
              addLog(`使用网页模式下载视频...`, 'info');
              const response = await fetch(task.videoUrl);
              if (!response.ok) {
                  throw new Error(`下载失败: HTTP ${response.status}`);
              }
              const blob = await response.blob();
              const reader = new FileReader();
              videoBase64 = await new Promise((resolve, reject) => {
                  reader.onloadend = () => resolve(reader.result);
                  reader.onerror = reject;
                  reader.readAsDataURL(blob);
              });
              addLog(`视频已下载并转换为 base64`, 'success');
          }

          // 创建新任务（仅创建角色）
          const newTaskId = Date.now() + Math.random();
          const newTask = {
              id: newTaskId,
              projectName: task.projectName,
              prompt: '', // 创建角色不需要 prompt
              scriptSnippet: `创建角色: ${task.prompt || '从视频提取角色'}`,
              status: 'PENDING',
              stage: '等待中',
              progress: 0,
              videoUrl: null,
              errorMessage: null,
              streamLog: '',
              warning: null,
              timestamp: new Date().toLocaleString(),
              modelUsed: task.modelUsed || modelName,
              video: videoBase64, // 保存 base64 视频数据
              generationType: 'character', // 标记为角色创建类型
              videoStyle: task.videoStyle || videoStyle,
              characterName: null, // 角色名称（创建成功后填充）
              characterDisplayName: null, // 角色显示名称（创建成功后填充）
          };
          setQueue(prev => [newTask, ...prev]);
          addLog(`已创建角色任务: 将从视频中提取角色信息`, 'success');
      } catch (error) {
          addLog(`创建角色失败: ${error.message}`, 'error');
      } finally {
          setCreatingCharacter(false);
      }
  };

  // 处理右键菜单
  const handleContextMenu = (e, task) => {
      e.preventDefault();
      setSelectedTask(task);
      setShowTaskDetail(true);
      setContextMenu(null);
  };

  // 处理双击查看详情
  const handleTaskDoubleClick = (task) => {
      setSelectedTask(task);
      setShowTaskDetail(true);
  };

  // 打开模糊视频高清修复页面（在浏览器中打开）
  const handleOpenVideoEnhance = async () => {
      const url = 'https://www.runninghub.cn/ai-detail/1987914185591951362?inviteCode=me7mbc41';
      try {
          if (window.electronAPI && typeof window.electronAPI.openExternalUrl === 'function') {
              await window.electronAPI.openExternalUrl(url);
              addLog('已在浏览器中打开模糊视频高清修复页面', 'success');
          } else {
              // 网页模式：使用 window.open
              window.open(url, '_blank');
              addLog('已在浏览器中打开模糊视频高清修复页面', 'success');
          }
      } catch (error) {
          addLog(`打开页面失败: ${error.message}`, 'error');
      }
  };

  // 从模型名称提取时长信息
  const extractDuration = (modelName) => {
      if (!modelName) return '未知';
      const match = modelName.match(/(\d+)s/);
      return match ? `${match[1]}秒` : '未知';
  };

  // 从模型名称提取方向信息
  const extractOrientation = (modelName) => {
      if (!modelName) return '未知';
      if (modelName.includes('landscape')) return '横屏';
      if (modelName.includes('portrait')) return '竖屏';
      return '未知';
  };

  const addLog = (msg, type = 'info') => {
    const time = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { time, msg, type }]);
  };

  const updateTask = (id, updates) => {
      setQueue(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const handleDeleteTask = (taskId) => {
      setQueue(prev => prev.filter(t => t.id !== taskId));
      addLog(`任务 ${taskId} 已删除`, 'info');
  };

  const handleSelectOutputDirectory = async () => {
    if (window.electronAPI && typeof window.electronAPI.selectOutputDirectory === 'function') {
      try {
        const selectedPath = await window.electronAPI.selectOutputDirectory();
        if (selectedPath) {
          setConfig(prev => ({ ...prev, outputDirectory: selectedPath }));
          addLog(`输出目录已设置为: ${selectedPath}`, 'success');
        }
      } catch (error) {
        addLog(`选择输出目录失败: ${error.message}`, 'error');
      }
    } else {
      addLog("错误: 无法访问文件系统 (仅在 Electron 中可用)", 'error');
    }
  };

  const triggerDownload = async (url, taskId) => {
    const filename = `sora_task_${taskId}.mp4`;
    
    // 获取任务对应的项目名称
    const task = queue.find(t => t.id === taskId);
    const projectName = task?.projectName || activeProject?.name;
    
    // 获取项目文件夹路径
    let projectFolderPath = null;
    if (window.electronAPI && typeof window.electronAPI.getProjectFolderPath === 'function' && projectName) {
        try {
            projectFolderPath = await window.electronAPI.getProjectFolderPath(projectName, config.outputDirectory);
        } catch (error) {
            console.error('获取项目文件夹路径失败:', error);
        }
    }
    
    // 如果项目文件夹不存在，尝试创建
    if (projectFolderPath && window.electronAPI && typeof window.electronAPI.createProjectFolder === 'function') {
        try {
            const result = await window.electronAPI.createProjectFolder(projectName, config.outputDirectory);
            if (result.success) {
                projectFolderPath = result.path;
            }
        } catch (error) {
            console.error('创建项目文件夹失败:', error);
        }
    }
    
    // 使用项目文件夹路径或默认输出目录
    const finalOutputDir = projectFolderPath || config.outputDirectory;
    
    if (window.electronAPI && typeof window.electronAPI.downloadVideo === 'function') {
        window.electronAPI.downloadVideo(url, filename, finalOutputDir);
        const outputPath = finalOutputDir || '默认下载目录';
        addLog(`[任务 ${taskId}] 已触发下载到: ${outputPath}`, 'success');
    }
  };

  const processTask = async (taskId, taskPrompt, taskImage, taskType, taskStyle = '') => {
      updateTask(taskId, { status: 'GENERATING', stage: '初始化中', progress: 0 });
      let hasReceivedData = false;

      try {
          // 如果选择了风格，在提示词前面添加风格ID（格式：{风格ID}提示词）
          let finalPrompt = String(taskPrompt);
          if (taskStyle && taskStyle.trim()) {
              finalPrompt = `{${taskStyle}}${finalPrompt}`;
          }
          
          // 构建 content，根据 API 示例格式
          let content;
          if (taskType === 'character') {
              // 创建角色：content 是数组，只包含 video_url，没有 text
              // 根据 API 文档，仅创建角色时，只有视频，无 prompt
              if (!taskImage) { // 这里 taskImage 实际是 video base64
                  throw new Error('创建角色模式下必须提供视频');
              }
              content = [
                  {
                      type: "video_url",
                      video_url: {
                          url: String(taskImage) // base64 视频数据
                      }
                  }
              ];
          } else if (taskType === 'remix') {
              // Remix 功能：content 是字符串，包含 Remix ID/链接和新提示词
              // 根据 API 文档，提示词内包含 remix 分享链接或 id 即可
              content = finalPrompt;
          } else if (taskType === 'text') {
              // 文生视频：content 可以是字符串
              content = finalPrompt;
          } else {
              // 图生视频：content 必须是数组，包含 text 和 image_url
              if (!taskImage) {
                  throw new Error('图生视频模式下必须提供图片');
              }
              content = [
                  { 
                      type: "text", 
                      text: finalPrompt
                  }, 
                  { 
                      type: "image_url", 
                      image_url: { 
                          url: String(taskImage) 
                      } 
                  }
              ];
          }
          
          const payload = { 
              model: modelName, 
              messages: [{ role: "user", content: content }], 
              stream: true 
          };
          
          // 调试日志：记录请求 payload（不记录完整的 base64 图片）
          const debugPayload = JSON.parse(JSON.stringify(payload));
          if (taskType === 'image' && Array.isArray(debugPayload.messages[0].content)) {
              const imageUrl = debugPayload.messages[0].content[1].image_url.url;
              if (imageUrl.startsWith('data:image/')) {
                  debugPayload.messages[0].content[1].image_url.url = `data:image/...[base64数据已省略]`;
              }
          }
          addLog(`[任务 ${taskId}] 发送请求: ${JSON.stringify(debugPayload, null, 2)}`, 'info');
          
          const response = await fetch(config.baseUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${config.apiKey}` },
              body: JSON.stringify(payload)
          });
          if (!response.ok) {
              let errorMsg = `HTTP ${response.status}`;
              try { const errorText = await response.text(); if (errorText) errorMsg = errorText; } catch (e) { }
              throw new Error(errorMsg);
          }
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = ""; 
          let accumulatedContent = "";

          while (true) {
              const { done, value } = await reader.read();
              if (done) {
                  // 流结束时，如果是角色创建任务且还没有检测到角色名称，尝试最后检测一次
                  if (taskType === 'character' && accumulatedContent) {
                      const task = queue.find(t => t.id === taskId);
                      if (task && !task.characterName) {
                          // 尝试多种模式匹配角色名称
                          const patterns = [
                              { pattern: /角色创建成功[^，,]*[，,]?角色名[：:：]?(@?[\w_]+)/i, getNames: (m) => ({ name: m[1], display: m[1] }) },
                              { pattern: /角色已识别[：:：]?\s*([^(@]+?)\s*\((@?[\w_]+)\)/i, getNames: (m) => ({ name: m[2], display: m[1].trim() }) },
                              { pattern: /Character\s+(?:recognized|created)[：:：]?\s*([^(@]+?)\s*\((@?[\w_]+)\)/i, getNames: (m) => ({ name: m[2], display: m[1].trim() }) },
                              { pattern: /(?:角色名|角色|Character)[：:：]?\s*(@[\w_]+)/i, getNames: (m) => ({ name: m[1], display: m[1] }) },
                              { pattern: /(@[\w_]+)/, getNames: (m) => ({ name: m[1], display: m[1] }) }
                          ];
                          
                          let characterName = null;
                          let characterDisplayName = null;
                          
                          for (const { pattern, getNames } of patterns) {
                              const match = accumulatedContent.match(pattern);
                              if (match) {
                                  const names = getNames(match);
                                  characterName = names.name;
                                  characterDisplayName = names.display;
                                  break;
                              }
                          }
                          
                          if (characterName) {
                              updateTask(taskId, { 
                                  status: 'COMPLETED', 
                                  stage: '角色创建成功', 
                                  progress: 100,
                                  characterName: characterName,
                                  characterDisplayName: characterDisplayName || characterName
                              });
                              addLog(`[任务 ${taskId}] 角色创建成功: ${characterDisplayName || characterName} (${characterName})`, 'success');
                              
                              // 将角色添加到列表
                              const newCharacter = {
                                  id: Date.now() + Math.random(),
                                  name: characterName,
                                  videoUrl: task.video,
                                  videoName: null,
                                  model: task.modelUsed,
                                  prompt: task.prompt || null,
                                  createdAt: new Date().toLocaleString()
                              };
                              setCharacters(prev => {
                                  const exists = prev.some(c => c.name === characterName);
                                  if (exists) {
                                      return prev;
                                  }
                                  return [newCharacter, ...prev];
                              });
                          } else {
                              // 如果没有检测到角色名称，但流已结束，标记为完成（可能是API返回格式不同）
                              addLog(`[任务 ${taskId}] 角色创建任务完成，但未检测到角色名称格式。响应内容: ${accumulatedContent.substring(0, 200)}`, 'info');
                              updateTask(taskId, { 
                                  status: 'COMPLETED', 
                                  stage: '已完成', 
                                  progress: 100
                              });
                          }
                      }
                  }
                  break;
              }
              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split('\n');
              buffer = lines.pop(); 

              for (const line of lines) {
                  const trimmed = line.trim();
                  if (!trimmed || trimmed === 'data: [DONE]') continue;
                  if (trimmed.startsWith('data: ')) {
                      try {
                          const jsonStr = trimmed.replace('data: ', '');
                          const data = JSON.parse(jsonStr);
                          if (data.error) throw new Error(data.error.message || "API Error");
                          const delta = data.choices?.[0]?.delta;
                          const combinedChunk = (delta?.content || "") + (delta?.reasoning_content || "");
                          
                          if (combinedChunk) {
                              accumulatedContent += combinedChunk;
                              
                              // 对于角色创建任务，过滤掉英文日志信息
                              let displayContent = accumulatedContent;
                              if (taskType === 'character') {
                                  displayContent = accumulatedContent
                                      .replace(/Character Creation Begins[\s\S]*?Downloading video file\.\.\./gi, '')
                                      .replace(/Initializing character creation\.\.\./gi, '')
                                      .replace(/Downloading video file\.\.\./gi, '')
                                      .replace(/Character Creation Begins/gi, '')
                                      .trim();
                              }
                              
                              const updates = { streamLog: displayContent.length > 1000 ? '...' + displayContent.slice(-1000) : displayContent };

                              if (!hasReceivedData) {
                                  hasReceivedData = true;
                                  addLog(`[任务 ${taskId}] 开始接收数据流...`, 'info');
                                  updates.stage = taskType === 'character' ? '处理中' : '准备中';
                              }
                              
                              // --- 细分状态检测逻辑 ---
                              // 1. 违规检测
                              if (accumulatedContent.includes("Content Policy Violation") || accumulatedContent.includes("content_violation")) {
                                  throw new Error("检测到内容违规 (Policy Violation)");
                              }
                              // 2. 超时检测
                              if (accumulatedContent.includes("Generation timeout") || accumulatedContent.includes("timed out")) {
                                  throw new Error("生成超时 (Generation Timeout)");
                              }
                              // 3. 降级检测 (警告)
                              if (accumulatedContent.includes("Falling back to normal video")) {
                                  updates.warning = "去水印失败";
                              }
                              // 4. 去水印模式 (逻辑修正：移除 selection-tag)
                              if (accumulatedContent.includes("Watermark-free mode") || accumulatedContent.includes("Publishing video")) {
                                  updates.stage = '去水印中';
                                  updates.status = 'PROCESSING';
                              }
                              // 5. 缓存/同步中
                              if (accumulatedContent.includes("caching") || accumulatedContent.includes("Preparing final response")) {
                                  updates.stage = '同步中';
                                  updates.status = 'CACHING';
                              }
                              // 6. 图片心跳检测
                              if (accumulatedContent.includes("Image generation in progress")) {
                                  updates.stage = '图片生成中';
                              }
                              
                              // 7. 进度解析 (仅在普通渲染阶段更新)
                              const progressMatch = accumulatedContent.match(/Video Generation Progress\D*(\d+)%/gi);
                              if (progressMatch && !accumulatedContent.includes("Watermark-free mode")) {
                                  const lastMatch = progressMatch[progressMatch.length - 1];
                                  const pVal = parseInt(lastMatch.match(/\d+/)[0], 10);
                                  if (!isNaN(pVal)) {
                                      updates.progress = pVal;
                                      updates.stage = '生成中';
                                      updates.status = 'GENERATING';
                                  }
                              }

                              updateTask(taskId, updates);

                              // 检测角色创建成功（仅对角色创建任务）
                              if (taskType === 'character') {
                                  // 检测角色创建成功的标识（多种格式）
                                  // 格式1: "角色创建成功,角色名@dango_duo254"
                                  // 格式2: "角色已识别: Cheery Daytrip Duo (@dango_duo254)"
                                  // 格式3: "Character recognized: Name (@username)"
                                  // 格式4: "@username" 或 "角色名: @username"
                                  // 格式5: 任何包含 @ 符号的单词（可能是角色ID）
                                  const characterSuccessMatch = accumulatedContent.match(/角色创建成功[^，,]*[，,]?角色名[：:：]?(@?[\w_]+)/i);
                                  const characterRecognizedMatch = accumulatedContent.match(/角色已识别[：:：]?\s*([^(@]+?)\s*\((@?[\w_]+)\)/i);
                                  const characterRecognizedEnMatch = accumulatedContent.match(/Character\s+(?:recognized|created)[：:：]?\s*([^(@]+?)\s*\((@?[\w_]+)\)/i);
                                  const characterIdMatch = accumulatedContent.match(/(?:角色名|角色|Character)[：:：]?\s*(@[\w_]+)/i);
                                  const anyAtMatch = accumulatedContent.match(/(@[\w_]+)/);
                                  
                                  let characterName = null;
                                  let characterDisplayName = null;
                                  
                                  if (characterSuccessMatch) {
                                      characterName = characterSuccessMatch[1];
                                      characterDisplayName = characterName;
                                  } else if (characterRecognizedMatch) {
                                      characterDisplayName = characterRecognizedMatch[1].trim();
                                      characterName = characterRecognizedMatch[2];
                                  } else if (characterRecognizedEnMatch) {
                                      characterDisplayName = characterRecognizedEnMatch[1].trim();
                                      characterName = characterRecognizedEnMatch[2];
                                  } else if (characterIdMatch) {
                                      characterName = characterIdMatch[1];
                                      characterDisplayName = characterName;
                                  } else if (anyAtMatch && !taskPrompt) {
                                      // 仅创建角色时，如果找到 @ 开头的ID，可能是角色名
                                      characterName = anyAtMatch[1];
                                      characterDisplayName = characterName;
                                  }
                                  
                                  if (characterName) {
                                      updateTask(taskId, { 
                                          status: 'COMPLETED', 
                                          stage: '角色创建成功', 
                                          progress: 100,
                                          characterName: characterName,
                                          characterDisplayName: characterDisplayName || characterName
                                      });
                                      addLog(`[任务 ${taskId}] 角色创建成功: ${characterDisplayName || characterName} (${characterName})`, 'success');
                                      
                                      // 将角色添加到列表
                                      const task = queue.find(t => t.id === taskId);
                                      if (task) {
                                          const newCharacter = {
                                              id: Date.now() + Math.random(),
                                              name: characterName,
                                              videoUrl: task.video,
                                              videoName: null,
                                              model: task.modelUsed,
                                              prompt: task.prompt || null,
                                              createdAt: new Date().toLocaleString()
                                          };
                                          setCharacters(prev => {
                                              // 检查是否已存在相同名称的角色
                                              const exists = prev.some(c => c.name === characterName);
                                              if (exists) {
                                                  return prev;
                                              }
                                              return [newCharacter, ...prev];
                                          });
                                      }
                                  }
                                  
                                  // 检测视频URL（如果创建角色并生成视频）
                                  if (taskPrompt && taskPrompt.trim()) {
                                      const urlMatch = accumulatedContent.match(/(https?:\/\/[^\s)"]+\.(mp4|webm|mov))/i);
                                      if (urlMatch) {
                                          updateTask(taskId, {
                                              videoUrl: urlMatch[0]
                                          });
                                          
                                          // 更新角色列表中的生成视频URL
                                          const task = queue.find(t => t.id === taskId);
                                          if (task && characterName) {
                                              setCharacters(prev => prev.map(c => 
                                                  c.name === characterName 
                                                      ? { ...c, generatedVideoUrl: urlMatch[0] }
                                                      : c
                                              ));
                                          }
                                      }
                                  }
                              }

                              // 检测视频 URL（仅对非角色创建任务）
                              if (taskType !== 'character') {
                              const srcMatch = combinedChunk.match(/src=['"]([^'"]+?)['"]/);
                              const urlMatch = combinedChunk.match(/(https?:\/\/[^\s)"]+)/);
                              let foundUrl = srcMatch ? srcMatch[1] : (urlMatch && !combinedChunk.includes("<") ? urlMatch[0] : null);

                                  // 尝试从响应中提取 Remix ID（sora.chatgpt.com 链接）
                                  if (!foundUrl) {
                                      const remixMatch = combinedChunk.match(/sora\.chatgpt\.com\/p\/([^\s"']+)/);
                                      if (remixMatch) {
                                          foundUrl = `https://sora.chatgpt.com/p/${remixMatch[1]}`;
                                      }
                                  }

                              if (foundUrl) {
                                  updateTask(taskId, { status: 'COMPLETED', stage: '已完成', progress: 100, videoUrl: foundUrl });
                                  triggerDownload(foundUrl, taskId);
                                  }
                              }
                          }
                      } catch (e) {
                          if (e.message.includes("内容违规") || e.message.includes("超时")) throw e;
                      }
                  }
              }
          }
      } catch (err) {
          addLog(`[任务 ${taskId}] 异常: ${err.message}`, 'error');
          let finalStage = '错误';
          let errorMsg = err.message;
          
          // 处理网络连接错误
          if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError") || err.name === "TypeError") {
              finalStage = '连接失败';
              errorMsg = `无法连接到 API 服务器 (${config.baseUrl})。请检查：\n1. API 服务器是否正在运行\n2. API 地址是否正确\n3. 网络连接是否正常`;
          } else if (err.message.includes("Invalid model") || err.message.includes("invalid model")) {
              finalStage = '模型无效';
              errorMsg = `模型 "${modelName}" 不被 API 服务器支持。\n\n可能的原因：\n1. API 服务器版本不同，支持的模型列表不同\n2. 模型名称格式不正确\n3. 该模型需要特殊权限（如 Pro 订阅）\n\n建议：\n1. 检查 API 服务器日志，查看实际支持的模型列表\n2. 尝试使用其他模型（如 sora2-landscape-10s 或 sora2-portrait-10s）\n3. 确认 API 服务器配置是否正确`;
              addLog(`[任务 ${taskId}] 使用的模型: ${modelName}`, 'error');
              addLog(`[任务 ${taskId}] 请检查 API 服务器实际支持的模型列表`, 'error');
          } else if (err.message.includes("违规")) {
              finalStage = '内容违规';
          } else if (err.message.includes("超时")) {
              finalStage = '超时';
          }
          
          updateTask(taskId, { status: 'FAILED', stage: finalStage, progress: 0, errorMessage: errorMsg });
      }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-hidden relative">
      <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 z-10 shrink-0 shadow-sm">
          <div className="flex items-center gap-6">
              <h1 className="text-gray-900 font-bold text-lg tracking-wide flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div> Sora 视频生成
              </h1>
          </div>
          <div className="flex items-center gap-3">
              <button 
                  onClick={() => setShowCreateCharacter(true)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors"
                  title="角色库"
              >
                  <IconLayers size={14} />
                  角色库
              </button>
              <button 
                  onClick={() => setShowSoraWatermark(true)}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors"
                  title="打开 Sora 去水印页面"
              >
                  <IconVideo size={14} />
                  sora去水印
              </button>
              <button 
                  onClick={handleOpenVideoEnhance}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-md transition-colors"
                  title="打开模糊视频高清修复页面"
              >
                  <IconVideo size={14} />
                  模糊视频高清
              </button>
              <button onClick={() => setShowQueue(!showQueue)} className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${showQueue ? 'bg-gray-100 text-blue-600' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}><IconQueue size={14} /> 生产队列 <span className="text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded-full">{queue.length}</span></button>
              <button onClick={() => setShowDebug(!showDebug)} className={`flex items-center gap-2 px-3 py-1.5 text-xs font-mono rounded-md transition-colors ${showDebug ? 'bg-gray-100 text-green-600' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'}`}><IconTerminal size={14} /> 日志</button>
              <button onClick={() => setShowSettings(true)} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="设置"><IconSettings size={20} /></button>
          </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r border-gray-200 bg-gray-50 flex flex-col shrink-0">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-gray-700 font-bold tracking-wide flex items-center gap-2 text-sm uppercase">项目列表</h2>
                <button onClick={handleCreateProject} className="text-gray-500 hover:text-blue-600 transition-colors bg-white border border-gray-200 p-1 rounded shadow-sm hover:shadow"><IconPlus size={16} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {projects.map(proj => (
                    <div key={proj.id} onClick={() => setActiveProjectId(proj.id)} className={`group flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors border ${activeProjectId === proj.id ? 'bg-white border-gray-200 shadow-sm text-blue-600' : 'border-transparent text-gray-600 hover:bg-gray-100'}`}>
                        <IconFolder size={16} className={activeProjectId === proj.id ? 'text-blue-400' : 'text-gray-600'} />
                        {editingProjectId === proj.id ? (
                            <input autoFocus value={editName} onChange={(e) => setEditName(e.target.value)} onBlur={saveRename} onKeyDown={(e) => e.key === 'Enter' && saveRename()} className="bg-white border border-blue-500 rounded px-1 py-0.5 text-xs text-gray-900 w-full outline-none" />
                        ) : (
                            <span className="text-sm font-medium truncate flex-1">{String(proj.name || '')}</span>
                        )}
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={(e) => startRenaming(e, proj)} className="p-1 text-gray-400 hover:text-blue-600 hover:bg-white rounded"><IconEdit size={12} /></button>
                            <button onClick={(e) => handleDeleteProject(e, proj.id)} className="p-1 text-gray-400 hover:text-red-500 hover:bg-white rounded"><IconTrash size={12} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </aside>

        <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-white">
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
                <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">{String(activeProject?.name || '')}<span className="text-xs font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded">项目配置</span></h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 flex flex-col gap-6">
                            <div className="flex items-center gap-2 mb-2">
                                <button onClick={() => setGenerationType('image')} className={`px-3 py-1.5 text-sm font-medium rounded transition-colors flex items-center gap-2 border ${generationType === 'image' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}><IconImage size={16} /> 图生视频</button>
                                <button onClick={() => setGenerationType('text')} className={`px-3 py-1.5 text-sm font-medium rounded transition-colors flex items-center gap-2 border ${generationType === 'text' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}><IconType size={16} /> 文生视频</button>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex justify-between">总提示词 (Master Prompt)<span className="text-xs text-blue-600 normal-case bg-blue-50 px-2 py-0.5 rounded">使用 "这是台词文案" 作为占位符</span></label>
                                <textarea 
                                    value={String(activeProject?.prompt || '')} 
                                    onChange={(e) => {
                                        // 总是更新值，让输入框能正常显示
                                        updateActiveProject('prompt', e.target.value);
                                    }}
                                    onCompositionStart={(e) => {
                                        setIsComposing(true);
                                    }}
                                    onCompositionUpdate={(e) => {
                                        // 在组合输入期间也更新显示，以便看到拼音候选
                                        updateActiveProject('prompt', e.target.value);
                                    }}
                                    onCompositionEnd={(e) => {
                                        setIsComposing(false);
                                        // 组合输入结束时，确保最终的中文值正确
                                        updateActiveProject('prompt', e.target.value);
                                    }}
                                    onKeyDown={(e) => {
                                        // 如果组合输入异常结束（如按 ESC），重置状态
                                        if (isComposing && (e.key === 'Escape' || e.key === 'Enter')) {
                                            setIsComposing(false);
                                        }
                                    }}
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck="false"
                                    data-gramm="false"
                                    data-gramm_editor="false"
                                    data-enable-grammarly="false"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none min-h-[140px] font-mono text-sm leading-relaxed" 
                                    placeholder="例如：一个精美的咖啡杯，这是台词文案，4k分辨率..." 
                                />
                            </div>
                            {generationType === 'image' && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">项目图片</label>
                                    <div className="relative group">
                                        <input type="file" accept="image/*" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                        <div className={`h-40 rounded-lg border-2 border-dashed flex items-center justify-center transition-colors ${activeProject?.image ? 'border-blue-500/50 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}>
                                            {activeProject?.image ? (
                                                <div className="flex items-center gap-4">
                                                    <img src={String(activeProject.image)} alt="preview" className="h-32 rounded object-cover border border-gray-200 shadow-sm" />
                                                    <div className="text-left">
                                                        <div className="text-sm text-green-600 font-medium flex items-center gap-2"><IconCheck size={14} /> 已上传</div>
                                                        <div className="text-xs text-gray-500 mt-1 max-w-[200px] truncate">{String(activeProject.imageName || '')}</div>
                                                        <div className="text-xs text-blue-500 mt-1 cursor-pointer hover:underline">点击替换</div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-center text-gray-400"><IconPlus size={24} className="mx-auto mb-2 text-gray-300"/><span className="text-sm font-medium">点击上传项目图片</span></div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="lg:col-span-4 flex flex-col gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <div className="space-y-3">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">画面方向</label>
                                <select 
                                    value={orientation} 
                                    onChange={(e) => setOrientation(e.target.value)}
                                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                >
                                    <option value="landscape">横屏</option>
                                    <option value="portrait">竖屏</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">时长</label>
                                <select 
                                    value={duration} 
                                    onChange={(e) => setDuration(e.target.value)}
                                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                >
                                    <option value="10s">10秒</option>
                                    <option value="15s">15秒</option>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">当前模型</label>
                                <select 
                                    value={modelName} 
                                    onChange={(e) => {
                                        setModelName(e.target.value);
                                        // 从模型名称中提取方向和时长，更新对应的状态
                                        const model = e.target.value;
                                        if (model.includes('landscape')) {
                                            setOrientation('landscape');
                                        } else if (model.includes('portrait')) {
                                            setOrientation('portrait');
                                        }
                                        if (model.includes('-10s')) {
                                            setDuration('10s');
                                        } else if (model.includes('-15s')) {
                                            setDuration('15s');
                                        }
                                    }}
                                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                                >
                                    <optgroup label="标准版 - 横屏">
                                        <option value="sora2-landscape-10s">sora2-landscape-10s (10秒)</option>
                                        <option value="sora2-landscape-15s">sora2-landscape-15s (15秒)</option>
                                    </optgroup>
                                    <optgroup label="标准版 - 竖屏">
                                        <option value="sora2-portrait-10s">sora2-portrait-10s (10秒)</option>
                                        <option value="sora2-portrait-15s">sora2-portrait-15s (15秒)</option>
                                    </optgroup>
                                </select>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">视频风格</label>
                                <select 
                                    value={videoStyle} 
                                    onChange={(e) => setVideoStyle(e.target.value)}
                                    className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                >
                                    <option value="">无风格（默认）</option>
                                    <option value="festive">Festive（节日风格）</option>
                                    <option value="kakalaka">🪭👺（混沌风格）</option>
                                    <option value="news">News（新闻风格）</option>
                                    <option value="selfie">Selfie（自拍风格）</option>
                                    <option value="handheld">Handheld（手持风格）</option>
                                    <option value="golden">Golden（金色风格）</option>
                                    <option value="anime">Anime（动漫风格）</option>
                                    <option value="retro">Retro（复古风格）</option>
                                    <option value="nostalgic">Vintage（怀旧风格）</option>
                                    <option value="comic">Comic（漫画风格）</option>
                                </select>
                            </div>
                            <div className="flex-1"></div>
                            <div className="flex bg-gray-100 p-1 rounded-lg mb-2">
                                <button onClick={() => setBatchMode('script')} className={`flex-1 py-1.5 text-xs font-medium rounded-md flex items-center justify-center gap-1.5 transition-all ${batchMode === 'script' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><IconScript size={14} /> 台词模式</button>
                                <button onClick={() => setBatchMode('repeat')} className={`flex-1 py-1.5 text-xs font-medium rounded-md flex items-center justify-center gap-1.5 transition-all ${batchMode === 'repeat' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><IconRepeat size={14} /> 重复模式</button>
                            </div>
                            <button onClick={handleOpenBatchModal} className="w-full py-3.5 bg-blue-600 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-sm"><IconCopy size={18} />批量生成</button>
                        </div>
                    </div>
                </section>
            </div>
        </main>
      </div>

      {showBatchModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
              <div className="bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
                  <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white">
                      <div><h3 className="font-bold text-gray-900 text-lg">{batchMode === 'script' ? '批量文案录入' : '重复生成设置'}</h3><p className="text-xs text-gray-500 mt-1">{batchMode === 'script' ? '每一行将生成一个独立的视频任务。' : '将重复生成当前提示词。'}</p></div>
                      <button onClick={() => setShowBatchModal(false)} className="text-gray-400 hover:text-gray-900 transition-colors p-1 hover:bg-gray-100 rounded-full"><IconX size={20} /></button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-8 bg-gray-50 flex flex-col items-center justify-center">
                      {batchMode === 'script' ? (
                          <div className="w-full space-y-3">
                              {batchScripts.map((script, idx) => (
                                  <div key={idx} className="flex gap-3 items-center animate-in slide-in-from-left-2 duration-300"><span className="text-xs font-mono text-gray-400 w-6 text-right">{idx + 1}.</span><input 
                                      ref={idx === batchScripts.length - 1 ? batchInputRef : null} 
                                      type="text" 
                                      value={String(script)} 
                                      placeholder={idx === batchScripts.length - 1 ? "输入新台词文案..." : ""} 
                                      onChange={(e) => {
                                          // 总是更新值，让输入框能正常显示
                                          handleScriptChange(idx, e.target.value);
                                      }}
                                      onCompositionStart={() => {
                                          setIsBatchComposing(true);
                                      }}
                                      onCompositionUpdate={(e) => {
                                          // 在组合输入期间也更新显示，以便看到拼音候选
                                          handleScriptChange(idx, e.target.value);
                                      }}
                                      onCompositionEnd={(e) => {
                                          setIsBatchComposing(false);
                                          // 组合输入结束时，确保最终的中文值正确
                                          handleScriptChange(idx, e.target.value);
                                      }}
                                      onKeyDown={(e) => {
                                          // 如果组合输入异常结束（如按 ESC），重置状态
                                          if (isBatchComposing && (e.key === 'Escape' || e.key === 'Enter')) {
                                              setIsBatchComposing(false);
                                          }
                                      }}
                                      autoComplete="off"
                                      autoCorrect="off"
                                      autoCapitalize="off"
                                      spellCheck="false"
                                      data-gramm="false"
                                      data-gramm_editor="false"
                                      data-enable-grammarly="false"
                                      className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-500 transition-all shadow-sm" 
                                      autoFocus={idx === batchScripts.length - 1} 
                                  /></div>
                              ))}
                          </div>
                      ) : (
                          <div className="w-full max-w-sm space-y-6">
                              <div className="flex items-center justify-center gap-4"><button onClick={() => setRepeatCount(c => Math.max(1, c - 1))} className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm"><IconMinus size={20} /></button><div className="text-center"><input type="number" min="1" value={repeatCount} onChange={(e) => setRepeatCount(Math.max(1, parseInt(e.target.value) || 1))} className="text-5xl font-bold text-gray-800 bg-transparent w-32 text-center focus:outline-none" /><div className="text-xs text-gray-400 mt-1">次重复</div></div><button onClick={() => setRepeatCount(c => c + 1)} className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm"><IconPlus size={20} /></button></div>
                          </div>
                      )}
                  </div>
                  <div className="p-5 border-t border-gray-200 bg-white flex justify-end gap-3"><button onClick={() => setShowBatchModal(false)} className="px-5 py-2.5 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg">取消</button><button onClick={handleBatchAddToQueue} className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 shadow-sm">添加任务</button></div>
              </div>
          </div>
      )}

      {showDebug && (
          <div className="h-48 border-t border-gray-200 bg-white p-0 flex flex-col absolute bottom-0 left-0 right-0 z-20 shadow-2xl">
              <div className="flex border-b border-gray-200"><div className="px-4 py-2 text-xs font-bold text-gray-600 border-r border-gray-200 bg-gray-50">系统日志</div><div className="flex-1 bg-gray-50 flex justify-end"><button onClick={() => setShowDebug(false)} className="px-4 hover:bg-gray-200 text-gray-500"><IconX size={14} /></button></div></div>
              <div className="flex-1 flex overflow-hidden">
                  <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-1 bg-white">
                       {logs.map((log, i) => (<div key={i} className={`flex gap-2 ${log.type === 'error' ? 'text-red-600' : log.type === 'success' ? 'text-green-600' : 'text-gray-500'}`}><span className="opacity-50 select-none">[{String(log.time || '')}]</span><span>{String(log.msg || '')}</span></div>))}
                      <div ref={logsEndRef} />
                  </div>
                  <div className="w-1/3 p-4 overflow-y-auto bg-gray-50 border-l border-gray-200"><pre className="font-mono text-[10px] text-gray-600 whitespace-pre-wrap break-all">{String(curlPreview || '')}</pre></div>
              </div>
          </div>
      )}

      {showSettings && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
              <div className="bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-md p-6 space-y-6">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4"><h3 className="font-bold text-gray-900 text-lg">系统设置</h3><button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-gray-900"><IconX size={20}/></button></div>
                  <div className="space-y-4">
                      <div className="space-y-2"><label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2"><IconLink size={12}/> API 地址 (Endpoint)</label><input type="text" value={String(config.baseUrl || '')} onChange={(e) => setConfig({...config, baseUrl: e.target.value})} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 transition-all" /></div>
                      <div className="space-y-2"><label className="text-xs font-semibold text-gray-500 uppercase">API 密钥 (Key)</label><input type="password" value={String(config.apiKey || '')} onChange={(e) => setConfig({...config, apiKey: e.target.value})} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 transition-all" /></div>
                  </div>
                  <div className="pt-4 border-t border-gray-100 space-y-4">
                      <div className="space-y-2"><label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2"><IconLayers size={12}/> 并发控制</label><input type="number" min="1" value={config.maxConcurrent} onChange={(e) => setConfig({...config, maxConcurrent: Math.max(1, parseInt(e.target.value) || 1)})} className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500" /></div>
                      <div className="space-y-2"><label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2"><IconClock size={12}/> 提交间隔 (秒)</label><div className="flex items-center gap-3"><input type="number" min="0.1" step="0.1" value={config.taskInterval} onChange={(e) => setConfig({...config, taskInterval: Math.max(0.1, parseFloat(e.target.value) || 0.1)})} className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500" /><span className="text-xs text-gray-400 font-medium">S</span></div></div>
                      <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2"><IconFolder size={12}/> 输出目录</label>
                          <div className="flex items-center gap-2">
                              <input 
                                  type="text" 
                                  value={config.outputDirectory || '默认下载目录'} 
                                  readOnly
                                  className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-600 cursor-not-allowed" 
                                  placeholder="未选择，将使用默认下载目录"
                              />
                              <button 
                                  onClick={handleSelectOutputDirectory}
                                  className="px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                              >
                                  选择目录
                              </button>
                          </div>
                          {config.outputDirectory && (
                              <p className="text-xs text-gray-500 mt-1 truncate">当前: {config.outputDirectory}</p>
                          )}
                      </div>
                      <div className="space-y-2">
                          <label className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-2"><IconLink size={12}/> 阿里云 OSS 配置（可选）</label>
                          <input 
                              type="text" 
                              value={String(config.ossBucketDomain || '')} 
                              onChange={(e) => setConfig({...config, ossBucketDomain: e.target.value})} 
                              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 transition-all" 
                              placeholder="https://your-bucket.oss-cn-hangzhou.aliyuncs.com"
                          />
                          <p className="text-xs text-gray-400 mt-1">填写 OSS Bucket 域名，图生视频时将自动上传图片到 OSS</p>
                      </div>
                  </div>
                  <div className="flex justify-end pt-2"><button onClick={() => setShowSettings(false)} className="px-5 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 shadow-sm transition-all">保存并关闭</button></div>
              </div>
          </div>
      )}

      {/* 生产队列页面 */}
      {showQueue && (
          <div className="fixed inset-0 z-50 flex flex-col bg-white">
              <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 z-10 shrink-0 shadow-sm">
                  <div className="flex items-center gap-6">
                      <h1 className="text-gray-900 font-bold text-lg tracking-wide flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-600 rounded-full"></div> 生产队列
                      </h1>
                        <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded-full">{queue.length} 个任务</span>
                    </div>
                  <button onClick={() => setShowQueue(false)} className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" title="关闭"><IconX size={20} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm min-h-[200px]">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50">
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase w-32 tracking-wider">缩略图</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">详情 (项目与文案)</th>
                                        <th className="p-4 text-xs font-bold text-gray-500 uppercase w-48 tracking-wider">状态</th>
                                      <th className="p-4 text-xs font-bold text-gray-500 uppercase w-32 tracking-wider">操作</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {queue.map((task) => (
                                      <tr 
                                          key={task.id} 
                                          className="group hover:bg-gray-50 transition-colors cursor-pointer" 
                                          onContextMenu={(e) => handleContextMenu(e, task)}
                                          onDoubleClick={() => handleTaskDoubleClick(task)}
                                          title="双击或右键查看详情，或点击操作列的详情按钮"
                                      >
                                            <td className="p-4">
                                                <div className="w-24 h-14 bg-gray-100 rounded border border-gray-200 flex items-center justify-center overflow-hidden relative shadow-sm">
                                                    {task.status === 'COMPLETED' && task.videoUrl ? (
                                                        <video src={String(task.videoUrl)} className="w-full h-full object-cover" muted onMouseOver={e => e.target.play()} onMouseOut={e => e.target.pause()} />
                                                    ) : (
                                                        <div className="flex flex-col items-center gap-1">
                                                            {(task.status === 'GENERATING' || task.status === 'STARTING' || task.status === 'PROCESSING' || task.status === 'CACHING') && <IconLoader className="text-blue-500" />}
                                                            <span className="text-[10px] text-gray-500 font-bold">{String(task.stage || '')}</span>
                                                        </div>
                                                    )}
                                                    {(task.status === 'GENERATING' || task.status === 'STARTING') && (
                                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                                                            <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${task.progress}%` }}></div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4 cursor-pointer hover:bg-gray-100 transition-colors relative" onMouseEnter={(e) => setActiveTooltip({ taskId: task.id, type: 'prompt', rect: e.currentTarget.getBoundingClientRect(), title: '完整提示词' })} onMouseLeave={() => setActiveTooltip(null)} onClick={() => handleCopy(task.prompt)}>
                                                <div className="flex flex-col gap-1">
                                                    <div className="text-xs font-bold text-blue-600 uppercase bg-blue-50 w-fit px-1.5 py-0.5 rounded">{String(task.projectName || '')}</div>
                                                  <div className="text-sm text-gray-800 font-medium line-clamp-3 leading-relaxed" title="点击复制完整内容">
                                                      {task.generationType === 'character' && task.characterName ? (
                                                          <span className="text-green-700 font-semibold">角色: {task.characterDisplayName || task.characterName}</span>
                                                      ) : (
                                                          String(task.prompt || '')
                                                      )}
                                                  </div>
                                                    <div className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                                                      <span className={`px-1 py-0.5 rounded ${task.generationType === 'text' ? 'bg-orange-50 text-orange-600' : task.generationType === 'remix' ? 'bg-purple-50 text-purple-600' : task.generationType === 'character' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                                                          {task.generationType === 'text' ? '文生视频' : task.generationType === 'remix' ? 'Remix' : task.generationType === 'character' ? '创建角色' : '图生视频'}
                                                      </span>
                                                      {task.generationType === 'character' && task.characterName && (
                                                          <span className="text-green-600 font-medium">角色名: {task.characterName}</span>
                                                      )}
                                                        {task.scriptSnippet && !String(task.scriptSnippet).startsWith("重复任务") && <span className="truncate max-w-[200px]">台词: "{String(task.scriptSnippet)}"</span>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4"
                                                onMouseEnter={(e) => {
                                                    const rect = e.currentTarget.getBoundingClientRect();
                                                    if (task.status === 'FAILED' && task.errorMessage) setActiveTooltip({ taskId: task.id, type: 'error', rect, title: '错误详情' });
                                                    else if (task.status === 'GENERATING' || task.status === 'STARTING' || task.status === 'COMPLETED' || task.status === 'PROCESSING' || task.status === 'CACHING') setActiveTooltip({ taskId: task.id, type: 'log', rect, title: '实时响应' });
                                                }}
                                                onMouseLeave={() => setActiveTooltip(null)}
                                                onClick={() => { if (task.status === 'FAILED' && task.errorMessage) handleCopy(task.errorMessage); }}
                                                style={{ cursor: 'help' }}
                                            >
                                                <StatusBadge status={task.status} stage={task.stage} progress={task.progress} warning={task.warning} />
                                            </td>
                                          <td className="p-4">
                                              <div className="flex flex-col gap-2">
                                                  {/* 查看详情按钮（所有任务都显示） */}
                                                  <button
                                                      onClick={() => handleTaskDoubleClick(task)}
                                                      className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                                                      title="查看任务详情"
                                                  >
                                                      <IconInfo size={14} />
                                                      详情
                                                  </button>
                                                  {/* 编辑和创建角色按钮（仅已完成任务显示） */}
                                                  {task.status === 'COMPLETED' && task.videoUrl && (
                                                      <>
                                                          <button
                                                              onClick={() => handleOpenRemix(task)}
                                                              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
                                                              title="使用 Remix 功能基于此视频继续创作"
                                                          >
                                                              <IconEdit size={14} />
                                                              编辑
                                                          </button>
                                                          <button
                                                              onClick={() => handleCreateCharacter(task)}
                                                              disabled={creatingCharacter}
                                                              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                              title="从视频中提取角色信息（仅创建角色，不生成视频）"
                                                          >
                                                              {creatingCharacter ? (
                                                                  <>
                                                                      <IconLoader size={14} />
                                                                      创建中...
                                                                  </>
                                                              ) : (
                                                                  <>
                                                                      <IconLayers size={14} />
                                                                      创建角色
                                                                  </>
                                                              )}
                                                          </button>
                                                      </>
                                                  )}
                                                  {/* 删除按钮（所有任务都显示，但正在运行的任务需要确认） */}
                                                  <button
                                                      onClick={(e) => {
                                                          e.stopPropagation();
                                                          if (task.status === 'GENERATING' || task.status === 'STARTING' || task.status === 'PROCESSING' || task.status === 'CACHING' || task.status === 'PENDING') {
                                                              if (window.confirm(`任务正在运行中，确定要删除任务 "${task.projectName || task.id}" 吗？`)) {
                                                                  handleDeleteTask(task.id);
                                                              }
                                                          } else {
                                                              if (window.confirm(`确定要删除任务 "${task.projectName || task.id}" 吗？`)) {
                                                                  handleDeleteTask(task.id);
                                                              }
                                                          }
                                                      }}
                                                      className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
                                                      title="删除任务"
                                                  >
                                                      <IconTrash size={14} />
                                                      删除
                                                  </button>
                                              </div>
                                          </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
      </div>
      )}

      {/* Remix 编辑对话框 */}
      {showRemixModal && remixTask && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <IconEdit size={20} />
                          视频 Remix - 基于已有视频继续创作
                      </h2>
                      <button
                          onClick={() => {
                              setShowRemixModal(false);
                              setRemixTask(null);
                              setRemixId('');
                              setRemixPrompt('');
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                          <IconX size={20} />
                      </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                      <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                              <IconLink size={14} />
                              Remix ID 或链接
                          </label>
                          <input
                              type="text"
                              value={remixId}
                              onChange={(e) => setRemixId(e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 transition-all"
                              placeholder="https://sora.chatgpt.com/p/s_xxxxx 或 s_xxxxx"
                          />
                          <p className="text-xs text-gray-500">
                              系统已自动从视频 URL 中提取 Remix ID，您也可以手动输入或修改
                          </p>
                      </div>
                      <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                              <IconType size={14} />
                              新的提示词
                          </label>
                          <textarea
                              value={remixPrompt}
                              onChange={(e) => setRemixPrompt(e.target.value)}
                              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:border-blue-500 transition-all resize-none"
                              rows={4}
                              placeholder="例如：改成水墨画风格"
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="off"
                              spellCheck="false"
                              data-gramm="false"
                              data-gramm_editor="false"
                              data-enable-grammarly="false"
                          />
                          <p className="text-xs text-gray-500">
                              输入您想要对视频进行的修改描述，例如："改成水墨画风格"、"变成夜晚场景" 等
                          </p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <p className="text-xs text-blue-800 font-medium mb-2">提示：</p>
                          <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
                              <li>Remix 功能基于已有视频继续创作，可以修改视频的风格、场景等</li>
                              <li>提示词会直接追加到 Remix ID 后面，例如：<code className="bg-blue-100 px-1 rounded">https://sora.chatgpt.com/p/s_xxxxx改成水墨画风格</code></li>
                              <li>如果 Remix ID 为空，系统会尝试从原视频 URL 中提取</li>
                          </ul>
                      </div>
                  </div>
                  <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                      <button
                          onClick={() => {
                              setShowRemixModal(false);
                              setRemixTask(null);
                              setRemixId('');
                              setRemixPrompt('');
                          }}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                          取消
                      </button>
                      <button
                          onClick={handleSubmitRemix}
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                          <IconCheck size={16} />
                          创建 Remix 任务
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* 任务详情对话框 */}
      {showTaskDetail && selectedTask && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4" onClick={() => setShowTaskDetail(false)}>
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                      <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                          <IconInfo size={20} />
                          任务详情
                      </h2>
                      <button
                          onClick={() => {
                              setShowTaskDetail(false);
                              setSelectedTask(null);
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                          <IconX size={20} />
                      </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                      {/* 视频预览 */}
                      {selectedTask.videoUrl && (
                          <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                  <IconImage size={14} />
                                  视频预览
                              </label>
                              <div className="w-full bg-gray-100 rounded-lg border border-gray-200 overflow-hidden">
                                  <video 
                                      src={String(selectedTask.videoUrl)} 
                                      className="w-full h-auto max-h-96 object-contain" 
                                      controls
                                      muted
                                  />
                              </div>
                          </div>
                      )}

                      {/* 提示词 */}
                      <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                              <IconType size={14} />
                              提示词
                          </label>
                          <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 whitespace-pre-wrap break-words">
                              {selectedTask.prompt || selectedTask.scriptSnippet || '无'}
                          </div>
                      </div>

                      {/* 项目信息 */}
                      <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">项目名称</label>
                              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-800">
                                  {selectedTask.projectName || '未知'}
                              </div>
                          </div>
                          <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">任务类型</label>
                              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm">
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                      selectedTask.generationType === 'text' ? 'bg-orange-50 text-orange-600' : 
                                      selectedTask.generationType === 'remix' ? 'bg-purple-50 text-purple-600' : 
                                      selectedTask.generationType === 'character' ? 'bg-green-50 text-green-600' : 
                                      'bg-blue-50 text-blue-600'
                                  }`}>
                                      {selectedTask.generationType === 'text' ? '文生视频' : 
                                       selectedTask.generationType === 'remix' ? 'Remix' : 
                                       selectedTask.generationType === 'character' ? '创建角色' : 
                                       '图生视频'}
                                  </span>
                              </div>
                          </div>
                      </div>

                      {/* 模型和时长信息 */}
                      <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                  <IconLayers size={14} />
                                  模型
                              </label>
                              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-800">
                                  {selectedTask.modelUsed || '未知'}
                              </div>
                          </div>
                          <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                  <IconClock size={14} />
                                  时长
                              </label>
                              <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-800">
                                  {extractDuration(selectedTask.modelUsed)}
                              </div>
                          </div>
                      </div>

                      {/* 方向信息 */}
                      <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">画面方向</label>
                          <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-800">
                              {extractOrientation(selectedTask.modelUsed)}
                          </div>
                      </div>

                      {/* 视频链接 */}
                      {selectedTask.videoUrl && (
                          <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                  <IconLink size={14} />
                                  视频链接
                              </label>
                              <div className="flex gap-2">
                                  <input
                                      type="text"
                                      value={String(selectedTask.videoUrl)}
                                      readOnly
                                      className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-800 font-mono"
                                  />
                                  <button
                                      onClick={() => handleCopy(selectedTask.videoUrl)}
                                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-medium"
                                  >
                                      <IconCopy size={16} />
                                  </button>
                              </div>
                          </div>
                      )}

                      {/* 角色信息（如果是角色创建任务） */}
                      {selectedTask.generationType === 'character' && selectedTask.characterName && (
                          <div className="space-y-2">
                              <label className="text-sm font-semibold text-gray-700">角色信息</label>
                              <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm">
                                  <div className="text-green-800">
                                      <div className="font-medium">角色名称: {selectedTask.characterName}</div>
                                      {selectedTask.characterDisplayName && (
                                          <div className="text-gray-600 mt-1">显示名称: {selectedTask.characterDisplayName}</div>
                                      )}
                                  </div>
                              </div>
                          </div>
                      )}

                      {/* 状态信息 */}
                      <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">任务状态</label>
                          <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm">
                              <StatusBadge status={selectedTask.status} stage={selectedTask.stage} progress={selectedTask.progress} warning={selectedTask.warning} />
                          </div>
                      </div>

                      {/* 时间信息 */}
                      <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700">创建时间</label>
                          <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-800">
                              {selectedTask.timestamp || '未知'}
                          </div>
                      </div>
                  </div>
                  <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                      {selectedTask.videoUrl && (
                          <button
                              onClick={() => {
                                  triggerDownload(selectedTask.videoUrl, selectedTask.id);
                                  addLog(`开始下载视频: ${selectedTask.videoUrl}`, 'info');
                              }}
                              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                          >
                              <IconDownload size={16} />
                              下载视频
                          </button>
                      )}
                      <button
                          onClick={() => {
                              setShowTaskDetail(false);
                              setSelectedTask(null);
                          }}
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                          关闭
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* 角色库页面 */}
      {showCreateCharacter && (
          <div className="fixed inset-0 z-[70] flex flex-col bg-white">
              <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 z-10 shrink-0 shadow-sm">
                  <div className="flex items-center gap-6">
                      <h1 className="text-gray-900 font-bold text-lg tracking-wide flex items-center gap-2">
                          <IconLayers size={20} />
                          角色库
                      </h1>
                      {characters.length > 0 && (
                          <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-1 rounded-full">{characters.length} 个角色</span>
                      )}
                  </div>
                  <button 
                      onClick={() => setShowCreateCharacter(false)} 
                      className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" 
                      title="关闭"
                  >
                      <IconX size={20} />
                  </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                  <div className="max-w-6xl mx-auto">
                      {characters.length === 0 ? (
                          <div className="text-center py-16">
                              <IconLayers size={64} className="mx-auto text-gray-300 mb-4" />
                              <p className="text-gray-500 text-lg mb-2">暂无角色</p>
                              <p className="text-gray-400 text-sm">创建的角色将显示在这里</p>
                          </div>
                      ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                              {characters.map((character) => (
                                  <div key={character.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                      <div className="flex items-start justify-between mb-3">
                                          <div className="flex-1">
                                              <h4 className="font-semibold text-gray-900 text-base mb-1">{character.name}</h4>
                                              {character.characterDisplayName && character.characterDisplayName !== character.name && (
                                                  <p className="text-xs text-gray-500 mb-1">{character.characterDisplayName}</p>
                                              )}
                                              <p className="text-xs text-gray-400">{character.createdAt}</p>
                                          </div>
                                          <button
                                              onClick={() => {
                                                  if (window.confirm(`确定要删除角色 "${character.name}" 吗？`)) {
                                                      setCharacters(prev => prev.filter(c => c.id !== character.id));
                                                  }
                                              }}
                                              className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-colors"
                                              title="删除角色"
                                          >
                                              <IconTrash size={16} />
                                          </button>
                                      </div>
                                      <div className="text-xs text-gray-600 space-y-1.5">
                                          {character.model && (
                                              <div className="flex items-center gap-2">
                                                  <span className="text-gray-400">模型:</span>
                                                  <span className="font-mono text-gray-700">{character.model}</span>
                                              </div>
                                          )}
                                          {character.prompt && (
                                              <div>
                                                  <span className="text-gray-400">提示词:</span>
                                                  <p className="text-gray-700 mt-0.5 line-clamp-2">{character.prompt}</p>
                                              </div>
                                          )}
                                          {character.generatedVideoUrl && (
                                              <a
                                                  href={character.generatedVideoUrl}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                                              >
                                                  <IconLink size={12} />
                                                  查看生成的视频
                                              </a>
                                          )}
                                      </div>
                                  </div>
                              ))}
                          </div>
                      )}
                  </div>
              </div>
          </div>
      )}

      {/* 智能悬浮窗 */}
      {activeTooltip && (() => {
          const task = queue.find(t => t.id === activeTooltip.taskId);
          if (!task) return null;
          let rawContent = activeTooltip.type === 'prompt' ? task.prompt : (activeTooltip.type === 'error' ? task.errorMessage : (task.streamLog || '等待数据...'));
          let contentText = String(rawContent || '');
          let titleColor = activeTooltip.type === 'error' ? 'text-red-500' : (activeTooltip.type === 'log' ? 'text-green-600' : 'text-gray-500');
          let positionStyle = activeTooltip.rect.left > window.innerWidth / 2 ? { right: window.innerWidth - activeTooltip.rect.right, left: 'auto' } : { left: activeTooltip.rect.left, right: 'auto' };
          if (activeTooltip.rect.bottom > window.innerHeight - 300) positionStyle.bottom = window.innerHeight - activeTooltip.rect.top + 10;
          else positionStyle.top = activeTooltip.rect.bottom + 10;

          return (<div className="fixed z-50 bg-white border border-gray-200 text-gray-800 text-xs rounded-lg p-4 shadow-xl max-w-[400px] pointer-events-none animate-in fade-in duration-150" style={positionStyle}><div className={`font-bold mb-1 uppercase text-[10px] tracking-wider flex justify-between items-center ${titleColor}`}><span>{String(activeTooltip.title || '')}</span>{(activeTooltip.type === 'error' || activeTooltip.type === 'prompt') && <span className="text-[9px] opacity-70 font-normal">(点击复制)</span>}</div><div className={`font-mono whitespace-pre-wrap leading-relaxed border-l-2 pl-2 border-gray-200`}>{contentText}</div></div>);
      })()}

      {/* Sora 去水印页面 */}
      {showSoraWatermark && (
          <div className="fixed inset-0 z-[70] flex flex-col bg-white">
              <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 z-10 shrink-0 shadow-sm">
                  <div className="flex items-center gap-6">
                      <h1 className="text-gray-900 font-bold text-lg tracking-wide flex items-center gap-2">
                          <IconVideo size={20} />
                          Sora 去水印
                      </h1>
                  </div>
                  <button 
                      onClick={() => setShowSoraWatermark(false)} 
                      className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" 
                      title="关闭"
                  >
                      <IconX size={20} />
                  </button>
              </div>
              <div className="flex-1 overflow-hidden relative">
                  <iframe
                      src="https://sora2.email/"
                      className="w-full h-full border-0"
                      title="Sora 去水印"
                      allow="camera; microphone; fullscreen; autoplay; encrypted-media; geolocation"
                      sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
                      onLoad={() => {
                          setIframeError(false);
                      }}
                      onError={() => {
                          setIframeError(true);
                      }}
                  />
                  {/* 备用方案：如果 iframe 无法加载，显示提示 */}
                  {iframeError && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                          <div className="text-center p-6">
                              <p className="text-gray-600 mb-4">页面无法在程序内显示</p>
                              <button
                                  onClick={() => {
                                      const url = 'https://sora2.email/';
                                      if (window.electronAPI && typeof window.electronAPI.openExternalUrl === 'function') {
                                          window.electronAPI.openExternalUrl(url);
                                      } else {
                                          window.open(url, '_blank');
                                      }
                                  }}
                                  className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors border border-blue-200"
                              >
                                  <IconLink size={14} className="inline mr-2" />
                                  在浏览器中打开
                              </button>
                          </div>
                      </div>
                  )}
                  {/* 备用按钮：如果页面无法显示，可以点击在浏览器中打开 */}
                  <div className="absolute top-4 right-4 z-10">
                      <button
                          onClick={() => {
                              const url = 'https://sora2.email/';
                              if (window.electronAPI && typeof window.electronAPI.openExternalUrl === 'function') {
                                  window.electronAPI.openExternalUrl(url);
                              } else {
                                  window.open(url, '_blank');
                              }
                          }}
                          className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors border border-blue-200"
                          title="如果页面无法显示，点击在浏览器中打开"
                      >
                          <IconLink size={12} className="inline mr-1" />
                          在浏览器中打开
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* 模糊视频高清修复页面 */}
      {showVideoEnhance && (
          <div className="fixed inset-0 z-[70] flex flex-col bg-white">
              <div className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 z-10 shrink-0 shadow-sm">
                  <div className="flex items-center gap-6">
                      <h1 className="text-gray-900 font-bold text-lg tracking-wide flex items-center gap-2">
                          <IconVideo size={20} />
                          模糊视频高清修复
                      </h1>
                  </div>
                  <button 
                      onClick={() => setShowVideoEnhance(false)} 
                      className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors" 
                      title="关闭"
                  >
                      <IconX size={20} />
                  </button>
              </div>
              <div className="flex-1 overflow-hidden relative">
                  <iframe
                      src="https://www.runninghub.cn/ai-detail/1987914185591951362?inviteCode=me7mbc41"
                      className="w-full h-full border-0"
                      title="模糊视频高清修复"
                      allow="camera; microphone; fullscreen; autoplay; encrypted-media; geolocation"
                      sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
                      onLoad={() => {
                          setIframeError(false);
                      }}
                  />
                  {/* 备用方案：如果 iframe 无法加载，显示提示 */}
                  <div className="absolute top-4 right-4 z-10">
                      <button
                          onClick={() => {
                              const url = 'https://www.runninghub.cn/ai-detail/1987914185591951362?inviteCode=me7mbc41';
                              if (window.electronAPI && typeof window.electronAPI.openExternalUrl === 'function') {
                                  window.electronAPI.openExternalUrl(url);
                              } else {
                                  window.open(url, '_blank');
                              }
                          }}
                          className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors border border-blue-200"
                          title="如果页面无法显示，点击在浏览器中打开"
                      >
                          <IconLink size={12} className="inline mr-1" />
                          在浏览器中打开
                      </button>
                  </div>
              </div>
          </div>
      )}

      {toastVisible && <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg text-sm z-[60] animate-in fade-in zoom-in duration-200">已复制内容</div>}
    </div>
  );
}

const StatusBadge = ({ status, stage, progress, warning }) => {
    let styles = "bg-gray-100 text-gray-500 border-gray-200";
    let text = status;

    if (status === 'GENERATING' || status === 'STARTING') {
        return (
            <div className="flex flex-col gap-1 w-full max-w-[120px]">
                <div className="flex justify-between items-center text-[10px] text-blue-600 font-bold uppercase"><span>{String(stage || '')}</span><span>{String(progress || 0)}%</span></div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${progress}%` }} /></div>
            </div>
        );
    }

    if (status === 'PROCESSING') {
        styles = "bg-indigo-50 text-indigo-600 border-indigo-200 animate-pulse";
        text = stage || "去水印中";
    } else if (status === 'CACHING') {
        styles = "bg-purple-50 text-purple-600 border-purple-200 animate-pulse";
        text = stage || "同步中";
    } else if (status === 'COMPLETED') {
        if (warning) {
            styles = "bg-yellow-50 text-yellow-600 border-yellow-200";
            text = warning;
        } else {
            styles = "bg-green-50 text-green-600 border-green-200";
            text = "已完成";
        }
    } else if (status === 'FAILED') {
        if (stage === '内容违规') {
            styles = "bg-orange-50 text-orange-600 border-orange-200";
            text = "内容违规";
        } else if (stage === '超时') {
            styles = "bg-slate-50 text-slate-600 border-slate-200";
            text = "超时";
        } else {
            styles = "bg-red-50 text-red-600 border-red-200";
            text = "失败";
        }
    } else {
        text = status === 'PENDING' ? '等待中' : status;
    }

    return <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${styles}`}>{String(text)}</span>;
};