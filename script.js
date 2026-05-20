// ============ STORAGE KEYS ============
const STORAGE_KEYS = {
    PASSCODE_ADMIN: 'love_story_passcode_admin',
    PASSCODE_VISITOR: 'love_story_passcode_visitor',
    USER_ROLE: 'user_role',
    STORY_TITLE: 'story_title',
    STORY_TEXT: 'story_text',
    PICTURES: 'pictures',
    MAX_PICTURES: 'max_pictures',
    COUNTDOWN_TITLE: 'countdown_title',
    COUNTDOWN_START_DATE: 'countdown_start_date',
    COUNTDOWN_TARGET_DATE: 'countdown_target_date',
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
    passcodeAdmin: '2152008',
    passcodeVisitor: '932009',
    storyTitle: 'Our Love Story 💕',
    storyText: ' قدك واني اسف اني جيت عليكي وظلمتك ف حاجات كتير ينور عيني بس انا بغير عليكي اوي واه ممكن يكون الغيره عمتني وخلتني ادايقك ف حاجات انتي ملكيش ذنب فيها وربنا يعلم ان الفتره دي انا شايل هموم كتير ومبيجيش وقت احكيلك يحبيبتي وعارف انو غصب عنك ولو البعد هيريحك مستعد اعملك الي يريجك ويستي لو م عايزه تشوفيني حتى تاني ولو صدفه ف انا مش هقدر اجي ع راحتك مع اني م عايز كد وم عايزك تفكري اني م باقي عليكي لا واللهربنا واحده يعلم ان اليوم بيعدي بسنه من غير م اكلمك او وانتي بعيده عني يهنونتي وانا هفضل عند وعدي مع ربنا اني م هفكر اكلم او عيني تروح ع حد غيرك مهمة حصل او الوقت عدى لاني فعلا م هلاقي زيك وعمري ما هحس ما حد الي حسيته معاكي وانا ف ضهرك ف اي وقت هتاحتجيني فيه ينور عيني وعايز اقولك ان انتي عمرك ما هتبقي ذكره بالنسبالي يحبيبتي وهتفضلي عندي بالدنيا والي فيها و وحشتيني اوي                        بحبك ينورعيني وكل حاجه بالنسبالي❤️‍🩹',
    pictures: [],
    maxPictures: 10,
    countdownTitle: 'Together Since 💑',
    countdownStartDate: new Date(2026, 3, 2).toISOString().split('T')[0],
    countdownTargetDate: new Date(2025, 11, 31).toISOString().split('T')[0],
    countdownMessage: '❤️ Days together and counting! ❤️',
    bgType: 'color',
    bgColor: '#1a1a2e',
    bgImage: '',
    bgVideo: '',
    bgGradient: 'to right, #667eea, #764ba2',
    particlesEnabled: true,
    musicUrl: ''
};

let isMusicPlaying = false;

// ============ DOM READY ============
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    loadAllData();
    displayStoryContent();
    setBackground();
    startCountup();
    setupParticles();
    setupAllEventListeners();
});

// ============ SETUP ALL EVENT LISTENERS ============
function setupAllEventListeners() {
    console.log('Setting up event listeners...');
    
    // Passcode Enter button
    const enterBtn = document.querySelector('[onclick="checkPasscode()"]');
    const passcodeInput = document.getElementById('passcodeInput');
    
    if (passcodeInput) {
        passcodeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkPasscode();
            }
        });
        console.log('Passcode input listener attached');
    }
}

