'use strict';

const indianLanguages = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'ur', name: 'Urdu', native: 'اردو' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', native: 'অসমীয়া' }
];

// Initialize Google Translate Element
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    includedLanguages: 'en,te,hi,ta,kn,ml,mr,bn,gu,pa,ur,or,as',
    autoDisplay: false
  }, 'google_translate_element');
}

// Function to trigger language change via Google Translate iframe/cookie
function changeLanguage(langCode) {
  localStorage.setItem('selected_lang', langCode);

  // Set Google translate cookie
  const hostname = window.location.hostname;
  document.cookie = `googtrans=/en/${langCode}; path=/; domain=${hostname}`;
  document.cookie = `googtrans=/en/${langCode}; path=/;`;

  // Select dropdown inside Google Translate widget if present
  const selectElem = document.querySelector('.goog-te-combo');
  if (selectElem) {
    selectElem.value = langCode;
    selectElem.dispatchEvent(new Event('change'));
  } else {
    window.location.reload();
  }
}

// Populate and setup custom language selector
function initCustomLanguageSelector() {
  const currentLang = localStorage.getItem('selected_lang') || 'en';

  // 1. Desktop Dropdown Setup
  const desktopSelector = document.getElementById('lang-select-dropdown');
  const desktopBtn = document.getElementById('lang-toggle-btn');
  const desktopMenu = document.getElementById('lang-menu');

  if (desktopMenu) {
    desktopMenu.innerHTML = indianLanguages.map(lang => `
      <button class="lang-option ${lang.code === currentLang ? 'active' : ''}" data-code="${lang.code}">
        <span class="lang-native">${lang.native}</span>
        <span class="lang-name">${lang.name}</span>
      </button>
    `).join('');

    // Toggle dropdown open
    if (desktopBtn) {
      desktopBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        desktopSelector.classList.toggle('open');
      });
    }

    // Option clicks
    desktopMenu.querySelectorAll('.lang-option').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = btn.dataset.code;
        changeLanguage(code);
        desktopSelector.classList.remove('open');
      });
    });

    // Close on click outside
    document.addEventListener('click', () => {
      if (desktopSelector) desktopSelector.classList.remove('open');
    });
  }

  // 2. Mobile Drawer Language Grid Setup
  const mobileLangGrid = document.getElementById('mobile-lang-grid');
  if (mobileLangGrid) {
    mobileLangGrid.innerHTML = indianLanguages.map(lang => `
      <button class="mobile-lang-chip ${lang.code === currentLang ? 'active' : ''}" data-code="${lang.code}">
        <strong>${lang.native}</strong>
        <small>${lang.name}</small>
      </button>
    `).join('');

    mobileLangGrid.querySelectorAll('.mobile-lang-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const code = btn.dataset.code;
        changeLanguage(code);
      });
    });
  }
}

// Load Google Translate script dynamically
function loadGoogleTranslate() {
  if (document.getElementById('google-translate-script')) return;

  const script = document.createElement('script');
  script.id = 'google-translate-script';
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  document.body.appendChild(script);
}

window.googleTranslateElementInit = googleTranslateElementInit;

document.addEventListener('DOMContentLoaded', () => {
  initCustomLanguageSelector();
  loadGoogleTranslate();
});
