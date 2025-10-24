'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Key, 
  Lock, 
  Scan, 
  BookOpen, 
  X,
  Terminal,
  Play,
  Eye,
  Code,
  Server,
  Flame,
  Menu,
  Search,
  Shield,
  Bug,
  Brain,
  User,
  Globe,
  Fingerprint
} from 'lucide-react';

// --- Updated Tools Data ---
const TOOLS_DATA = [
  { 
    id: 'osint-suite', 
    icon: 'search', 
    name: 'PREMIER OSINT SUITE', 
    desc: 'Advanced Intelligence Engine', 
    price: '$50',
    details: 'Crafted by cybersecurity masters, this tool dives deep into public data for ethical pentesting with sharp PDF reports and IP insights.', 
    features: [
      'Advanced username/email/phone analysis',
      'Auto-PDF reports',
      'IP insights and geolocation tracking',
      'Secret AI boost capabilities'
    ],
    command: 'recon @username',
    output: 'Comprehensive reports delivered via Telegram',
    ip: '192.168.1.10', 
    port_scan: true 
  },
  { 
    id: 'phishing-toolkit', 
    icon: 'shield', 
    name: 'ADVANCED PHISHING TOOLKIT', 
    desc: 'Cyber Simulation Engine', 
    price: '$50',
    details: 'Developed by a team of cybersecurity masters, this cutting-edge tool crafts dynamic phishing pages with smart evasion tactics.', 
    features: [
      'Supports Facebook, Instagram, Gmail, Discord',
      'Geolocation tracking + instant alerts',
      'Bypasses basic email security',
      'Real-time credential capture'
    ],
    command: 'phish gmail',
    output: 'Credentials + IP/device information',
    ip: '10.0.0.55', 
    port_scan: false 
  },
  { 
    id: 'payload-builder', 
    icon: 'bug', 
    name: 'STEALTH PAYLOAD BUILDER', 
    desc: 'Advanced Malware Framework', 
    price: '$50',
    details: 'Engineered by cybersecurity masters, this advanced tool creates undetectable executables using cutting-edge obfuscation techniques.', 
    features: [
      'Custom APK/EXE payloads',
      'Built-in AV evasion (PyArmor, UPX)',
      'Background keylogging capability',
      'Multiple persistence mechanisms'
    ],
    command: 'build --android --keylogger',
    output: 'Clean executable file',
    ip: '203.0.113.12', 
    port_scan: true 
  },
  { 
    id: 'bug-bounty-suite', 
    icon: 'globe', 
    name: 'BUG BOUNTY PRO SUITE', 
    desc: 'Full Stack Vulnerability Scanner', 
    price: '$50',
    details: 'Crafted by cybersecurity visionaries, this groundbreaking tool unveils a never-before-seen approach to vulnerability scanning.', 
    features: [
      'Discovers subdomains, exposed APIs',
      'Generates exploit proof-of-concepts',
      'Includes Nuclei, HTTPX, Dalfox',
      'AI-assisted vulnerability analysis'
    ],
    command: 'bounty --target domain.com',
    output: 'Detailed vulnerability report',
    ip: '172.16.1.100', 
    port_scan: true 
  },
  { 
    id: 'ai-exploit-assistant', 
    icon: 'brain', 
    name: 'AI EXPLOIT ASSISTANT', 
    desc: 'Terminal Intelligence Bot', 
    price: '$50',
    details: 'Crafted by cybersecurity visionaries, this AI-powered tool introduces a whole new level of security mastery.', 
    features: [
      'Generates custom payloads and shells',
      'Explains attack methodologies',
      'No external API requirements',
      'Real-time exploit generation'
    ],
    command: 'aihelp',
    output: 'Code snippets with explanations',
    ip: '10.1.1.50', 
    port_scan: false 
  },
  { 
    id: 'anonymous-suite', 
    icon: 'fingerprint', 
    name: 'ANONYMOUS OPS SUITE', 
    desc: 'Privacy & Stealth Package', 
    price: '$50',
    details: 'Multi-layered anonymity solution for secure ethical operations with advanced privacy protection.', 
    features: [
      'VPN chaining with Tor integration',
      'Dynamic proxy rotation',
      'MAC address randomization',
      'Traffic obfuscation'
    ],
    command: 'anonstart',
    output: 'Secure anonymous session',
    ip: '192.168.100.1', 
    port_scan: false 
  }
];

const BLOG_PREVIEWS = [
  { title: 'Exploiting API Gateways with Rate Limit Bypass', date: 'Oct 23, 2025', category: 'Exploits' },
  { title: 'The Future of Zero-Trust: A 2026 Forecast', date: 'Oct 15, 2025', category: 'Strategy' },
  { title: 'Deep Dive: Cryptographic Flaws in WebAssembly', date: 'Oct 01, 2025', category: 'Analysis' },
];

const COMM_LOG_ENTRIES = [
  { type: 'SUCCESS', message: 'Operator 55C9 achieved Level 2 Access on Code Breaker.' },
  { type: 'WARNING', message: 'Target 10.1.5.8 reported minor integrity deviation. Reviewing.' },
  { type: 'INFO', message: 'New deployment: CRYPTEX 4.1 protocol layer initialized.' },
  { type: 'ALERT', message: 'PULSAR SCAN detected critical vulnerability on Global-Node-9.' },
  { type: 'SUCCESS', message: 'Operator E1F2 completed ShadowBreach full-suite simulation.' },
  { type: 'INFO', message: 'System throughput stable. Processing 1.2M packets/sec.' },
  { type: 'ALERT', message: 'Unauthorized connection attempt traced to IP 192.168.1.1 (Internal).' },
  { type: 'SUCCESS', message: 'Access Code high score set by Operator 4A9C (3.12s).' },
];

