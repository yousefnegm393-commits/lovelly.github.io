// ============ STORAGE KEYS ============
const STORAGE_KEYS = {
    PASSCODE: 'love_story_passcode',
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
    MUSIC_URL: 'music_url'
};

// ============ DEFAULT DATA ============
const DEFAULT_DATA = {
    passcode: '1234',
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

// ============ DOM READY ============
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    loadAllData();
    displayStoryContent();
    setBackground();
    startCountdown();
    setupParticles();
    setupAllEventListeners();
});

// ============ SETUP ALL EVENT LISTENERS ============
function setupAllEventListeners() {
    console.log('Setting up event listeners...');
    
    // Passcode Enter button
    const enterBtn = document.getElementById('enterBtn');
    const passcodeInput = document.getElementById('passcodeInput');
    
    if (enterBtn) {
        enterBtn.addEventListener('click', checkPasscode);
        console.log('Enter button listener attached');
    }
    
    if (passcodeInput) {
        passcodeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPasscode();
            }
        });
        console.log('Passcode input listener attached');
    }
    
    // Admin toggle
    const adminToggle = document.getElementById('adminToggle');
    if (adminToggle) {
        adminToggle.addEventListener('click', toggleAdmin);
    }
    
    // Close admin
    const closeAdmin = document.querySelector('.close-admin');
    if (closeAdmin) {
        closeAdmin.addEventListener('click', toggleAdmin);
    }
    
    // Save button
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveAdminChanges);
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutAdmin);
    }
    
    // Test music button
    const testMusicBtn = document.getElementById('testMusicBtn');
    if (testMusicBtn) {
        testMusicBtn.addEventListener('click', testMusic);
    }
    
    // Background type selector
    const adminBgType = document.getElementById('adminBgType');
    if (adminBgType) {
        adminBgType.addEventListener('change', updateBgTypeOptions);
    }
    
    console.log('All event listeners setup complete');
}

// ============ PASSCODE AUTHENTICATION ============
function checkPasscode() {
    const input = document.getElementById('passcodeInput').value;
    const correctPasscode = localStorage.getItem(STORAGE_KEYS.PASSCODE) || DEFAULT_DATA.passcode;
    
    console.log('Checking passcode... Input length:', input.length, 'Correct:', correctPasscode);
    
    if (input === correctPasscode) {
        console.log('Passcode correct!');
        document.getElementById('passwordModal').classList.add('hidden');
        document.getElementById('mainContent').classList.remove('hidden');
        document.getElementById('passcodeInput').value = '';
        sessionStorage.setItem('authenticated', 'true');
    } else {
        console.log('Passcode incorrect');
        document.getElementById('errorMessage').textContent = '❌ Incorrect passcode. Try again!';
        document.getElementById('passcodeInput').value = '';
    }
}

// ============ STORY CONTENT ============
function displayStoryContent() {
    const storyContent = document.getElementById('storyContent');
    if (!storyContent) return;
    
    const title = localStorage.getItem(STORAGE_KEYS.STORY_TITLE) || DEFAULT_DATA.storyTitle;
    const text = localStorage.getItem(STORAGE_KEYS.STORY_TEXT) || DEFAULT_DATA.storyText;
    const images = JSON.parse(localStorage.getItem(STORAGE_KEYS.STORY_IMAGES)) || DEFAULT_DATA.storyImages;
    
    const titleEl = document.getElementById('storyTitle');
    if (titleEl) {
        titleEl.textContent = title;
    }
    
    storyContent.innerHTML = '';
    
    // Parse text by || separator
    const paragraphs = text.split('||');
    
    paragraphs.forEach((paragraph) => {
        const block = document.createElement('div');
        block.className = 'story-block';
        block.innerHTML = paragraph
            .split('|')
            .map(p => `<p>${p.trim()}</p>`)
            .join('');
        storyContent.appendChild(block);
    });
    
    // Add images
    if (images && images.length > 0) {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'story-images';
        
        images.forEach(imgUrl => {
            if (imgUrl && imgUrl.trim()) {
                const imgDiv = document.createElement('div');
                imgDiv.className = 'story-image';
                imgDiv.innerHTML = `<img src="${imgUrl}" alt="Love story" onerror="this.src='https://via.placeholder.com/400x300?text=Image+Error'">`;
                imageContainer.appendChild(imgDiv);
            }
        });
        
        if (imageContainer.children.length > 0) {
            storyContent.appendChild(imageContainer);
        }
    }
}

