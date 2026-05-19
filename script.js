// ============ STORAGE KEYS ============
const STORAGE_KEYS = {
    PASSCODE: 'love_story_passcode',
    VISITOR_PASSCODE: 'love_story_visitor_passcode',
    STORY_TITLE: 'story_title',
    STORY_TEXT: 'story_text',
    STORY_IMAGES: 'story_images',
    COUNTDOWN_TITLE: 'countdown_title',
    COUNTDOWN_DATE: 'countdown_date',
    COUNTDOWN_MESSAGE: 'countdown_message',
    BG_TYPE: 'bg_type',
    BG_COLOR: 'bg_color',
    BG_IMAGE: 'bg_image',
    BG_VIDEO: 'bg_video',
    BG_GRADIENT: 'bg_gradient',
    PARTICLES_ENABLED: 'particles_enabled',
    MUSIC_URL: 'music_url',
    ADMIN_AUTH: 'admin_auth',
    USER_TYPE: 'user_type'
};

// ============ DEFAULT DATA ============
const DEFAULT_DATA = {
    adminPasscode: '2152008',
    visitorPasscode: '2662009',
    storyTitle: 'Our Love Story 💕',
    storyText: 'Every love story is beautiful,|but ours is my favorite.||From the moment I met you, I knew you were special.',
    storyImages: ['https://via.placeholder.com/400x300?text=Us', 'https://via.placeholder.com/400x300?text=Together'],
    countdownTitle: 'Days Until Our Special Day 💑',
    countdownDate: new Date(2025, 11, 31).toISOString().split('T')[0],
    countdownMessage: '❤️ Our special day is here! ❤️',
    bgType: 'color',
    bgColor: '#1a1a2e',
    bgImage: '',
    bgVideo: '',
    bgGradient: 'to right, #667eea, #764ba2',
    particlesEnabled: true,
    musicUrl: ''
};

// ============ INITIALIZATION ============
window.addEventListener('load', () => {
    initializeApp();
});

function initializeApp() {
    loadAllData();
    displayStoryContent();
    setBackground();
    startCountdown();
    if (DEFAULT_DATA.musicUrl) {
        playMusic();
    }
    setupParticles();
    setupEventListeners();
}

// ============ EVENT LISTENERS ============
function setupEventListeners() {
    const passcodeInput = document.getElementById('passcodeInput');
    if (passcodeInput) {
        passcodeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') checkPasscode();
        });
    }
}

// ============ PASSCODE AUTHENTICATION ============
function checkPasscode() {
    const input = document.getElementById('passcodeInput').value;
    const adminPasscode = DEFAULT_DATA.adminPasscode;
    const visitorPasscode = DEFAULT_DATA.visitorPasscode;
    
    if (input === adminPasscode) {
        // Admin Login
        document.getElementById('passwordModal').classList.remove('active');
        document.getElementById('mainContent').classList.remove('hidden');
        document.getElementById('passcodeInput').value = '';
        sessionStorage.setItem('authenticated', 'true');
        sessionStorage.setItem('userType', 'admin');
        showAdminButton();
        loadMusicPlayer();
    } else if (input === visitorPasscode) {
        // Visitor Login
        document.getElementById('passwordModal').classList.remove('active');
        document.getElementById('mainContent').classList.remove('hidden');
        document.getElementById('passcodeInput').value = '';
        sessionStorage.setItem('authenticated', 'true');
        sessionStorage.setItem('userType', 'visitor');
        hideAdminButton();
        loadMusicPlayer();
    } else {
        document.getElementById('errorMessage').textContent = '❌ Incorrect passcode. Try again!';
        document.getElementById('passcodeInput').value = '';
    }
}

// ============ ADMIN BUTTON VISIBILITY ============
function showAdminButton() {
    document.getElementById('adminToggle').style.display = 'block';
}

function hideAdminButton() {
    document.getElementById('adminToggle').style.display = 'none';
    document.getElementById('adminPanel').classList.add('hidden');
}