const TELEGRAM_BOT_USERNAME = 'shadowwolf_bot';
const TELEGRAM_URL = `https://t.me/${TELEGRAM_BOT_USERNAME}`;

// Icon component with Lucide icons
const Icon = ({ name, className = 'w-6 h-6' }: { name: string, className?: string }) => {
  const icons: Record<string, React.JSX.Element> = {
    key: <Key className={className} />,
    lock: <Lock className={className} />,
    scan: <Scan className={className} />,
    book: <BookOpen className={className} />,
    close: <X className={className} />,
    terminal: <Terminal className={className} />,
    play: <Play className={className} />,
    fire: <Flame className={className} />,
    eye: <Eye className={className} />,
    code: <Code className={className} />,
    server: <Server className={className} />,
    menu: <Menu className={className} />,
    search: <Search className={className} />,
    shield: <Shield className={className} />,
    bug: <Bug className={className} />,
    brain: <Brain className={className} />,
    user: <User className={className} />,
    globe: <Globe className={className} />,
    fingerprint: <Fingerprint className={className} />,
  };
  return icons[name] || <div className={className}></div>;
};

// Simplified, bold Logo
const WolfLogo = ({ className = 'w-40 h-32' }) => (
  <img
    src="/logo.png"
    alt="WolfGuider Logo"
    className={`drop-shadow-[0_0_10px_rgba(239,68,68,0.9)] ${className}`}
    style={{
      filter: 'drop-shadow(0 0 10px rgba(239,68,68,0.9))',
    }}
  />
);
// Mobile Menu Component
const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-64 bg-[#030005] border-l-2 border-red-700 shadow-2xl">
        <div className="p-4 border-b border-red-700/50">
          <div className="flex justify-between items-center">
            <span className="text-red-500 font-mono font-bold">MENU</span>
            <button onClick={onClose} className="text-red-300 hover:text-white">
              <Icon name="close" className="w-6 h-6" />
            </button>
          </div>
        </div>
        <nav className="p-4 space-y-4">
          <a href="#tools" className="block text-gray-300 hover:text-red-500 font-mono py-2" onClick={onClose}>TOOLS</a>
          <a href="#blog" className="block text-gray-300 hover:text-red-500 font-mono py-2" onClick={onClose}>INSIGHTS</a>
          <a href="#" className="block text-gray-300 hover:text-red-500 font-mono py-2" onClick={onClose}>PRICING</a>
          <button className="w-full bg-red-700 hover:bg-red-600 text-white font-mono py-2 px-4 rounded-lg transition-colors">
            ACCESS
          </button>
        </nav>
      </div>
    </div>
  );
};

// Tool Execution Modal
const ToolExecutionModal = ({ tool, onClose, telegramUrl }: { tool: any, onClose: () => void, telegramUrl: string }) => {
  if (!tool) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-md bg-black/90">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-xl bg-[#0c0018] border-2 sm:border-4 border-red-700 shadow-[0_0_30px_rgba(239,68,68,0.7)] rounded-lg sm:rounded-xl overflow-hidden transform transition-all duration-500 neon-border mx-2">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center p-3 sm:p-4 bg-red-900/40 border-b border-red-700">
          <h5 className="text-lg sm:text-xl font-mono text-red-300 font-bold uppercase tracking-wider flex items-center">
            <Icon name="fire" className="w-5 h-5 sm:w-6 sm:h-6 mr-2"/> {tool.name}
          </h5>
          <button onClick={onClose} className="text-red-300 hover:text-white transition-colors p-1 rounded-md hover:bg-red-800/50" aria-label="Close demo">
            <Icon name="close" className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6 font-mono">
          <p className="text-base sm:text-xl font-extrabold text-red-400 mb-4 sm:mb-6 neon-glow-text text-center sm:text-left">
            **System takeover is imminent.**
          </p>

          <div className="space-y-3 sm:space-y-4 text-sm">
            <div className="p-2 sm:p-3 bg-gray-900 rounded border border-gray-700">
              <span className="text-gray-500">TARGET IP: </span>
              <span className="text-green-400 font-bold">{tool.ip}</span>
            </div>

            <div className="p-2 sm:p-3 bg-gray-900 rounded border border-gray-700">
              <span className="text-gray-500">SCAN STATUS: </span>
              <span className={tool.port_scan ? "text-yellow-400 font-bold" : "text-gray-400"}>
                {tool.port_scan ? `Active Port Scanning initiated` : 'Static Protocol Deployment'}
              </span>
            </div>
          </div>

          <p className="text-gray-300 mt-4 sm:mt-6 text-sm sm:text-base text-center sm:text-left">
            Tool execution configured and running. Next stage requires interactive confirmation.
          </p>
        </div>

        {/* Modal Footer/CTA */}
        <div className="p-3 sm:p-4 bg-red-900/40 border-t border-red-700 flex justify-center sm:justify-end">
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base font-bold rounded-lg bg-red-600 hover:bg-red-500 transition-all shadow-lg shadow-red-900/50 neon-border flex items-center justify-center"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 8.25c0-.98-.67-1.81-1.63-1.98l-15.3-2.61c-1.12-.19-2.12.78-2.12 1.91v4.44c0 .87.57 1.63 1.39 1.88l1.41.43c.2.06.32.26.32.48v5.82c0 .91.95 1.54 1.81 1.25l2.45-.82c.42-.14.88-.06 1.25.21l1.72 1.21c.2.14.4.21.61.21.23 0 .44-.08.62-.25l7.19-7.25c.66-.67.66-1.76 0-2.43l-3.52-3.56c-.66-.67-1.74-.67-2.4 0l-1.34 1.35c-.13.13-.2.3-.2.48v2.96c0 .28-.23.51-.51.51h-2.17c-.28 0-.51-.23-.51-.51v-4.44c0-.26-.13-.51-.35-.65l-1.42-.88c-.28-.18-.62-.27-.96-.27h-2.1c-.28 0-.51-.23-.51-.51v-2.1c0-.28.23-.51.51-.51h2.1c.34 0 .68.09.96.27l1.42.88c.22.14.35.39.35.65v2.96c0 .28.23.51.51.51h2.17c.28 0 .51.23.51.51v-.44c0-.98.67-1.81 1.63-1.98l7.19-1.23c.95-.16 1.81.56 1.81 1.53z" />
            </svg>
            TELEGRAM BOT
          </a>
        </div>
      </div>
    </div>
  );
};

