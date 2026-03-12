// --- State Management ---
const state = {
    view: 'general', // ID of current view (category ID, or 'favorites', 'custom', 'tools')
    searchQuery: '',
    favorites: JSON.parse(localStorage.getItem('it_ready_favs')) || [],
    customPhrases: JSON.parse(localStorage.getItem('it_ready_custom')) || [],
    darkMode: localStorage.getItem('it_ready_dark') === 'true'
};

// --- DOM Elements ---
const categoriesNav = document.getElementById('categories-nav');
const contentGrid = document.getElementById('content-grid');
const toolsContainer = document.getElementById('tools-container');
const currentViewTitle = document.getElementById('current-view-title');
const navItems = document.querySelectorAll('.nav-item');
const searchInputs = [document.getElementById('search-input-desktop'), document.getElementById('search-input-mobile')];
const themeToggleBtn = document.getElementById('theme-toggle');

// Modals
const addModal = document.getElementById('form-modal');
const readModal = document.getElementById('read-modal');
const readModeContent = document.getElementById('read-mode-content');
const dynamicFabBtn = document.getElementById('dynamic-fab-btn');
const fabIcon = document.getElementById('fab-icon');
const checklistModal = document.getElementById('checklist-modal');
const checklistContent = document.getElementById('checklist-content');
const checklistTitle = document.getElementById('checklist-title');

// --- Initialization ---
function init() {
    renderCategoriesNav();
    applyTheme();
    setupEventListeners();
    renderView();
}

// --- Setup Event Listeners ---
function setupEventListeners() {
    // Nav Navigation (Unified)
    const handleNavClick = (e) => {
        const item = e.target.closest('.nav-item');
        if (item) {
            setView(item.dataset.view);
        }
    };
    categoriesNav.addEventListener('click', handleNavClick);
    document.getElementById('extra-nav').addEventListener('click', handleNavClick);

    // Search
    searchInputs.forEach(input => {
        if (!input) return;
        input.addEventListener('input', (e) => {
            state.searchQuery = e.target.value.toLowerCase();
            // Sync both inputs
            searchInputs.forEach(i => { if (i) i.value = state.searchQuery; });
            renderView();
        });
    });

    // Theme Toggle
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            state.darkMode = !state.darkMode;
            localStorage.setItem('it_ready_dark', state.darkMode);
            applyTheme();
        });
    }

    // Modal behavior
    dynamicFabBtn.addEventListener('click', handleFabClick);
    document.getElementById('close-form-btn').addEventListener('click', closeAddModal);
    document.getElementById('cancel-form-btn').addEventListener('click', closeAddModal);
    document.getElementById('save-form-btn').addEventListener('click', saveCustomPhrase);
    
    document.getElementById('close-read-btn').addEventListener('click', () => {
        readModal.classList.remove('active');
    });

    // Add Phrase Modal Background Click
    addModal.addEventListener('click', (e) => {
        if (e.target === addModal) closeAddModal();
    });
    readModal.addEventListener('click', (e) => {
        if (e.target === readModal) readModal.classList.remove('active');
    });
    checklistModal.addEventListener('click', (e) => {
        if (e.target === checklistModal) closeChecklistModal();
    });
    
    document.getElementById('close-checklist-btn').addEventListener('click', closeChecklistModal);
    document.getElementById('done-checklist-btn').addEventListener('click', closeChecklistModal);

    // Card delegation (Copy, Read, Fav, Delete)
    contentGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('.btn-icon');
        if (!btn) return;

        const card = btn.closest('.card');
        const phraseId = card.dataset.id;
        const action = btn.dataset.action;

        const phraseText = card.querySelector('.card-text').textContent;

        if (action === 'copy') {
            navigator.clipboard.writeText(phraseText).then(showToast);
        } else if (action === 'read') {
            readModeContent.textContent = phraseText;
            readModal.classList.add('active');
        } else if (action === 'fav') {
            toggleFavorite(phraseId);
        } else if (action === 'delete') {
            deleteCustomPhrase(phraseId);
        } else if (action === 'edit') {
            openAddModal(phraseId);
        }
    });
}

