const categories = [
    { id: 'phone', icon: 'ph-phone', label: 'Phone' },
    { id: 'printer', icon: 'ph-printer', label: 'Printer' },
    { id: 'computer', icon: 'ph-desktop', label: 'Computer' },
    { id: 'networking', icon: 'ph-wifi-high', label: 'Networking' },
    { id: 'hardware', icon: 'ph-cpu', label: 'Hardware' },
    { id: 'software', icon: 'ph-app-window', label: 'Software' },
    { id: 'general', icon: 'ph-chats', label: 'General Client Communication' }
];

const defaultPhrases = [
    // General Client Communication
    { id: 'g1', category: 'general', text: "Can you please describe the problem you are experiencing?", tags: ['start', 'issue', 'problem', 'describe'] },
    { id: 'g2', category: 'general', text: "I'll guide you step by step to resolve the issue.", tags: ['guide', 'help', 'step'] },
    { id: 'g3', category: 'general', text: "Could you please share your screen with me so I can take a look?", tags: ['screen', 'share', 'remote'] },
    { id: 'g4', category: 'general', text: "Thank you for your patience while I look into this for you.", tags: ['patience', 'wait', 'hold', 'check'] },
    { id: 'g5', category: 'general', text: "May I have your name and employee ID, please?", tags: ['name', 'id', 'employee', 'identity'] },
    { id: 'g6', category: 'general', text: "Is it okay if I place you on a brief hold while I consult with my team?", tags: ['hold', 'wait', 'team', 'consult'] },
    { id: 'g7', category: 'general', text: "Could you provide me with the ticket number from your previous call?", tags: ['ticket', 'number', 'previous', 'reference'] },
    { id: 'g8', category: 'general', text: "I've successfully resolved the issue. Is there anything else I can help you with today?", tags: ['resolved', 'fix', 'else', 'finish'] },
    { id: 'g9', category: 'general', text: "I apologize for the inconvenience this has caused you.", tags: ['apologize', 'sorry', 'inconvenience'] },
    { id: 'g10', category: 'general', text: "I will need to escalate this ticket to our Level 2 support team.", tags: ['escalate', 'level 2', 'tier', 'transfer'] },
    { id: 'g11', category: 'general', text: "When is a good time for us to call you back regarding this?", tags: ['callback', 'time', 'schedule'] },

    // Phone (VoIP, Mobile, Teams/Zoom)
    { id: 'ph1', category: 'phone', text: "Can you hear me clearly?", tags: ['audio', 'hear', 'voice', 'clear'] },
    { id: 'ph2', category: 'phone', text: "I'm having a little trouble hearing you, could you please speak closer to the microphone?", tags: ['volume', 'quiet', 'microphone', 'trouble'] },
    { id: 'ph3', category: 'phone', text: "Are you using a headset or the built-in speaker?", tags: ['headset', 'speaker', 'audio', 'device'] },
    { id: 'ph4', category: 'phone', text: "Are you connected to the VPN on your mobile device?", tags: ['vpn', 'mobile', 'phone', 'connection'] },
    { id: 'ph5', category: 'phone', text: "Let's check the volume settings on your softphone application.", tags: ['softphone', 'volume', 'settings', 'teams', 'zoom'] },
    { id: 'ph6', category: 'phone', text: "Please try unplugging your headset from the USB port and plugging it back in.", tags: ['unplug', 'headset', 'usb', 'replug'] },
    { id: 'ph7', category: 'phone', text: "Is the mute button toggled on your headset cable?", tags: ['mute', 'button', 'cable', 'headset'] },
    { id: 'ph8', category: 'phone', text: "Are you experiencing dropped calls frequently?", tags: ['drop', 'call', 'frequent', 'voip'] },

    // Computer (Windows, Mac, Peripherals)
    { id: 'c1', category: 'computer', text: "Let’s try restarting the device first.", tags: ['restart', 'reboot', 'power', 'device'] },
    { id: 'c2', category: 'computer', text: "Is the computer turned on and plugged into a power source?", tags: ['power', 'plug', 'on', 'cable'] },
    { id: 'c3', category: 'computer', text: "Are you seeing any error messages on the screen? If so, what do they say?", tags: ['error', 'message', 'screen', 'read'] },
    { id: 'c4', category: 'computer', text: "Could you please open the Task Manager (or Activity Monitor) and tell me if any program is using high CPU?", tags: ['task manager', 'cpu', 'memory', 'slow', 'program'] },
    { id: 'c5', category: 'computer', text: "Let's check if there are any pending OS updates.", tags: ['update', 'windows', 'mac', 'pending'] },
    { id: 'c6', category: 'computer', text: "What color is the light on your monitor's power button?", tags: ['monitor', 'screen', 'light', 'button', 'display'] },
    { id: 'c7', category: 'computer', text: "Is your laptop plugged into the docking station correctly?", tags: ['laptop', 'dock', 'station', 'plug'] },
    { id: 'c8', category: 'computer', text: "Hold down the power button for 10 seconds to force the computer to turn off.", tags: ['force', 'power', 'button', 'hold', 'off'] },
    { id: 'c9', category: 'computer', text: "Please let me know your computer's hostname or asset tag.", tags: ['hostname', 'asset tag', 'name', 'identify'] },
    { id: 'c10', category: 'computer', text: "Can you try pressing Ctrl + Alt + Delete?", tags: ['ctrl', 'alt', 'delete', 'task', 'lock'] },

    // Printer
    { id: 'p1', category: 'printer', text: "Is the printer turned on and displaying any error lights?", tags: ['printer', 'power', 'light', 'error', 'lcd'] },
    { id: 'p2', category: 'printer', text: "Please check if there is enough paper in the tray and no paper jams.", tags: ['paper', 'jam', 'tray', 'empty'] },
    { id: 'p3', category: 'printer', text: "Is the printer connected via USB cable or Wi-Fi?", tags: ['connection', 'usb', 'wifi', 'cable', 'network'] },
    { id: 'p4', category: 'printer', text: "Let's try clearing the print queue and restarting the print spooler service.", tags: ['queue', 'spooler', 'stuck', 'clear', 'service'] },
    { id: 'p5', category: 'printer', text: "Are the toner or ink cartridges empty according to the display panel?", tags: ['toner', 'ink', 'cartridge', 'empty'] },
    { id: 'p6', category: 'printer', text: "Can you print a test page directly from the printer's menu?", tags: ['test', 'page', 'menu', 'direct'] },
    { id: 'p7', category: 'printer', text: "Which printer is currently set as your default device?", tags: ['default', 'printer', 'set', 'device'] },
    { id: 'p8', category: 'printer', text: "Let's remove the printer from your settings and re-add it.", tags: ['remove', 'delete', 'add', 'settings'] },

    // Networking
    { id: 'n1', category: 'networking', text: "Please check if the network cable is properly connected to your computer and the wall jack.", tags: ['cable', 'ethernet', 'router', 'plug', 'wall'] },
    { id: 'n2', category: 'networking', text: "Are you connected to the Wi-Fi or using a wired connection?", tags: ['wifi', 'wired', 'connection', 'wireless'] },
    { id: 'n3', category: 'networking', text: "Let's try restarting your router. Please unplug it for 30 seconds and plug it back in.", tags: ['router', 'restart', 'reboot', 'modem'] },
    { id: 'n4', category: 'networking', text: "Could you tell me what color the lights on your router are right now?", tags: ['router', 'lights', 'internet', 'modem'] },
    { id: 'n5', category: 'networking', text: "Are you successfully connected to the company VPN?", tags: ['vpn', 'connect', 'company', 'network'] },
    { id: 'n6', category: 'networking', text: "Are other devices in your home/office able to access the internet?", tags: ['other', 'devices', 'internet', 'access'] },
    { id: 'n7', category: 'networking', text: "Let's open the command prompt and ping a website to check connectivity.", tags: ['command', 'prompt', 'ping', 'website', 'cmd'] },
    { id: 'n8', category: 'networking', text: "Can you see the Wi-Fi icon in the bottom right corner of your screen?", tags: ['wifi', 'icon', 'corner', 'taskbar'] },
    { id: 'n9', category: 'networking', text: "Please check if 'Flight Mode' is accidentally turned on.", tags: ['flight mode', 'airplane', 'wireless', 'off'] },

    // Hardware
    { id: 'h1', category: 'hardware', text: "Do you hear any unusual noises coming from the machine, like clicking or grinding?", tags: ['noise', 'sound', 'fan', 'drive', 'hdd'] },
    { id: 'h2', category: 'hardware', text: "Could you unplug all peripheral devices except the keyboard and mouse and try again?", tags: ['unplug', 'devices', 'usb', 'peripheral'] },
    { id: 'h3', category: 'hardware', text: "Is the battery completely drained? Let's leave it plugged in for 15 minutes before turning it on.", tags: ['battery', 'charge', 'drain', 'plug'] },
    { id: 'h4', category: 'hardware', text: "Have you spilled any liquids on the keyboard or device recently?", tags: ['spill', 'liquid', 'water', 'keyboard', 'damage'] },
    { id: 'h5', category: 'hardware', text: "Let me arrange a replacement part for you.", tags: ['replace', 'part', 'hardware', 'arrange'] },
    { id: 'h6', category: 'hardware', text: "Does the mouse light up when you move it or click?", tags: ['mouse', 'light', 'laser', 'click', 'move'] },
    { id: 'h7', category: 'hardware', text: "Is the DisplayPort or HDMI cable firmly connected to the back of the monitor?", tags: ['displayport', 'hdmi', 'cable', 'monitor', 'back'] },

    // Software
    { id: 's1', category: 'software', text: "Have you installed any new software or updates recently?", tags: ['new', 'install', 'update', 'recent'] },
    { id: 's2', category: 'software', text: "Let's try completely closing the application and opening it again.", tags: ['close', 'open', 'app', 'reopen'] },
    { id: 's3', category: 'software', text: "Please make sure you are running the latest version of the software.", tags: ['latest', 'version', 'update', 'check'] },
    { id: 's4', category: 'software', text: "Can you try clearing the cache and cookies in your web browser?", tags: ['cache', 'cookies', 'browser', 'clear', 'history'] },
    { id: 's5', category: 'software', text: "Let's repair the installation from the Control Panel.", tags: ['repair', 'install', 'control panel', 'settings'] },
    { id: 's6', category: 'software', text: "Are you getting a license expiration or activation error?", tags: ['license', 'expire', 'activation', 'error'] },
    { id: 's7', category: 'software', text: "Let's check if the antivirus is blocking the application from running.", tags: ['antivirus', 'block', 'firewall', 'security'] },
    { id: 's8', category: 'software', text: "Does this issue happen in a different web browser, like Chrome or Edge?", tags: ['browser', 'chrome', 'edge', 'different', 'test'] },
    { id: 's9', category: 'software', text: "Let's reset your password and see if that lets you log in.", tags: ['password', 'reset', 'login', 'account', 'access'] }
];