// Live Audit Feed Modal
const LiveAuditFeedModal = ({ isVisible, onClose }: { isVisible: boolean, onClose: () => void }) => {
  if (!isVisible) return null;

  const terminalRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState(0);

  const simulationScript = [
    { text: 'root@wolfguider-zenith:~# ./start_audit.sh --mode full-spectrum --target dept-net-01', type: 'command' },
    { text: '[INIT] Secure connection established with Global Node 14', type: 'info' },
    { text: '[NMAP] Starting Nmap 7.93 ( Ethical Security Audit )', type: 'info' },
    { text: '----------------------------------------', type: 'separator' },
    { text: 'SCANNING: SYN Stealth Scan on 192.168.1.0/24', type: 'info' },
    { text: 'Host 192.168.1.10 is UP (0.005s latency).', type: 'success' },
    { text: 'Host 192.168.1.15 is UP (0.008s latency).', type: 'success' },
    { text: '----------------------------------------', type: 'separator' },
    { text: 'PORT     STATE SERVICE  VULN LEVEL', type: 'header' },
    { text: '22/tcp   open  ssh      LOW', type: 'success' },
    { text: '80/tcp   open  http     CRITICAL', type: 'alert' },
    { text: '443/tcp  open  ssl/http CRITICAL', type: 'alert' },
    { text: '139/tcp  open  netbios  WARNING', type: 'warning' },
    { text: '----------------------------------------', type: 'separator' },
    { text: '[VULN] 2 Critical, 1 Warning found.', type: 'alert' },
    { text: 'root@wolfguider-zenith:~# AUDIT COMPLETE.', type: 'command' },
  ];

  const getLineStyle = (type: string) => {
    switch(type) {
      case 'command': return 'text-red-400 font-bold';
      case 'info': return 'text-gray-400';
      case 'success': return 'text-green-500';
      case 'alert': return 'text-red-600 font-bold';
      case 'warning': return 'text-yellow-500';
      case 'header': return 'text-red-500 font-bold border-b border-red-900/50 pb-1';
      case 'fail': return 'text-gray-600 italic';
      case 'separator': return 'text-gray-700';
      default: return 'text-white';
    }
  };

  const isSimulationComplete = visibleLines >= simulationScript.length;

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setVisibleLines(prev => {
        if (prev < simulationScript.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isVisible]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLines]);

  const handleShareSnapshot = () => {
    const shareText = "Just witnessed the Wolfguider Zenith Audit Feed. Threat Level: RED. #Wolfguider #CyberElite";
    navigator.clipboard.writeText(shareText).then(() => {
      console.log("System Snapshot copied to clipboard!");
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 backdrop-blur-md bg-black/90">
      <div className="w-full max-w-full sm:max-w-lg md:max-w-xl lg:max-w-3xl h-[80vh] sm:h-[85vh] bg-[#0c0018] border-2 sm:border-4 border-red-700 shadow-[0_0_30px_rgba(239,68,68,0.7)] rounded-lg sm:rounded-xl overflow-hidden transform transition-all duration-500 neon-border mx-2">

        {/* Window Header */}
        <div className="flex justify-between items-center p-3 bg-red-900/40 border-b border-red-700">
          <span className="text-xs sm:text-base font-mono text-red-100 font-bold flex items-center tracking-wider">
            <span className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full mr-2 shadow-[0_0_8px_red] animate-pulse"></span>
            LIVE AUDIT FEED
          </span>
          <button onClick={onClose} className="text-red-300 hover:text-white transition-colors p-1 rounded-md hover:bg-red-800/50" aria-label="Close demo">
            <Icon name="close" className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="p-3 sm:p-4 md:p-6 h-[calc(100%-100px)] bg-black/90 font-mono text-xs sm:text-sm md:text-base overflow-y-auto leading-relaxed tracking-tight terminal-scroll"
        >
          {simulationScript.slice(0, visibleLines).map((line, index) => (
            <p key={index} className={`${getLineStyle(line.type)} py-0.5 break-words`}>
              {line.text}
            </p>
          ))}
        </div>

        {/* Footer Status and Button */}
        <div className="p-3 sm:p-4 bg-red-900/40 border-t border-red-700 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs sm:text-sm font-mono text-gray-300">
            {isSimulationComplete ?
              <span className="text-green-400 font-bold flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 shadow-[0_0_5px_green]"></span>AUDIT READY
              </span> :
              <span className="text-yellow-400 font-bold flex items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-ping"></span>PROCESSING...
              </span>
            }
          </p>
          <button
            onClick={handleShareSnapshot}
            disabled={!isSimulationComplete}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all shadow-md w-full sm:w-auto ${
              isSimulationComplete
                ? 'bg-red-600 hover:bg-red-500 shadow-red-900/70 border border-red-700'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
            }`}
          >
            CAPTURE & SHARE
          </button>
        </div>
      </div>
    </div>
  );
};

// Access Code Breaker Mini-Game - Mobile Optimized
const AccessCodeBreaker = ({ setAccessGranted }: { setAccessGranted: (value: boolean) => void }) => {
  const [isActive, setIsActive] = useState(false);
  const [code, setCode] = useState(['-', '-', '-', '-']);
  const [input, setInput] = useState<string[]>([]);
  const [status, setStatus] = useState('INIT');
  const [startTime, setStartTime] = useState<number | null>(null);
  const initialBestTime = typeof window !== 'undefined' ? localStorage.getItem('wg_best_time') || Infinity : Infinity;
  const [bestTime, setBestTime] = useState(typeof initialBestTime === 'string' && initialBestTime !== 'Infinity' ? parseFloat(initialBestTime) : Infinity);
  const challengeDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const startChallenge = () => {
    const newCode = Array(4).fill(0).map(() => challengeDigits[Math.floor(Math.random() * challengeDigits.length)].toString());
    setCode(newCode);
    setInput([]);
    setStatus('ACTIVE');
    setStartTime(Date.now());
    setIsActive(true);
    setAccessGranted(false);
  };

  const handleInput = (digit: string) => {
    if (status !== 'ACTIVE') return;

    const newLength = input.length + 1;
    const newInput = [...input, digit.toString()];

    setInput(newInput);

    if (newInput[newLength - 1] !== code[newLength - 1]) {
      setStatus('FAIL');
      setIsActive(false);
      setTimeout(() => setStatus('INIT'), 1500);
      return;
    }

    if (newLength === 4 && startTime) {
      const endTime = Date.now();
      const timeTaken = ((endTime - startTime) / 1000).toFixed(2);

      setStatus('WIN');
      setIsActive(false);
      setAccessGranted(true);

      if (parseFloat(timeTaken) < bestTime || bestTime === Infinity) {
        setBestTime(parseFloat(timeTaken));
        if (typeof window !== 'undefined') {
          localStorage.setItem('wg_best_time', timeTaken);
        }
      }
      setTimeout(() => setStatus('INIT'), 3000);
    }
  };

  const displayedCode = code.map((c, i) => {
    if (status === 'INIT') return '-';
    if (status === 'WIN') return c;
    if (status === 'FAIL') return 'X';
    return input[i] || '_';
  });

  const getStatusStyle = () => {
    switch(status) {
      case 'WIN': return 'bg-green-900 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.7)]';
      case 'FAIL': return 'bg-red-900 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.7)]';
      case 'ACTIVE': return 'bg-yellow-900/50 border-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)] animate-pulse';
      default: return 'bg-gray-900/80 border-red-700 shadow-red-900/50';
    }
  };

  return (
    <div className={`fixed top-16 sm:top-20 right-2 sm:right-4 z-40 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-300 ${getStatusStyle()} border shadow-lg sm:shadow-xl`}>
      {/* Display / Trigger */}
      <button
        onClick={status === 'ACTIVE' ? () => {} : startChallenge}
        className="font-mono text-lg sm:text-xl font-bold w-28 sm:w-36 tracking-wider flex items-center justify-center text-white"
        title={status === 'ACTIVE' ? "Sequence Active" : "Click to Initiate Code Sequence"}
      >
        {status === 'WIN' ?
          <span className="flex items-center text-xs sm:text-sm text-green-400"><Icon name="eye" className="w-4 h-4 sm:w-5 sm:h-5 mr-1" /> ACCESS</span>
          : `[${displayedCode.join('')}]`}
      </button>

      {/* Keypad and Status */}
      {isActive && status === 'ACTIVE' && (
        <div className="mt-2 sm:mt-3 p-2 bg-gray-950/90 rounded border border-red-900/50">
          <p className="font-mono text-red-400 text-xs mb-2 text-center">SEQ: {code.join('')}</p>
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(digit => (
              <button
                key={digit}
                onClick={() => handleInput(digit.toString())}
                className="font-mono text-sm sm:text-lg h-8 sm:h-10 bg-gray-800 text-red-400 hover:bg-red-700 hover:text-white rounded transition-colors border border-gray-700"
              >
                {digit}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Status Messages */}
      <div className="text-center mt-1 sm:mt-2 text-xs font-mono">
        {status === 'WIN' && startTime && <span className="text-white">TIME: {((Date.now() - startTime) / 1000).toFixed(2)}s</span>}
        {status === 'FAIL' && <span className="text-white">FAILED</span>}
        {status === 'INIT' && bestTime !== Infinity && <span className="text-gray-300">BEST: {bestTime}s</span>}
      </div>
    </div>
  );
};

// Dynamic Threat Map
const DynamicThreatMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mapData = useRef<{ x1: number; y1: number; x2: number; y2: number; }[]>([]);

  const draw = useCallback((ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw Simulated Map Grid
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.05)';
    ctx.lineWidth = 0.5;
    const gridSize = window.innerWidth < 640 ? 40 : 60;
    
    for (let x = 0; x < ctx.canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, ctx.canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < ctx.canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(ctx.canvas.width, y);
      ctx.stroke();
    }

    // Draw Simulated Data Routes
    mapData.current.forEach(route => {
      const progress = (frameCount * 0.005) % 1;

      // Faint background line
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(route.x1, route.y1);
      ctx.lineTo(route.x2, route.y2);
      ctx.stroke();

      // Animated glowing ping
      const currentX = route.x1 + (route.x2 - route.x1) * progress;
      const currentY = route.y1 + (route.y2 - route.y1) * progress;

      ctx.shadowBlur = 10;
      ctx.shadowColor = 'red';
      ctx.fillStyle = 'rgba(255, 255, 255, 1)';
      ctx.beginPath();
      ctx.arc(currentX, currentY, 3, 0, 2 * Math.PI);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

      mapData.current = Array(window.innerWidth < 640 ? 6 : 10).fill(0).map(() => ({
        x1: Math.random() * canvas.width,
        y1: Math.random() * canvas.height,
        x2: Math.random() * canvas.width,
        y2: Math.random() * canvas.height,
      }));
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const render = (frameCount: number) => {
      draw(ctx, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render(0);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [draw]);

  return (
    <div className="absolute inset-0 overflow-hidden opacity-20 sm:opacity-30 z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
};

// Real-time Comm Log - Mobile Optimized
const OperatorCommLog = () => {
  const [currentLog, setCurrentLog] = useState(COMM_LOG_ENTRIES.slice(0, 4));
  const logRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      logRef.current = (logRef.current + 1) % COMM_LOG_ENTRIES.length;
      const nextEntry = COMM_LOG_ENTRIES[logRef.current];

      setCurrentLog(prev => {
        const newLog = [...prev.slice(-3), nextEntry];
        return newLog;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getLogStyle = (type: string) => {
    switch(type) {
      case 'SUCCESS': return 'text-green-400';
      case 'WARNING': return 'text-yellow-400';
      case 'ALERT': return 'text-red-500 font-bold';
      case 'INFO': return 'text-gray-400';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="p-3 sm:p-4 bg-[#0c0018] rounded-lg sm:rounded-xl border border-red-700/50 shadow-lg sm:shadow-2xl shadow-red-900/30 h-48 sm:h-64 md:h-80 flex flex-col font-mono text-xs terminal-scroll">
      <h4 className="text-red-400 font-bold border-b border-red-800 pb-1 sm:pb-2 mb-1 sm:mb-2 uppercase tracking-wider flex items-center text-sm sm:text-base">
        <Icon name="code" className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-red-500"/> COMM LOGS
      </h4>
      <div className="flex-1 overflow-y-auto space-y-1 sm:space-y-2">
        {currentLog.map((entry, index) => (
          <p key={index} className={`${getLogStyle(entry.type)} transition-opacity duration-1000 text-xs sm:text-sm`}>
            <span className="text-red-600">[{entry.type.substring(0, 3)}]</span> <span className="text-gray-600">{new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})}</span> {entry.message.substring(0, 40)}{entry.message.length > 40 ? '...' : ''}
          </p>
        ))}
      </div>
    </div>
  );
};

// System Status Panel - Mobile Optimized
const SystemStatusPanel = () => {
  return (
    <div className="p-4 sm:p-6 bg-[#0c0018] rounded-lg sm:rounded-xl border border-red-700/50 shadow-lg sm:shadow-2xl shadow-red-900/30 flex flex-col items-center text-center neon-border h-48 sm:h-64 md:h-80">
      <h4 className="text-lg sm:text-xl font-bold text-red-400 mb-2 sm:mb-4 font-mono tracking-wider uppercase border-b border-red-700/50 pb-1 sm:pb-2 w-full text-sm sm:text-base">
        SYSTEM STATUS
      </h4>
      <div className="flex-1 flex flex-col justify-center items-center">
        <Icon name="server" className="w-12 h-12 sm:w-16 sm:h-16 text-red-500 animate-pulse mb-2 sm:mb-4" />
        <p className="text-sm sm:text-lg text-gray-300 font-mono mb-1 sm:mb-2">
          NETWORK: <span className="text-green-400">99.9%</span>
        </p>
        <p className="text-xs sm:text-sm text-gray-500">
          NODE: <span className="text-red-300">ZG-A1</span>
        </p>
        <p className="text-xs text-gray-700 mt-1 sm:mt-2">
          ENCRYPTED (AES-256)
        </p>
      </div>
    </div>
  );
};

// Footer Component - Mobile Optimized
const Footer = ({ userId }: { userId: string | null }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [threatLevel, setThreatLevel] = useState('GREEN');

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const threatInterval = setInterval(() => {
      setThreatLevel(prev => {
        switch(prev) {
          case 'GREEN': return 'YELLOW';
          case 'YELLOW': return 'RED';
          case 'RED': return 'GREEN';
          default: return 'GREEN';
        }
      });
    }, 10000);

    return () => {
      clearInterval(clockInterval);
      clearInterval(threatInterval);
    };
  }, []);

  const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
  const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };

  const timeString = currentTime.toLocaleTimeString('en-US', timeOptions);
  const dateString = currentTime.toLocaleDateString('en-US', dateOptions);

  const getThreatStyle = () => {
    switch(threatLevel) {
      case 'GREEN': return 'text-green-400 border-green-700/50 bg-green-900/20';
      case 'YELLOW': return 'text-yellow-400 border-yellow-700/50 bg-yellow-900/20 animate-pulse';
      case 'RED': return 'text-red-400 border-red-700/50 bg-red-900/30 shadow-[0_0_10px_rgba(239,68,68,0.7)] animate-pulse';
      default: return 'text-gray-500 border-gray-700/50 bg-gray-900/20';
    }
  };

  return (
    <footer className="w-full p-2 sm:p-3 text-xs font-mono bg-[#030005] border-t border-red-900/50 shadow-inner shadow-black/50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-0">
        {/* System ID */}
        <div className="order-3 sm:order-1 text-gray-700 text-center sm:text-left">
          ID: <span className="text-gray-500">{userId ? userId.substring(0, 8) + '...' : 'Loading...'}</span>
        </div>

        {/* System Status Panel */}
        <div className={`order-2 text-center p-1 rounded border ${getThreatStyle()} transition-all duration-1000 tracking-wider text-xs`}>
          <span className="font-bold">STATUS: OPERATIONAL</span>
          <span className="mx-1">|</span>
          <span className="font-bold">THREAT:
            <span className={`ml-1 ${threatLevel === 'GREEN' ? 'text-green-400' : threatLevel === 'YELLOW' ? 'text-yellow-400' : 'text-red-400'}`}> {threatLevel}</span>
          </span>
        </div>

        {/* Live Clock */}
        <div className="order-1 sm:order-3 text-gray-700 text-center sm:text-right">
          <span className="text-red-400 font-bold">{timeString}</span>
          <span className="mx-1 hidden sm:inline">|</span>
          <span className="hidden sm:inline">{dateString}</span>
        </div>
      </div>
    </footer>
  );
};

// Tool Card Component with Circular Indicators
const ToolCard = ({ tool, onExecute }: { tool: any, onExecute: (tool: any) => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="tool-card p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-xl border border-gray-800 shadow-lg sm:shadow-2xl shadow-black/70 transition-all duration-500 ease-out hover:border-red-600 hover:shadow-red-900/70 relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Circular Status Indicator */}
      <div className="absolute top-4 right-4 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${tool.port_scan ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'} shadow-lg`}></div>
        <span className="text-xs font-mono text-gray-400">{tool.port_scan ? 'ACTIVE' : 'READY'}</span>
      </div>

      {/* Price Circle */}
      <div className="absolute -top-3 -right-3 w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform rotate-12 shadow-lg shadow-red-900/50">
        <span className="text-white font-bold text-sm">{tool.price}</span>
      </div>

      <div className="flex items-start mb-4 sm:mb-6 border-b border-red-900/50 pb-3 sm:pb-4">
        <div className="p-2 sm:p-3 bg-red-900/30 rounded-full text-red-500 mr-3 sm:mr-4 border border-red-800 transition-all duration-500 group-hover:bg-red-900/50 group-hover:scale-110 shadow-[0_0_10px_rgba(239,68,68,0.5)]">
          <Icon name={tool.icon} className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-1">
          <h4 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wider text-red-400 mt-1 cursor-pointer hover:text-red-300 transition-colors font-mono">
            {tool.name}
          </h4>
          <p className="text-xs sm:text-sm text-gray-400 font-inter mt-1">{tool.desc}</p>
        </div>
      </div>

      <p className="text-gray-300 text-sm sm:text-base mt-3 sm:mt-4 mb-4 sm:mb-6 font-inter leading-relaxed">{tool.details}</p>

      {/* Features with Circular Bullets */}
      <div className="space-y-2 mb-4 sm:mb-6">
        {tool.features.map((feature: string, index: number) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
            <span className="text-xs sm:text-sm text-gray-400 font-mono">▸ {feature}</span>
          </div>
        ))}
      </div>

      {/* Command and Output */}
      <div className="bg-black/50 p-3 rounded-lg border border-gray-700 mb-4 font-mono">
        <div className="text-green-400 text-sm">$ {tool.command}</div>
        <div className="text-gray-500 text-xs mt-1">OUTPUT: {tool.output}</div>
      </div>

      <button
        onClick={() => onExecute(tool)}
        className="flex items-center justify-center w-full py-3 bg-red-700 hover:bg-red-600 text-white font-bold rounded-lg transition-all duration-500 transform hover:scale-[1.02] shadow-lg shadow-red-900/50 border border-red-600 font-mono text-sm sm:text-base"
      >
        <Icon name="play" className="w-4 h-4 mr-2" />
        EXECUTE TOOL
      </button>
    </div>
  );
};