// ============ STORY CONTENT ============
function displayStoryContent() {
    const storyContent = document.getElementById('storyContent');
    const title = localStorage.getItem(STORAGE_KEYS.STORY_TITLE) || DEFAULT_DATA.storyTitle;
    const text = localStorage.getItem(STORAGE_KEYS.STORY_TEXT) || DEFAULT_DATA.storyText;
    const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.STORY_IMAGES)) || DEFAULT_DATA.storyImages;
    
    document.getElementById('storyTitle').textContent = title;
    
    storyContent.innerHTML = '';
    
    // Parse text by || separator
    const paragraphs = text.split('||');
    
    paragraphs.forEach((paragraph, index) => {
        const block = document.createElement('div');
        block.className = 'story-block';
        block.innerHTML = paragraph
            .split('|')
            .map(p => `<p>${p.trim()}</p>`)
            .join('');
        storyContent.appendChild(block);
    });
    
    // Add images
    if (images.length > 0) {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'story-images';
        
        images.forEach(imgUrl => {
            if (imgUrl.trim()) {
                const imgDiv = document.createElement('div');
                imgDiv.className = 'story-image';
                imgDiv.innerHTML = `<img src="${imgUrl}" alt="Love story" onerror="this.src='https://via.placeholder.com/400x300?text=Image+Error'">`;
                imageContainer.appendChild(imgDiv);
            }
        });
        
        storyContent.appendChild(imageContainer);
    }
}