// ============ COUNTDOWN ============
function startCountdown() {
    const title = localStorage.getItem(STORAGE_KEYS.COUNTDOWN_TITLE) || DEFAULT_DATA.countdownTitle;
    const dateStr = localStorage.getItem(STORAGE_KEYS.COUNTDOWN_DATE) || DEFAULT_DATA.countdownDate;
    const message = localStorage.getItem(STORAGE_KEYS.COUNTDOWN_MESSAGE) || DEFAULT_DATA.countdownMessage;
    
    const countdownTitle = document.getElementById('countdownTitle');
    if (countdownTitle) {
        countdownTitle.textContent = title;
    }
    
    const targetDate = new Date(dateStr).getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        const messageEl = document.getElementById('countdownMessage');
        
        if (distance < 0) {
            if (daysEl) daysEl.textContent = '0';
            if (hoursEl) hoursEl.textContent = '0';
            if (minutesEl) minutesEl.textContent = '0';
            if (secondsEl) secondsEl.textContent = '0';
            if (messageEl) messageEl.textContent = message;
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (daysEl) daysEl.textContent = days;
        if (hoursEl) hoursEl.textContent = hours;
        if (minutesEl) minutesEl.textContent = minutes;
        if (secondsEl) secondsEl.textContent = seconds;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ============ BACKGROUND ============
function setBackground() {
    const bgType = localStorage.getItem(STORAGE_KEYS.BG_TYPE) || DEFAULT_DATA.bgType;
    const bgImage = document.getElementById('bgImage');
    const bgVideo = document.getElementById('bgVideo');
    
    if (!bgImage || !bgVideo) return;
    
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
    
    if (!container) return;
    
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
    if (audio && musicUrl) {
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

// ============ ADMIN PANEL ============
function toggleAdmin() {
    const adminPanel = document.getElementById('adminPanel');
    const isHidden = adminPanel.classList.contains('hidden');
    
    if (isHidden) {
        const auth = sessionStorage.getItem('authenticated');
        if (!auth) {
            alert('You must enter the correct passcode first.');
            return;
        }
        loadAdminPanel();
        adminPanel.classList.remove('hidden');
    } else {
        adminPanel.classList.add('hidden');
    }
}

function loadAdminPanel() {
    const adminTitle = document.getElementById('adminTitle');
    const adminStoryText = document.getElementById('adminStoryText');
    const adminImages = document.getElementById('adminImages');
    const adminCountdownTitle = document.getElementById('adminCountdownTitle');
    const adminTargetDate = document.getElementById('adminTargetDate');
    const adminCountdownMessage = document.getElementById('adminCountdownMessage');
    const adminBgType = document.getElementById('adminBgType');
    const adminBgColor = document.getElementById('adminBgColor');
    const adminBgImage = document.getElementById('adminBgImage');
    const adminBgVideo = document.getElementById('adminBgVideo');
    const adminBgGradient = document.getElementById('adminBgGradient');
    const adminParticles = document.getElementById('adminParticles');
    const adminMusicUrl = document.getElementById('adminMusicUrl');
    
    if (adminTitle) adminTitle.value = localStorage.getItem(STORAGE_KEYS.STORY_TITLE) || DEFAULT_DATA.storyTitle;
    if (adminStoryText) adminStoryText.value = localStorage.getItem(STORAGE_KEYS.STORY_TEXT) || DEFAULT_DATA.storyText;
    if (adminImages) adminImages.value = (JSON.parse(localStorage.getItem(STORAGE_KEYS.STORY_IMAGES)) || DEFAULT_DATA.storyImages).join('\n');
    
    if (adminCountdownTitle) adminCountdownTitle.value = localStorage.getItem(STORAGE_KEYS.COUNTDOWN_TITLE) || DEFAULT_DATA.countdownTitle;
    if (adminTargetDate) adminTargetDate.value = localStorage.getItem(STORAGE_KEYS.COUNTDOWN_DATE) || DEFAULT_DATA.countdownDate;
    if (adminCountdownMessage) adminCountdownMessage.value = localStorage.getItem(STORAGE_KEYS.COUNTDOWN_MESSAGE) || DEFAULT_DATA.countdownMessage;
    
    if (adminBgType) adminBgType.value = localStorage.getItem(STORAGE_KEYS.BG_TYPE) || DEFAULT_DATA.bgType;
    if (adminBgColor) adminBgColor.value = localStorage.getItem(STORAGE_KEYS.BG_COLOR) || DEFAULT_DATA.bgColor;
    if (adminBgImage) adminBgImage.value = localStorage.getItem(STORAGE_KEYS.BG_IMAGE) || '';
    if (adminBgVideo) adminBgVideo.value = localStorage.getItem(STORAGE_KEYS.BG_VIDEO) || '';
    if (adminBgGradient) adminBgGradient.value = localStorage.getItem(STORAGE_KEYS.BG_GRADIENT) || DEFAULT_DATA.bgGradient;
    
    if (adminParticles) adminParticles.checked = localStorage.getItem(STORAGE_KEYS.PARTICLES_ENABLED) !== 'false';
    if (adminMusicUrl) adminMusicUrl.value = localStorage.getItem(STORAGE_KEYS.MUSIC_URL) || '';
    
    updateBgTypeOptions();
}

function updateBgTypeOptions() {
    const bgType = document.getElementById('adminBgType').value;
    const colorOption = document.getElementById('colorOption');
    const imageOption = document.getElementById('imageOption');
    const videoOption = document.getElementById('videoOption');
    const gradientOption = document.getElementById('gradientOption');
    
    if (colorOption) colorOption.classList.toggle('hidden', bgType !== 'color');
    if (imageOption) imageOption.classList.toggle('hidden', bgType !== 'image');
    if (videoOption) videoOption.classList.toggle('hidden', bgType !== 'video');
    if (gradientOption) gradientOption.classList.toggle('hidden', bgType !== 'gradient');
}

function saveAdminChanges() {
    try {
        const adminTitle = document.getElementById('adminTitle');
        const adminStoryText = document.getElementById('adminStoryText');
        const adminImages = document.getElementById('adminImages');
        const adminCountdownTitle = document.getElementById('adminCountdownTitle');
        const adminTargetDate = document.getElementById('adminTargetDate');
        const adminCountdownMessage = document.getElementById('adminCountdownMessage');
        const adminBgType = document.getElementById('adminBgType');
        const adminBgColor = document.getElementById('adminBgColor');
        const adminBgImage = document.getElementById('adminBgImage');
        const adminBgVideo = document.getElementById('adminBgVideo');
        const adminBgGradient = document.getElementById('adminBgGradient');
        const adminParticles = document.getElementById('adminParticles');
        const adminMusicUrl = document.getElementById('adminMusicUrl');
        const adminPasscode = document.getElementById('adminPasscode');
        
        if (adminTitle) localStorage.setItem(STORAGE_KEYS.STORY_TITLE, adminTitle.value);
        if (adminStoryText) localStorage.setItem(STORAGE_KEYS.STORY_TEXT, adminStoryText.value);
        
        if (adminImages) {
            const images = adminImages.value.split('\n').filter(url => url.trim());
            localStorage.setItem(STORAGE_KEYS.STORY_IMAGES, JSON.stringify(images));
        }
        
        if (adminCountdownTitle) localStorage.setItem(STORAGE_KEYS.COUNTDOWN_TITLE, adminCountdownTitle.value);
        if (adminTargetDate) localStorage.setItem(STORAGE_KEYS.COUNTDOWN_DATE, adminTargetDate.value);
        if (adminCountdownMessage) localStorage.setItem(STORAGE_KEYS.COUNTDOWN_MESSAGE, adminCountdownMessage.value);
        
        if (adminBgType) localStorage.setItem(STORAGE_KEYS.BG_TYPE, adminBgType.value);
        if (adminBgColor) localStorage.setItem(STORAGE_KEYS.BG_COLOR, adminBgColor.value);
        if (adminBgImage) localStorage.setItem(STORAGE_KEYS.BG_IMAGE, adminBgImage.value);
        if (adminBgVideo) localStorage.setItem(STORAGE_KEYS.BG_VIDEO, adminBgVideo.value);
        if (adminBgGradient) localStorage.setItem(STORAGE_KEYS.BG_GRADIENT, adminBgGradient.value);
        
        if (adminParticles) localStorage.setItem(STORAGE_KEYS.PARTICLES_ENABLED, adminParticles.checked);
        if (adminMusicUrl) localStorage.setItem(STORAGE_KEYS.MUSIC_URL, adminMusicUrl.value);
        
        if (adminPasscode && adminPasscode.value) {
            localStorage.setItem(STORAGE_KEYS.PASSCODE, adminPasscode.value);
            adminPasscode.value = '';
        }
        
        alert('✅ All changes saved successfully!');
        location.reload();
    } catch (error) {
        alert('Error saving changes: ' + error.message);
    }
}

function logoutAdmin() {
    sessionStorage.removeItem('authenticated');
    const adminPanel = document.getElementById('adminPanel');
    if (adminPanel) {
        adminPanel.classList.add('hidden');
    }
    alert('Logged out. Please refresh the page.');
}

function loadAllData() {
    // Initialize all default values in localStorage if not present
    for (const key in DEFAULT_DATA) {
        const storageKey = STORAGE_KEYS[key.toUpperCase()];
        if (storageKey && !localStorage.getItem(storageKey)) {
            const value = DEFAULT_DATA[key];
            localStorage.setItem(storageKey, typeof value === 'string' ? value : JSON.stringify(value));
        }
    }
}
