/* js/components.js */

// --- 1. GLOBAL FUNCTIONS ---

// Toggle Mobile Menu
window.toggleMenu = function() {
    const nav = document.getElementById('navMenu');
    const btn = document.querySelector('.menu-toggle');
    if (nav) nav.classList.toggle('active');
    if (btn) btn.classList.toggle('active');
};

// Toggle Language
window.toggleLang = function() {
    document.body.classList.toggle('marathi');
    const currentLang = document.body.classList.contains('marathi') ? 'mr' : 'en';
    localStorage.setItem('muktai-lang', currentLang);
};

// Initialize Language Immediately (Runs before page load)
(function initLanguage() {
    const savedLang = localStorage.getItem('muktai-lang');
    if (savedLang === 'en') {
        document.body.classList.remove('marathi');
    } else {
        document.body.classList.add('marathi'); // Default
    }
})();


// --- 2. COMPONENT LOADING LOGIC ---

async function loadComponents() {
    // Check for file protocol (CORS limitation)
    if (window.location.protocol === 'file:') {
        console.warn("⚠️ ERROR: Fetch API cannot run on 'file://'. Please use Live Server.");
        return;
    }

    const basePath = ""; 

    // --- LOAD HEADER ---
    try {
        const headerRes = await fetch(basePath + 'components/header.html');
        if (!headerRes.ok) throw new Error(`Header 404: ${headerRes.statusText}`);
        const headerHTML = await headerRes.text();
        
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = headerHTML;
        } else {
            console.warn("⚠️ Element <div id='header-placeholder'> not found in HTML.");
        }
    } catch (error) {
        console.error("❌ Error loading Header:", error);
    }

    // --- LOAD FOOTER (Independent of Header) ---
    try {
        const footerRes = await fetch(basePath + 'components/footer.html');
        if (!footerRes.ok) throw new Error(`Footer 404: ${footerRes.statusText}`);
        const footerContent = await footerRes.text();
        
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = footerContent;
        } else {
            console.warn("⚠️ Element <div id='footer-placeholder'> not found in HTML. Please add it.");
        }
    } catch (error) {
        console.error("❌ Error loading Footer:", error);
    }
}

// Execute Loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadComponents);
} else {
    loadComponents();
}

/* js/components.js */

// --- 1. GLOBAL FUNCTIONS ---

// Toggle Mobile Menu
window.toggleMenu = function() {
    const nav = document.getElementById('navMenu');
    const btn = document.querySelector('.menu-toggle');
    if (nav) nav.classList.toggle('active');
    if (btn) btn.classList.toggle('active');
};

// Toggle Language (Updated to close menu)
window.toggleLang = function() {
    // 1. Switch Class
    document.body.classList.toggle('marathi');
    
    // 2. Save Preference
    const currentLang = document.body.classList.contains('marathi') ? 'mr' : 'en';
    localStorage.setItem('muktai-lang', currentLang);

    // 3. Auto-Close Menu (The Fix)
    const nav = document.getElementById('navMenu');
    const btn = document.querySelector('.menu-toggle');
    if (nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
        if(btn) btn.classList.remove('active');
    }
};

// Initialize Language Immediately
(function initLanguage() {
    const savedLang = localStorage.getItem('muktai-lang');
    if (savedLang === 'en') {
        document.body.classList.remove('marathi');
    } else {
        document.body.classList.add('marathi'); // Default
    }
})();

// ... rest of your file (loadComponents) stays the same ...