// ============ PASSCODE AUTHENTICATION ============
function checkPasscode() {
    const input = document.getElementById('passcodeInput').value;
    const adminPasscode = localStorage.getItem(STORAGE_KEYS.PASSCODE_ADMIN) || DEFAULT_DATA.passcodeAdmin;
    const visitorPasscode = localStorage.getItem(STORAGE_KEYS.PASSCODE_VISITOR) || DEFAULT_DATA.passcodeVisitor;
    
    console.log('Checking passcode...');
    
    if (input === adminPasscode) {
        console.log('Admin passcode correct!');
        localStorage.setItem(STORAGE_KEYS.USER_ROLE, 'admin');
        sessionStorage.setItem('authenticated', 'true');
        unlockContent();
    } else if (input === visitorPasscode) {
        console.log('Visitor passcode correct!');
        localStorage.setItem(STORAGE_KEYS.USER_ROLE, 'visitor');
        sessionStorage.setItem('authenticated', 'true');
        unlockContent();
    } else {
        console.log('Passcode incorrect');
        document.getElementById('errorMessage').textContent = '❌ Incorrect passcode. Try again!';
        document.getElementById('passcodeInput').value = '';
    }
}

function unlockContent() {
    document.getElementById('passwordModal').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    document.getElementById('passcodeInput').value = '';
    
    const userRole = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
    if (userRole === 'admin') {
        document.getElementById('adminToggle').style.display = 'block';
    }
    
    playMusic();
}

// ============ STORY CONTENT ============
function displayStoryContent() {
    const storyContent = document.getElementById('storyContent');
    if (!storyContent) return;
    
    const title = localStorage.getItem(STORAGE_KEYS.STORY_TITLE) || DEFAULT_DATA.storyTitle;
    const text = localStorage.getItem(STORAGE_KEYS.STORY_TEXT) || DEFAULT_DATA.storyText;
    const picturesData = JSON.parse(localStorage.getItem(STORAGE_KEYS.PICTURES)) || DEFAULT_DATA.pictures;
    const maxPictures = parseInt(localStorage.getItem(STORAGE_KEYS.MAX_PICTURES)) || DEFAULT_DATA.maxPictures;
    
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
    
    // Add pictures
    if (picturesData && picturesData.length > 0) {
        const picturesToDisplay = picturesData.slice(0, maxPictures);
        const imageContainer = document.createElement('div');
        imageContainer.className = 'story-images';
        
        picturesToDisplay.forEach((pictureObj, index) => {
            const imgDiv = document.createElement('div');
            imgDiv.className = 'story-image';
            const caption = pictureObj.caption ? `<p class="image-caption">${pictureObj.caption}</p>` : '';
            imgDiv.innerHTML = `
                <img src="${pictureObj.url}" alt="Love story ${index + 1}" onerror="this.src='https://via.placeholder.com/400x300?text=Image+Error'">
                ${caption}
            `;
            imageContainer.appendChild(imgDiv);
        });
        
        if (imageContainer.children.length > 0) {
            storyContent.appendChild(imageContainer);
        }
    }
}

// ============ COUNTUP ============
function startCountup() {
    const title = localStorage.getItem(STORAGE_KEYS.COUNTDOWN_TITLE) || DEFAULT_DATA.countdownTitle;
    const startDateStr = localStorage.getItem(STORAGE_KEYS.COUNTDOWN_START_DATE) || DEFAULT_DATA.countdownStartDate;
    const message = localStorage.getItem(STORAGE_KEYS.COUNTDOWN_MESSAGE) || DEFAULT_DATA.countdownMessage;
    
    const countdownTitle = document.getElementById('countdownTitle');
    if (countdownTitle) {
        countdownTitle.textContent = title;
    }
    
    const startDate = new Date(startDateStr).getTime();
    
    function updateCountup() {
        const now = new Date().getTime();
        const distance = now - startDate;
        
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
        if (messageEl) messageEl.textContent = message;
    }
    
    updateCountup();
    setInterval(updateCountup, 1000);
}

// ============ BACKGROUND ============
function setBackground() {
    const bgType = localStorage.getItem(STORAGE_KEYS.BG_TYPE) || DEFAULT_DATA.bgType;
    const bgImage = document.getElementById('bgImage');
    const bgVideo = document.getElementById('bgVideo');
    
    if (!bgImage || !bgVideo) return;
    
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
        isMusicPlaying = true;
        updateMusicButton();
    }
}