// --- Data Operations ---
function getAllPhrases() {
    return [...defaultPhrases, ...state.customPhrases];
}

function toggleFavorite(id) {
    const index = state.favorites.indexOf(id);
    if (index === -1) {
        state.favorites.push(id);
    } else {
        state.favorites.splice(index, 1);
    }
    localStorage.setItem('it_ready_favs', JSON.stringify(state.favorites));
    renderView(); // re-render to update heart icon immediately
}

function saveCustomPhrase() {
    const idInput = document.getElementById('phrase-id').value;
    const catInput = document.getElementById('phrase-category').value;
    const textInput = document.getElementById('phrase-text').value.trim();

    if (!textInput) return;

    if (idInput) {
        // Edit
        const phrase = state.customPhrases.find(p => p.id === idInput);
        if (phrase) {
            phrase.category = catInput;
            phrase.text = textInput;
        }
    } else {
        // Add
        state.customPhrases.push({
            id: 'cst_' + Date.now(),
            category: catInput,
            text: textInput,
            tags: textInput.toLowerCase().split(' ').filter(w => w.length > 3)
        });
    }

    localStorage.setItem('it_ready_custom', JSON.stringify(state.customPhrases));
    closeAddModal();
    renderView();
}

function deleteCustomPhrase(id) {
    if (confirm('Are you sure you want to delete this custom phrase?')) {
        state.customPhrases = state.customPhrases.filter(p => p.id !== id);
        localStorage.setItem('it_ready_custom', JSON.stringify(state.customPhrases));
        // Remove from favorites if it was there
        state.favorites = state.favorites.filter(f => f !== id);
        localStorage.setItem('it_ready_favs', JSON.stringify(state.favorites));
        renderView();
    }
}

// --- Rendering ---
function applyTheme() {
    const themeIcon = document.getElementById('theme-icon');
    if (state.darkMode) {
        document.documentElement.style.setProperty('--bg-color', '#0f172a');
        document.documentElement.style.setProperty('--text-primary', '#f8fafc');
        document.documentElement.style.setProperty('--card-bg', 'rgba(30, 41, 59, 1)');
        document.documentElement.style.setProperty('--sidebar-bg', 'rgba(15, 23, 42, 1)');
        document.documentElement.style.setProperty('--border', 'rgba(51, 65, 85, 1)');
        document.documentElement.style.setProperty('--glass', 'rgba(15, 23, 42, 0.95)');
        if (themeIcon) themeIcon.className = 'ph ph-moon';
    } else {
        document.documentElement.style.setProperty('--bg-color', '#f8fafc');
        document.documentElement.style.setProperty('--text-primary', '#0f172a');
        document.documentElement.style.setProperty('--card-bg', 'rgba(255, 255, 255, 1)');
        document.documentElement.style.setProperty('--sidebar-bg', 'rgba(255, 255, 255, 1)');
        document.documentElement.style.setProperty('--border', 'rgba(226, 232, 240, 1)');
        document.documentElement.style.setProperty('--glass', 'rgba(255, 255, 255, 0.95)');
        if (themeIcon) themeIcon.className = 'ph ph-sun';
    }
}

function renderCategoriesNav() {
    categoriesNav.innerHTML = categories.map(cat => `
        <a class="nav-item ${state.view === cat.id ? 'active' : ''}" data-view="${cat.id}">
            <i class="ph ${cat.icon}"></i>
            <span class="desktop-only">${cat.label}</span>
        </a>
    `).join('');

    // Populate Category Select for Add Modal
    const select = document.getElementById('phrase-category');
    select.innerHTML = categories.map(cat => `<option value="${cat.id}">${cat.label}</option>`).join('');
}

function updateNavActiveState() {
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.toggle('active', el.dataset.view === state.view);
    });
}