// Main Application Component
const WolfGuider = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [activeTool, setActiveTool] = useState<typeof TOOLS_DATA[0] | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isAccessGranted, setAccessGranted] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAccessClick = () => {
    window.open(TELEGRAM_URL, '_blank');
  };

  // Timer Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideoModal(true);
    }, 120000);

    const timeTracker = setInterval(() => {
      setTimeElapsed(prev => {
        if (prev >= 120) {
          clearInterval(timeTracker);
          return 120;
        }
        return prev + 1;
      });
    }, 1000);

    setUserId(crypto.randomUUID ? crypto.randomUUID() : `user-${Date.now()}`);

    return () => {
      clearTimeout(timer);
      clearInterval(timeTracker);
    };
  }, []);

  // Calculate status for indicator
  const remainingTime = 120 - timeElapsed;
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const statusColor = remainingTime > 30 ? 'text-green-400' : 'text-yellow-400';
  const statusText = remainingTime > 0 ? (remainingTime > 30 ? 'STANDBY' : 'INITIATING...') : 'ACTIVE';

  return (
    <div className="min-h-screen bg-[#030005] font-inter text-white overflow-x-hidden relative">
      {/* Custom Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Space+Mono:wght@400;700&display=swap');
        
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; }

        /* HD/Neon Glow Effects */
        .neon-glow-text {
          text-shadow: 0 0 5px rgba(252, 165, 165, 0.4), 0 0 15px rgba(239, 68, 68, 0.8);
        }

        .neon-border {
          border: 1px solid rgba(239, 68, 68, 0.6);
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.3), inset 0 0 5px rgba(239, 68, 68, 0.1);
          transition: all 0.3s ease-in-out;
        }
        @media (min-width: 640px) {
          .neon-border {
            border: 2px solid rgba(239, 68, 68, 0.6);
          }
        }
        .neon-border:hover {
          border-color: #f87171;
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.6), inset 0 0 10px rgba(239, 68, 68, 0.2);
        }

        /* Glitch effect for the main title */
        .glitch-text {
          animation: glitch 1.5s linear infinite alternate;
        }

        @keyframes glitch {
          0% { transform: translate(0); text-shadow: 2px 2px #dc2626, -2px -2px #0f172a; }
          25% { transform: translate(-2px, 2px); text-shadow: -2px 2px #dc2626, 2px -2px #0f172a; }
          50% { transform: translate(2px, -2px); text-shadow: 2px -2px #dc2626, -2px 2px #0f172a; }
          75% { transform: translate(-2px, -2px); text-shadow: -2px -2px #dc2626, 2px 2px #0f172a; }
          100% { transform: translate(2px, 2px); text-shadow: 2px 2px #dc2626, -2px -2px #0f172a; }
        }

        /* Grid Background for Hero Section */
        .hero-background {
          background: linear-gradient(180deg, #030005 0%, #0c0018 100%);
          border-bottom: 1px solid rgba(239, 68, 68, 0.2);
          position: relative;
          overflow: hidden; 
        }
        @media (min-width: 640px) {
          .hero-background {
            border-bottom: 3px solid rgba(239, 68, 68, 0.2);
          }
        }
        .hero-background::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(to right, rgba(239, 68, 68, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(239, 68, 68, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: 5;
          opacity: 0.1;
        }
        @media (min-width: 640px) {
          .hero-background::before {
            background-size: 60px 60px;
          }
        }

        /* Custom Scrollbar for Terminal */
        .terminal-scroll::-webkit-scrollbar {
          width: 6px;
        }
        @media (min-width: 640px) {
          .terminal-scroll::-webkit-scrollbar {
            width: 8px;
          }
        }
        .terminal-scroll::-webkit-scrollbar-track {
          background: #1e0505;
        }
        .terminal-scroll::-webkit-scrollbar-thumb {
          background-color: #dc2626;
          border-radius: 4px;
        }

        /* Tool Card Animation */
        .tool-card {
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          background-color: #0c0018;
        }
        .tool-card:hover {
          transform: translateY(-3px);
          border-color: #f87171;
          background-color: #1a002a;
        }
        @media (min-width: 768px) {
          .tool-card:hover {
            transform: translateY(-5px);
          }
        }
      `}</style>

      {/* Navigation Bar */}
      <nav className="sticky top-0 left-0 right-0 h-14 sm:h-16 bg-[#030005]/95 backdrop-blur-md border-b border-red-900/50 z-40 shadow-xl shadow-black/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full px-3 sm:px-4 lg:px-8">
          <h1 className="text-xl sm:text-2xl font-extrabold text-red-500 font-mono tracking-widest neon-glow-text">WOLFGUIDER</h1>
          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6 text-sm font-semibold text-gray-400 font-mono">
            <a href="#tools" className="hover:text-red-500 transition-colors duration-300 hidden sm:block">TOOLS</a>
            <a href="#blog" className="hover:text-red-500 transition-colors duration-300 hidden sm:block">INSIGHTS</a>
            <button 
              onClick={handleAccessClick}
              className="px-3 py-1 sm:px-4 sm:py-2 lg:px-5 lg:py-2 text-xs sm:text-sm lg:text-base font-bold rounded-lg bg-red-700 hover:bg-red-600 transition-all shadow-lg shadow-red-900/50 neon-border"
            >
              ACCESS
            </button>
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-gray-400 hover:text-red-500 transition-colors duration-300 p-1"
            >
              <Icon name="menu" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Access Code Breaker */}
      <AccessCodeBreaker setAccessGranted={setAccessGranted} />

      {/* Main Content */}
      <main>
        <div className="hero-background min-h-[90vh] flex items-center justify-center p-3 sm:p-4 relative">
          {/* Dynamic Map Background */}
          <DynamicThreatMap />
          <div className="z-10 w-full max-w-7xl py-10 sm:py-16 lg:py-20 px-3 sm:px-4 flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
            {/* Left Column: Hero Content */}
            <div className="lg:w-3/4">
              {/* Audit Status Indicator */}
              <div className={`mb-6 sm:mb-8 max-w-lg mx-auto p-2 text-center rounded-lg font-mono text-xs sm:text-sm tracking-widest border ${remainingTime > 0 ? 'animate-pulse' : ''} ${statusColor === 'text-green-400' ? 'border-green-700/50 bg-green-900/20' : 'border-yellow-700/50 bg-yellow-900/20'}`}>
                SYSTEM: <span className={`${statusColor} font-bold`}>{statusText}</span> | T-{timeString}
              </div>

              {/* Central Hyper-Glow Panel */}
              <div className="text-center p-4 sm:p-6 lg:p-8 xl:p-12 rounded-xl sm:rounded-2xl lg:rounded-3xl max-w-5xl mx-auto transition-all duration-1000 bg-black/80 neon-border z-10 shadow-[0_0_25px_rgba(239,68,68,0.5)]">
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-3 lg:space-x-4 mb-3 sm:mb-4">
                  <span className="text-sm sm:text-base lg:text-lg font-mono text-red-500 tracking-widest neon-glow-text"> &lt; INITIATE &gt; </span>
                  <WolfLogo className="w-12 h-10 sm:w-16 sm:h-12 lg:w-20 lg:h-16 transition-all duration-700 hover:scale-110" />
                  <span className="text-sm sm:text-base lg:text-lg font-mono text-red-500 tracking-widest neon-glow-text"> &lt; SEQUENCE &gt; </span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-extrabold tracking-tighter leading-none text-red-100 glitch-text">
                  WOLF<span className="text-red-600">GUIDER</span>
                </h1>
                <p className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-mono text-red-400 mt-2 sm:mt-4 tracking-widest neon-glow-text">
                  CYBER ELITE. SYSTEM DOMAIN.
                </p>

                <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-light leading-snug mt-6 sm:mt-8 lg:mt-10 xl:mt-12 mb-6 sm:mb-8 lg:mb-10 xl:mb-12 uppercase text-gray-300 px-2">
                  The <span className="font-extrabold text-red-500 neon-glow-text">ZENITH</span> of Ethical Hacking Tools
                  <span className="text-gray-100 block mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg xl:text-xl">Zero-Compromise Security.</span>
                </h2>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center px-2">
                  <button
                    onClick={() => setShowVideoModal(true)}
                    className="px-4 py-3 sm:px-6 sm:py-3 lg:px-8 lg:py-4 xl:px-10 xl:py-4 w-full sm:w-auto text-sm sm:text-base lg:text-lg xl:text-xl font-bold rounded-lg sm:rounded-xl bg-red-700 hover:bg-red-600 transition-all duration-500 ease-in-out shadow-xl sm:shadow-2xl shadow-red-900/70 transform hover:scale-[1.03] sm:hover:scale-[1.05] border-2 border-red-700 neon-border"
                  >
                    LIVE EXPLOIT SIMULATION
                  </button>
                  <a
                    href={isAccessGranted ? TELEGRAM_URL : "#blog"}
                    target={isAccessGranted ? "_blank" : "_self"}
                    rel={isAccessGranted ? "noopener noreferrer" : ""}
                    className={`px-4 py-3 sm:px-6 sm:py-3 lg:px-8 lg:py-4 xl:px-10 xl:py-4 w-full sm:w-auto text-sm sm:text-base lg:text-lg xl:text-xl font-semibold rounded-lg sm:rounded-xl transition-all duration-500 ease-in-out border-2 transform hover:scale-[1.03] sm:hover:scale-[1.02] text-center ${
                      isAccessGranted
                        ? 'bg-green-700 hover:bg-green-600 border-green-700 text-white shadow-lg shadow-green-900/50'
                        : 'bg-gray-900 hover:bg-gray-800 border-gray-800 text-gray-300'
                    }`}
                  >
                    {isAccessGranted ?
                      <span className="flex items-center justify-center"><Icon name="fire" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2" /> SECRET ACCESS</span>
                      : "READ INSIGHTS"}
                  </a>
                </div>

                <div id="secret-content" className="mt-4 sm:mt-6 lg:mt-8">
                  {isAccessGranted && (
                    <div className="p-3 sm:p-4 bg-green-900/20 text-green-400 font-mono rounded-lg border border-green-700/50 transition-opacity duration-1000 neon-border shadow-green-900/50 text-sm sm:text-base">
                      **LEVEL 1 ACCESS:** Congrats, Operator! Direct path unlocked.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Comm Logs and System Status */}
            <div className="lg:w-1/4 space-y-4 sm:space-y-6 lg:space-y-8 z-10 mt-6 lg:mt-0">
              <OperatorCommLog />
              <SystemStatusPanel />
            </div>
          </div>
        </div>

        {/* Tool Showcase Section */}
        <section id="tools" className="py-16 sm:py-20 lg:py-24 xl:py-28 bg-[#0c0018] border-t-2 sm:border-t-4 border-red-900/40">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-12 sm:mb-16 lg:mb-20 uppercase tracking-widest text-gray-200 neon-glow-text">
              ZENITH <span className="text-red-500">TOOLCHAIN</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {TOOLS_DATA.map((tool) => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  onExecute={setActiveTool}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Blog/Insights Section */}
        <section id="blog" className="py-16 sm:py-20 lg:py-24 xl:py-28 bg-[#030005] border-t-2 sm:border-t-4 border-red-900/40">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center mb-12 sm:mb-16 lg:mb-20 uppercase tracking-widest text-gray-200 neon-glow-text">
              LATEST <span className="text-red-500">INSIGHTS</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {BLOG_PREVIEWS.map((post, index) => (
                <a
                  key={index}
                  href="#"
                  className="block bg-[#0c0018] p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-800 transition-all duration-500 ease-out transform hover:border-red-600 hover:shadow-xl sm:hover:shadow-2xl hover:shadow-red-900/50 hover:scale-[1.02] neon-border"
                >
                  <span className="text-xs font-mono text-red-500 bg-red-900/40 px-2 py-1 rounded-sm border border-red-700">{post.category}</span>
                  <h4 className="text-base sm:text-lg lg:text-xl font-bold text-gray-100 mt-3 sm:mt-4 leading-snug group-hover:text-red-300 transition-colors duration-300 font-inter line-clamp-2">{post.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3 font-mono">{post.date}</p>
                </a>
              ))}
              <a href="#blog" className="flex flex-col items-center justify-center p-4 sm:p-6 border border-dashed border-red-700/80 rounded-lg sm:rounded-xl text-red-500 hover:border-red-500 hover:text-red-300 transition-all duration-500 transform hover:scale-[1.02] neon-glow-text">
                <Icon name="book" className="w-8 h-8 sm:w-10 sm:h-10 mb-2"/>
                <span className="text-sm sm:text-base font-mono">VIEW ALL ARTICLES</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Live Audit Feed Modal */}
      <LiveAuditFeedModal
        isVisible={showVideoModal}
        onClose={() => setShowVideoModal(false)}
      />

      {/* Tool Execution Modal */}
      <ToolExecutionModal
        tool={activeTool}
        onClose={() => setActiveTool(null)}
        telegramUrl={TELEGRAM_URL}
      />

      {/* Footer */}
      <Footer userId={userId} />
    </div>
  );
};

export default WolfGuider;