function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    if (!audio.src) {
        alert('No music URL set. Please configure in admin panel.');
        return;
    }
    
    if (isMusicPlaying) {
        audio.pause();
        isMusicPlaying = false;
    } else {
        audio.play();
        isMusicPlaying = true;
    }
    updateMusicButton();
}

function updateMusicButton() {
    const btn = document.getElementById('musicPlayBtn');
    if (btn) {
        btn.textContent = isMusicPlaying ? '⏸️' : '▶️';
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
        isMusicPlaying = true;
        updateMusicButton();
    } else {
        alert('Please enter a music URL.');
    }
}

// ============ PICTURE UPLOAD ============
function uploadPictures() {
    const fileInput = document.getElementById('pictureUpload');
    const files = fileInput.files;
    
    if (files.length === 0) {
        alert('Please select pictures to upload.');
        return;
    }
    
    const currentPictures = JSON.parse(localStorage.getItem(STORAGE_KEYS.PICTURES)) || [];
    
    for (let file of files) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const pictureObj = {
                id: Date.now() + Math.random(),
                url: e.target.result,
                caption: ''
            };
            currentPictures.push(pictureObj);
            localStorage.setItem(STORAGE_KEYS.PICTURES, JSON.stringify(currentPictures));
        };
        reader.readAsDataURL(file);
    }
    
    fileInput.value = '';
    setTimeout(() => {
        loadAdminPanel();
        displayStoryContent();
        alert('✅ Pictures uploaded successfully!');
    }, 500);
}

function deletePicture(id) {
    if (!confirm('Delete this picture?')) return;
    
    let pictures = JSON.parse(localStorage.getItem(STORAGE_KEYS.PICTURES)) || [];
    pictures = pictures.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PICTURES, JSON.stringify(pictures));
    loadAdminPanel();
    displayStoryContent();
}

function updatePictureCaption(id, newCaption) {
    let pictures = JSON.parse(localStorage.getItem(STORAGE_KEYS.PICTURES)) || [];
    const picture = pictures.find(p => p.id === id);
    if (picture) {
        picture.caption = newCaption;
        localStorage.setItem(STORAGE_KEYS.PICTURES, JSON.stringify(pictures));
    }
}