const supportTools = {
    checklists: [
        {
            id: 'chk_computer',
            title: 'Computer Issues',
            icon: 'ph-desktop',
            items: [
                'Restart system',
                'Check Task Manager for high CPU/RAM',
                'Check for pending Windows/macOS Updates',
                'Verify system storage isn\'t full',
                'Check Event Viewer for critical errors',
                'Run hardware diagnostics (F12 at boot)',
                'Check for malware/virus scans'
            ]
        },
        {
            id: 'chk_printer',
            title: 'Printer Issues',
            icon: 'ph-printer',
            items: [
                'Check power and status LCD/lights',
                'Check for paper jams',
                'Verify ink/toner levels',
                'Clear print spooler/queue (services.msc)',
                'Reinstall or update printer driver',
                'Print a test page directly from printer',
                'Check IP connectivity (Ping printer IP)'
            ]
        },
        {
            id: 'chk_network',
            title: 'Networking Issues',
            icon: 'ph-wifi-high',
            items: [
                'Restart the router/modem/access point',
                'Verify physical cable connections',
                'Check IP address (ipconfig or ifconfig)',
                'Ping 8.8.8.8 to test external connectivity',
                'Disable/enable the network adapter',
                'Check VPN status/credentials',
                'Flush DNS cache'
            ]
        },
        {
            id: 'chk_software',
            title: 'Software / App Issues',
            icon: 'ph-app-window',
            items: [
                'Force close and restart the application',
                'Clear browser cache/cookies',
                'Check for app updates/patches',
                'Run as Administrator',
                'Repair installation via Control Panel',
                'Check for Windows/OS compatibility mode',
                'Verify license/activation status'
            ]
        },
        {
            id: 'chk_phone',
            title: 'Phone / VoIP Issues',
            icon: 'ph-phone',
            items: [
                'Verify device volume and mute status',
                'Test microphone on another app',
                'Check network/VPN connection',
                'Restart softphone application',
                'Unplug and replug the USB headset',
                'Check for VoIP app updates'
            ]
        },
        {
            id: 'chk_hardware',
            title: 'Hardware Issues',
            icon: 'ph-cpu',
            items: [
                'Unplug unnecessary peripherals',
                'Check device temperatures/cooling fans',
                'Verify all cables are securely seated',
                'Run built-in hardware diagnostics tool',
                'Test on another power outlet',
                'Check for physical damage (spills, drops)'
            ]
        },
        {
            id: 'chk_general',
            title: 'General Support Steps',
            icon: 'ph-chats',
            items: [
                'Verify client identity and ticket number',
                'Document the exact error message',
                'Ask about recent changes or installations',
                'Request a screenshot or screenshare',
                'Attempt remote desktop session if needed',
                'Isolate the issue scope (one user vs all)',
                'Log steps/resolution in the ticketing system'
            ]
        }
    ],
    commands: [
        {
            platform: 'Windows Network',
            icon: 'ph-windows-logo',
            items: [
                { cmd: 'ipconfig', desc: 'Display basic IP configuration' },
                { cmd: 'ipconfig /all', desc: 'Display full IP configuration' },
                { cmd: 'ipconfig /release', desc: 'Release IPv4 address' },
                { cmd: 'ipconfig /renew', desc: 'Renew IPv4 address' },
                { cmd: 'ipconfig /flushdns', desc: 'Purge DNS Resolver cache' },
                { cmd: 'ping 8.8.8.8', desc: 'Test internet connection (Google DNS)' },
                { cmd: 'ping google.com -t', desc: 'Continuous ping to Google' },
                { cmd: 'tracert google.com', desc: 'Trace route to destination' },
                { cmd: 'nslookup google.com', desc: 'DNS lookup' },
                { cmd: 'netstat -an', desc: 'Display all network connections' }
            ]
        },
        {
            platform: 'Windows System / Admin',
            icon: 'ph-windows-logo',
            items: [
                { cmd: 'sfc /scannow', desc: 'Scan and repair system files' },
                { cmd: 'dism /online /cleanup-image /restorehealth', desc: 'Repair Windows image' },
                { cmd: 'chkdsk /f /r', desc: 'Check disk for errors & recover' },
                { cmd: 'taskmgr', desc: 'Open Task Manager' },
                { cmd: 'services.msc', desc: 'Open Services window' },
                { cmd: 'appwiz.cpl', desc: 'Open Programs and Features' },
                { cmd: 'ncpa.cpl', desc: 'Open Network Connections' },
                { cmd: 'compmgmt.msc', desc: 'Open Computer Management' },
                { cmd: 'eventvwr.msc', desc: 'Open Event Viewer' },
                { cmd: 'gpupdate /force', desc: 'Force Group Policy update' },
                { cmd: 'systeminfo', desc: 'Display computer properties' }
            ]
        },
        {
            platform: 'macOS Terminal',
            icon: 'ph-apple-logo',
            items: [
                { cmd: 'ifconfig', desc: 'Display network config' },
                { cmd: 'ping 8.8.8.8', desc: 'Test internet connection' },
                { cmd: 'sudo killall coreaudiod', desc: 'Restart audio service' },
                { cmd: 'networksetup -listallhardwareports', desc: 'List network hardware' },
                { cmd: 'uptime', desc: 'Check system uptime' },
                { cmd: 'sudo softwareupdate -i -a', desc: 'Install all software updates' }
            ]
        }
    ],
    diagnosisQuestions: [
        "When did the issue exactly start happening?",
        "Did you install anything recently before the issue began?",
        "Are any other users or devices in the office experiencing the same issue?",
        "Is there a specific error message or error code on the screen?",
        "Does the issue happen every time you perform a specific action?",
        "Have you tried restarting the device or the application yet?",
        "Are you currently connected to the office VPN or local network?",
        "Have you changed any passwords recently?",
        "Were there any power outages or internet drops recently?",
        "Is this a company-issued device or a personal device?"
    ]
};