function setView(viewId) {
    state.view = viewId;
    state.searchQuery = '';
    searchInputs.forEach(i => { if(i) i.value = ''; });
    updateNavActiveState();
    
    if (viewId === 'tools') {
        currentViewTitle.textContent = 'Support Tools';
    } else if (viewId === 'favorites') {
        currentViewTitle.textContent = 'Favorites';
    } else if (viewId === 'custom') {
        currentViewTitle.textContent = 'Personal Phrases';
    } else {
        const cat = categories.find(c => c.id === viewId);
        currentViewTitle.textContent = cat ? cat.label : 'Phrases';
    }
    
    renderView();
}

function renderView() {
    if (state.view === 'tools' && !state.searchQuery) {
        contentGrid.style.display = 'none';
        toolsContainer.style.display = 'block';
        renderTools();
        dynamicFabBtn.style.display = 'none';
        return;
    }

    contentGrid.style.display = 'grid';
    toolsContainer.style.display = 'none';
    dynamicFabBtn.style.display = 'flex';
    
    // Update FAB Icon based on View
    const checklistMap = {
        'computer': 'chk_computer',
        'printer': 'chk_printer',
        'networking': 'chk_network',
        'software': 'chk_software',
        'phone': 'chk_phone',
        'hardware': 'chk_hardware',
        'general': 'chk_general'
    };
    
    if (checklistMap[state.view]) {
        fabIcon.className = 'ph ph-list-checks';
        dynamicFabBtn.title = 'Troubleshooting Checklist';
    } else {
        fabIcon.className = 'ph ph-plus';
        dynamicFabBtn.title = 'Add Custom Phrase';
    }

    let phrasesToRender = getAllPhrases();

    if (state.searchQuery) {
        phrasesToRender = phrasesToRender.filter(p => {
            const matchText = p.text.toLowerCase().includes(state.searchQuery);
            const matchTag = p.tags && p.tags.some(t => t.toLowerCase().includes(state.searchQuery));
            return matchText || matchTag;
        });
        currentViewTitle.textContent = `Search results for "${state.searchQuery}"`;
    } else {
        if (state.view === 'favorites') {
            phrasesToRender = phrasesToRender.filter(p => state.favorites.includes(p.id));
        } else if (state.view === 'custom') {
            phrasesToRender = state.customPhrases;
        } else {
            phrasesToRender = phrasesToRender.filter(p => p.category === state.view);
        }
    }

    if (phrasesToRender.length === 0) {
        contentGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="ph ph-empty"></i>
                <h3>No phrases found</h3>
                <p>Try a different category or search term.</p>
            </div>
        `;
        contentGrid.style.display = 'block';
        return;
    }
    
    contentGrid.style.display = 'grid';
    contentGrid.innerHTML = phrasesToRender.map(p => {
        const isFav = state.favorites.includes(p.id);
        const isCustom = p.id.startsWith('cst_');
        return `
            <div class="card" data-id="${p.id}">
                <div class="card-text">${p.text}</div>
                <div class="card-actions">
                    ${isCustom ? `
                        <button class="btn-icon" data-action="edit" title="Edit"><i class="ph ph-pencil-simple"></i></button>
                        <button class="btn-icon" data-action="delete" title="Delete"><i class="ph ph-trash"></i></button>
                    ` : ''}
                    <button class="btn-icon ${isFav ? 'active' : ''}" data-action="fav" title="Favorite">
                        <i class="ph ${isFav ? 'ph-star-fill' : 'ph-star'}"></i>
                    </button>
                    <button class="btn-icon" data-action="read" title="Read Mode">
                        <i class="ph ph-book-open-text"></i>
                    </button>
                    <button class="btn-icon" data-action="copy" title="Copy to clipboard">
                        <i class="ph ph-copy"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function renderTools() {
    let html = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px;">

            
            <div class="tool-column">
                <h3 style="margin-bottom: 16px; color: var(--text-secondary);">Command Line Reference</h3>
                ${supportTools.commands.map(cmdGrp => `
                    <div class="tool-section">
                        <div class="tool-header">
                            <i class="ph ${cmdGrp.icon}"></i> ${cmdGrp.platform}
                        </div>
                        <div>
                            ${cmdGrp.items.map(item => `
                                <div class="command-item" title="Click to copy" onclick="navigator.clipboard.writeText('${item.cmd}').then(showToast)" style="cursor:pointer;">
                                    <div>
                                        <div class="command-text">${item.cmd}</div>
                                        <div class="command-desc">${item.desc}</div>
                                    </div>
                                    <i class="ph ph-copy" style="color:var(--text-secondary);"></i>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
                
                <h3 style="margin-top: 24px; margin-bottom: 16px; color: var(--text-secondary);">Quick Diagnosis</h3>
                <div class="tool-section">
                    <ul style="padding-left: 20px; line-height: 1.6;">
                        ${supportTools.diagnosisQuestions.map(q => `<li style="margin-bottom: 8px;">${q}</li>`).join('')}
                    </ul>
                </div>

                <div class="tool-section" style="margin-top:24px;">
                    <div class="tool-header">
                        <i class="ph ph-note-pencil"></i> Session Notes
                    </div>
                    <textarea class="form-control" id="session-notes" placeholder="Client: \nIssue: \nSteps taken: \nResolution: " oninput="localStorage.setItem('it_ready_notes', this.value)">${localStorage.getItem('it_ready_notes') || ''}</textarea>
                </div>
            </div>
        </div>
    `;
    toolsContainer.innerHTML = html;
}

// --- Utils ---
function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

function openAddModal(editingId = null) {
    document.getElementById('phrase-id').value = '';
    document.getElementById('phrase-category').value = state.view !== 'tools' && state.view !== 'favorites' && state.view !== 'custom' ? state.view : 'general';
    document.getElementById('phrase-text').value = '';
    document.getElementById('form-title').textContent = 'Add Custom Phrase';

    if (typeof editingId === 'string') {
        const phrase = state.customPhrases.find(p => p.id === editingId);
        if (phrase) {
            document.getElementById('phrase-id').value = phrase.id;
            document.getElementById('phrase-category').value = phrase.category;
            document.getElementById('phrase-text').value = phrase.text;
            document.getElementById('form-title').textContent = 'Edit Phrase';
        }
    }
    
    addModal.classList.add('active');
    document.getElementById('phrase-text').focus();
}

function closeAddModal() {
    addModal.classList.remove('active');
}

function handleFabClick() {
    const checklistMap = {
        'computer': 'chk_computer',
        'printer': 'chk_printer',
        'networking': 'chk_network',
        'software': 'chk_software',
        'phone': 'chk_phone',
        'hardware': 'chk_hardware',
        'general': 'chk_general'
    };

    const chkId = checklistMap[state.view];
    if (chkId) {
        openChecklistModal(chkId);
    } else {
        openAddModal();
    }
}

function openChecklistModal(chkId) {
    const chk = supportTools.checklists.find(c => c.id === chkId);
    if (!chk) return;
    
    checklistTitle.innerHTML = `<i class="ph ${chk.icon}"></i> ${chk.title}`;
    
    checklistContent.innerHTML = chk.items.map((item, idx) => `
        <div class="checklist-item" style="padding: 16px 0; font-size: 1.1rem; gap: 16px;">
            <input type="checkbox" id="modal-chk-${idx}" style="width:24px;height:24px;accent-color:var(--accent); cursor: pointer;">
            <label for="modal-chk-${idx}" style="cursor: pointer; flex: 1;">${item}</label>
        </div>
    `).join('');
    
    checklistModal.classList.add('active');
}

function closeChecklistModal() {
    checklistModal.classList.remove('active');
}

// Initialize App
document.addEventListener('DOMContentLoaded', init);