// ============ COUNTDOWN ============
function startCountdown() {
    const title = localStorage.getItem(STORAGE_KEYS.COUNTDOWN_TITLE) || DEFAULT_DATA.countdownTitle;
    const dateStr = localStorage.getItem(STORAGE_KEYS.COUNTDOWN_DATE) || DEFAULT_DATA.countdownDate;
    const message = localStorage.getItem(STORAGE_KEYS.COUNTDOWN_MESSAGE) || DEFAULT_DATA.countdownMessage;
    
    document.getElementById('countdownTitle').textContent = title;
    document.getElementById('countdownMessage').textContent = '';
    
    const targetDate = new Date(dateStr).getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
            document.getElementById('countdownMessage').textContent = message;
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============ BACKGROUND ============
function setBackground() {
    const bgType = localStorage.getItem(STORAGE_KEYS.BG_TYPE) || DEFAULT_DATA.bgType;
    const bgContainer = document.getElementById('backgroundContainer');
    const bgImage = document.getElementById('bgImage');
    const bgVideo = document.getElementById('bgVideo');
    
    // Remove existing styling
    bgImage.style.backgroundImage = '';
    bgImage.style.background = '';
    bgVideo.style.display = 'none';
    
    if (bgType === 'color') {
        const color = localStorage.getItem(STORAGE_KEYS.BG_COLOR) || DEFAULT_DATA.bgColor;
        bgImage.style.background = color;
    } else if (bgType === 'image') {
        const imageUrl = localStorage.getItem(STORAGE_KEYS.BG_IMAGE) || '';
        if (imageUrl) {
            bgImage.style.backgroundImage = `url('${imageUrl}')`;
            bgImage.style.backgroundSize = 'cover';
            bgImage.style.backgroundPosition = 'center';
        }
    } else if (bgType === 'video') {
        const videoUrl = localStorage.getItem(STORAGE_KEYS.BG_VIDEO) || '';
        if (videoUrl) {
            bgVideo.src = videoUrl;
            bgVideo.style.display = 'block';
        }
    } else if (bgType === 'gradient') {
        const gradient = localStorage.getItem(STORAGE_KEYS.BG_GRADIENT) || DEFAULT_DATA.bgGradient;
        bgImage.style.background = `linear-gradient(${gradient})`;
    }
}

// ============ PARTICLES ============
function setupParticles() {
    const particlesEnabled = localStorage.getItem(STORAGE_KEYS.PARTICLES_ENABLED) !== 'false';
    const container = document.getElementById('particles');
    
    container.innerHTML = '';
    
    if (!particlesEnabled) return;
    
    const particleCount = 30;
    const symbols = ['✨', '💕', '⭐', '💫', '🌟'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.fontSize = Math.random() * 20 + 20 + 'px';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        particle.style.animation = `float ${Math.random() * 5 + 10}s infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(particle);
    }
}

// ============ MUSIC ============
function playMusic() {
    const musicUrl = localStorage.getItem(STORAGE_KEYS.MUSIC_URL) || '';
    const audio = document.getElementById('bgMusic');
    if (musicUrl) {
        audio.src = musicUrl;
        audio.play().catch(() => {
            console.log('Auto-play prevented. User interaction required.');
        });
    }
}

function testMusic() {
    const musicUrl = document.getElementById('adminMusicUrl').value;
    const audio = document.getElementById('bgMusic');
    if (musicUrl) {
        audio.src = musicUrl;
        audio.play().catch((e) => {
            alert('Failed to play music. Check the URL.');
        });
    } else {
        alert('Please enter a music URL.');
    }
}

function loadMusicPlayer() {
    const musicUrl = localStorage.getItem(STORAGE_KEYS.MUSIC_URL) || '';
    const musicPlayer = document.getElementById('musicPlayer');
    
    if (musicUrl && musicPlayer) {
        musicPlayer.style.display = 'flex';
        const audioElement = musicPlayer.querySelector('audio');
        if (audioElement) {
            audioElement.src = musicUrl;
        }
    }
}

function toggleMusic() {
    const audio = document.getElementById('musicPlayer').querySelector('audio');
    const playBtn = document.getElementById('musicPlayBtn');
    
    if (audio.paused) {
        audio.play();
        playBtn.textContent = '⏸️';
    } else {
        audio.pause();
        playBtn.textContent = '▶️';
    }
}

// ============ ADMIN PANEL ============
function toggleAdmin() {
    const adminPanel = document.getElementById('adminPanel');
    const userType = sessionStorage.getItem('userType');
    
    if (userType !== 'admin') {
        alert('Only admins can access settings.');
        return;
    }
    
    const isHidden = adminPanel.classList.contains('hidden');
    
    if (isHidden) {
        loadAdminPanel();
        adminPanel.classList.remove('hidden');
    } else {
        adminPanel.classList.add('hidden');
    }
}

function loadAdminPanel() {
    document.getElementById('adminTitle').value = localStorage.getItem(STORAGE_KEYS.STORY_TITLE) || DEFAULT_DATA.storyTitle;
    document.getElementById('adminStoryText').value = localStorage.getItem(STORAGE_KEYS.STORY_TEXT) || DEFAULT_DATA.storyText;
    document.getElementById('adminImages').value = (JSON.parse(localStorage.getItem(STORAGE_KEYS.STORY_IMAGES)) || DEFAULT_DATA.storyImages).join('\n');
    
    document.getElementById('adminCountdownTitle').value = localStorage.getItem(STORAGE_KEYS.COUNTDOWN_TITLE) || DEFAULT_DATA.countdownTitle;
    document.getElementById('adminTargetDate').value = localStorage.getItem(STORAGE_KEYS.COUNTDOWN_DATE) || DEFAULT_DATA.countdownDate;
    document.getElementById('adminCountdownMessage').value = localStorage.getItem(STORAGE_KEYS.COUNTDOWN_MESSAGE) || DEFAULT_DATA.countdownMessage;
    
    document.getElementById('adminBgType').value = localStorage.getItem(STORAGE_KEYS.BG_TYPE) || DEFAULT_DATA.bgType;
    document.getElementById('adminBgColor').value = localStorage.getItem(STORAGE_KEYS.BG_COLOR) || DEFAULT_DATA.bgColor;
    document.getElementById('adminBgImage').value = localStorage.getItem(STORAGE_KEYS.BG_IMAGE) || '';
    document.getElementById('adminBgVideo').value = localStorage.getItem(STORAGE_KEYS.BG_VIDEO) || '';
    document.getElementById('adminBgGradient').value = localStorage.getItem(STORAGE_KEYS.BG_GRADIENT) || DEFAULT_DATA.bgGradient;
    
    document.getElementById('adminParticles').checked = localStorage.getItem(STORAGE_KEYS.PARTICLES_ENABLED) !== 'false';
    document.getElementById('adminMusicUrl').value = localStorage.getItem(STORAGE_KEYS.MUSIC_URL) || '';
    
    updateBgTypeOptions();
}

function updateBgTypeOptions() {
    const bgType = document.getElementById('adminBgType').value;
    document.getElementById('colorOption').classList.toggle('active', bgType === 'color');
    document.getElementById('imageOption').classList.toggle('active', bgType === 'image');
    document.getElementById('videoOption').classList.toggle('active', bgType === 'video');
    document.getElementById('gradientOption').classList.toggle('active', bgType === 'gradient');
}

function saveAdminChanges() {
    try {
        localStorage.setItem(STORAGE_KEYS.STORY_TITLE, document.getElementById('adminTitle').value);
        localStorage.setItem(STORAGE_KEYS.STORY_TEXT, document.getElementById('adminStoryText').value);
        
        const images = document.getElementById('adminImages').value.split('\n').filter(url => url.trim());
        localStorage.setItem(STORAGE_KEYS.STORY_IMAGES, JSON.stringify(images));
        
        localStorage.setItem(STORAGE_KEYS.COUNTDOWN_TITLE, document.getElementById('adminCountdownTitle').value);
        localStorage.setItem(STORAGE_KEYS.COUNTDOWN_DATE, document.getElementById('adminTargetDate').value);
        localStorage.setItem(STORAGE_KEYS.COUNTDOWN_MESSAGE, document.getElementById('adminCountdownMessage').value);
        
        localStorage.setItem(STORAGE_KEYS.BG_TYPE, document.getElementById('adminBgType').value);
        localStorage.setItem(STORAGE_KEYS.BG_COLOR, document.getElementById('adminBgColor').value);
        localStorage.setItem(STORAGE_KEYS.BG_IMAGE, document.getElementById('adminBgImage').value);
        localStorage.setItem(STORAGE_KEYS.BG_VIDEO, document.getElementById('adminBgVideo').value);
        localStorage.setItem(STORAGE_KEYS.BG_GRADIENT, document.getElementById('adminBgGradient').value);
        
        localStorage.setItem(STORAGE_KEYS.PARTICLES_ENABLED, document.getElementById('adminParticles').checked);
        localStorage.setItem(STORAGE_KEYS.MUSIC_URL, document.getElementById('adminMusicUrl').value);
        
        alert('✅ All changes saved successfully!');
        
        // Refresh the page to apply changes
        location.reload();
    } catch (error) {
        alert('Error saving changes: ' + error.message);
    }
}

function logoutAdmin() {
    sessionStorage.removeItem('authenticated');
    sessionStorage.removeItem('userType');
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('mainContent').classList.add('hidden');
    document.getElementById('passwordModal').classList.add('active');
    document.getElementById('passcodeInput').value = '';
    alert('Logged out. Please refresh the page.');
}

function loadAllData() {
    // This ensures defaults are set if not in storage
    for (const key in DEFAULT_DATA) {
        if (!localStorage.getItem(STORAGE_KEYS[key.toUpperCase()])) {
            const storageKey = Object.keys(STORAGE_KEYS).find(k => k.toLowerCase() === key.toLowerCase());
            if (storageKey) {
                const value = DEFAULT_DATA[key];
                localStorage.setItem(STORAGE_KEYS[storageKey], typeof value === 'string' ? value : JSON.stringify(value));
            }
        }
    }
}