function renderPicturesList() {
    const container = document.getElementById('picturesList');
    if (!container) return;
    
    const pictures = JSON.parse(localStorage.getItem(STORAGE_KEYS.PICTURES)) || [];
    
    if (pictures.length === 0) {
        container.innerHTML = '<p style="color: #999;">No pictures uploaded yet.</p>';
        return;
    }
    
    container.innerHTML = pictures.map((pic, index) => `
        <div class="picture-item">
            <img src="${pic.url}" alt="Picture ${index + 1}">
            <div class="picture-controls">
                <input type="text" placeholder="Add caption..." value="${pic.caption || ''}" 
                    onchange="updatePictureCaption(${pic.id}, this.value)">
                <button onclick="deletePicture(${pic.id})" class="delete-btn">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
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
        const userRole = localStorage.getItem(STORAGE_KEYS.USER_ROLE);
        if (userRole !== 'admin') {
            alert('Only admins can access this panel.');
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
    const adminMaxPictures = document.getElementById('adminMaxPictures');
    const adminCountdownTitle = document.getElementById('adminCountdownTitle');
    const adminStartDate = document.getElementById('adminStartDate');
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
    if (adminMaxPictures) adminMaxPictures.value = localStorage.getItem(STORAGE_KEYS.MAX_PICTURES) || DEFAULT_DATA.maxPictures;
    
    if (adminCountdownTitle) adminCountdownTitle.value = localStorage.getItem(STORAGE_KEYS.COUNTDOWN_TITLE) || DEFAULT_DATA.countdownTitle;
    if (adminStartDate) adminStartDate.value = localStorage.getItem(STORAGE_KEYS.COUNTDOWN_START_DATE) || DEFAULT_DATA.countdownStartDate;
    if (adminTargetDate) adminTargetDate.value = localStorage.getItem(STORAGE_KEYS.COUNTDOWN_TARGET_DATE) || DEFAULT_DATA.countdownTargetDate;
    if (adminCountdownMessage) adminCountdownMessage.value = localStorage.getItem(STORAGE_KEYS.COUNTDOWN_MESSAGE) || DEFAULT_DATA.countdownMessage;
    
    if (adminBgType) adminBgType.value = localStorage.getItem(STORAGE_KEYS.BG_TYPE) || DEFAULT_DATA.bgType;
    if (adminBgColor) adminBgColor.value = localStorage.getItem(STORAGE_KEYS.BG_COLOR) || DEFAULT_DATA.bgColor;
    if (adminBgImage) adminBgImage.value = localStorage.getItem(STORAGE_KEYS.BG_IMAGE) || '';
    if (adminBgVideo) adminBgVideo.value = localStorage.getItem(STORAGE_KEYS.BG_VIDEO) || '';
    if (adminBgGradient) adminBgGradient.value = localStorage.getItem(STORAGE_KEYS.BG_GRADIENT) || DEFAULT_DATA.bgGradient;
    
    if (adminParticles) adminParticles.checked = localStorage.getItem(STORAGE_KEYS.PARTICLES_ENABLED) !== 'false';
    if (adminMusicUrl) adminMusicUrl.value = localStorage.getItem(STORAGE_KEYS.MUSIC_URL) || '';
    
    updateBgTypeOptions();
    renderPicturesList();
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
        const adminMaxPictures = document.getElementById('adminMaxPictures');
        const adminCountdownTitle = document.getElementById('adminCountdownTitle');
        const adminStartDate = document.getElementById('adminStartDate');
        const adminTargetDate = document.getElementById('adminTargetDate');
        const adminCountdownMessage = document.getElementById('adminCountdownMessage');
        const adminBgType = document.getElementById('adminBgType');
        const adminBgColor = document.getElementById('adminBgColor');
        const adminBgImage = document.getElementById('adminBgImage');
        const adminBgVideo = document.getElementById('adminBgVideo');
        const adminBgGradient = document.getElementById('adminBgGradient');
        const adminParticles = document.getElementById('adminParticles');
        const adminMusicUrl = document.getElementById('adminMusicUrl');
        
        if (adminTitle) localStorage.setItem(STORAGE_KEYS.STORY_TITLE, adminTitle.value);
        if (adminStoryText) localStorage.setItem(STORAGE_KEYS.STORY_TEXT, adminStoryText.value);
        if (adminMaxPictures) localStorage.setItem(STORAGE_KEYS.MAX_PICTURES, adminMaxPictures.value);
        
        if (adminCountdownTitle) localStorage.setItem(STORAGE_KEYS.COUNTDOWN_TITLE, adminCountdownTitle.value);
        if (adminStartDate) localStorage.setItem(STORAGE_KEYS.COUNTDOWN_START_DATE, adminStartDate.value);
        if (adminTargetDate) localStorage.setItem(STORAGE_KEYS.COUNTDOWN_TARGET_DATE, adminTargetDate.value);
        if (adminCountdownMessage) localStorage.setItem(STORAGE_KEYS.COUNTDOWN_MESSAGE, adminCountdownMessage.value);
        
        if (adminBgType) localStorage.setItem(STORAGE_KEYS.BG_TYPE, adminBgType.value);
        if (adminBgColor) localStorage.setItem(STORAGE_KEYS.BG_COLOR, adminBgColor.value);
        if (adminBgImage) localStorage.setItem(STORAGE_KEYS.BG_IMAGE, adminBgImage.value);
        if (adminBgVideo) localStorage.setItem(STORAGE_KEYS.BG_VIDEO, adminBgVideo.value);
        if (adminBgGradient) localStorage.setItem(STORAGE_KEYS.BG_GRADIENT, adminBgGradient.value);
        
        if (adminParticles) localStorage.setItem(STORAGE_KEYS.PARTICLES_ENABLED, adminParticles.checked);
        if (adminMusicUrl) localStorage.setItem(STORAGE_KEYS.MUSIC_URL, adminMusicUrl.value);
        
        alert('✅ All changes saved successfully!');
        location.reload();
    } catch (error) {
        alert('Error saving changes: ' + error.message);
    }
}

function logoutAdmin() {
    sessionStorage.removeItem('authenticated');
    localStorage.removeItem(STORAGE_KEYS.USER_ROLE);
    const adminPanel = document.getElementById('adminPanel');
    if (adminPanel) {
        adminPanel.classList.add('hidden');
    }
    location.reload();
}

function loadAllData() {
    // Initialize all default values in localStorage if not present
    if (!localStorage.getItem(STORAGE_KEYS.PASSCODE_ADMIN)) {
        localStorage.setItem(STORAGE_KEYS.PASSCODE_ADMIN, DEFAULT_DATA.passcodeAdmin);
    }
    if (!localStorage.getItem(STORAGE_KEYS.PASSCODE_VISITOR)) {
        localStorage.setItem(STORAGE_KEYS.PASSCODE_VISITOR, DEFAULT_DATA.passcodeVisitor);
    }
    if (!localStorage.getItem(STORAGE_KEYS.STORY_TITLE)) {
        localStorage.setItem(STORAGE_KEYS.STORY_TITLE, DEFAULT_DATA.storyTitle);
    }
    if (!localStorage.getItem(STORAGE_KEYS.STORY_TEXT)) {
        localStorage.setItem(STORAGE_KEYS.STORY_TEXT, DEFAULT_DATA.storyText);
    }
    if (!localStorage.getItem(STORAGE_KEYS.MAX_PICTURES)) {
        localStorage.setItem(STORAGE_KEYS.MAX_PICTURES, DEFAULT_DATA.maxPictures);
    }
    if (!localStorage.getItem(STORAGE_KEYS.COUNTDOWN_TITLE)) {
        localStorage.setItem(STORAGE_KEYS.COUNTDOWN_TITLE, DEFAULT_DATA.countdownTitle);
    }
    if (!localStorage.getItem(STORAGE_KEYS.COUNTDOWN_START_DATE)) {
        localStorage.setItem(STORAGE_KEYS.COUNTDOWN_START_DATE, DEFAULT_DATA.countdownStartDate);
    }
    if (!localStorage.getItem(STORAGE_KEYS.COUNTDOWN_TARGET_DATE)) {
        localStorage.setItem(STORAGE_KEYS.COUNTDOWN_TARGET_DATE, DEFAULT_DATA.countdownTargetDate);
    }
    if (!localStorage.getItem(STORAGE_KEYS.COUNTDOWN_MESSAGE)) {
        localStorage.setItem(STORAGE_KEYS.COUNTDOWN_MESSAGE, DEFAULT_DATA.countdownMessage);
    }
    if (!localStorage.getItem(STORAGE_KEYS.BG_TYPE)) {
        localStorage.setItem(STORAGE_KEYS.BG_TYPE, DEFAULT_DATA.bgType);
    }
    if (!localStorage.getItem(STORAGE_KEYS.BG_COLOR)) {
        localStorage.setItem(STORAGE_KEYS.BG_COLOR, DEFAULT_DATA.bgColor);
    }
    if (!localStorage.getItem(STORAGE_KEYS.PARTICLES_ENABLED)) {
        localStorage.setItem(STORAGE_KEYS.PARTICLES_ENABLED, DEFAULT_DATA.particlesEnabled);
    }
}
