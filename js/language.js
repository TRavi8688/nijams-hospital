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

// Dictionary of everyday, natural spoken replacements for machine-translated bookish/archaic jargon across ALL languages
const dailyLanguageOverrides = {
  te: [
    { pattern: /శిశు\s*పుత్ర\s*ఆసుపత్రి/gi, replacement: 'చిన్న పిల్లల ఆస్పత్రి' },
    { pattern: /శిశు\s*పుత్రుల\s*ఆసుపత్రి/gi, replacement: 'చిన్న పిల్లల ఆస్పత్రి' },
    { pattern: /శిశు\s*పుత్ర/gi, replacement: 'చిన్న పిల్లల' },
    { pattern: /శిశు\s*భవన/gi, replacement: 'చిన్న పిల్లల ఆస్పత్రి' },
    { pattern: /శిశు\s*నివాస/gi, replacement: 'చిన్న పిల్లల ఆస్పత్రి' },
    { pattern: /శిశు\s*వైద్యము/gi, replacement: 'పిల్లల వైద్యం' },
    { pattern: /శిశు\s*వైద్యుడు/gi, replacement: 'పిల్లల డాక్టర్' },
    { pattern: /శిశు\s*వైద్యులు/gi, replacement: 'పిల్లల డాక్టర్లు' },
    { pattern: /శిశు\s*వైద్యాధికారి/gi, replacement: 'పిల్లల చీఫ్ డాక్టర్' },
    { pattern: /శిశు\s*శల్య\s*చికిత్స/gi, replacement: 'పిల్లల ఆపరేషన్/శస్త్రచికిత్స' },
    { pattern: /శిశు\s*రక్షణ/gi, replacement: 'పిల్లల కేర్' },
    { pattern: /నవజాత\s*శిశు\s*విభాగము/gi, replacement: 'పసిపాపల ఐసియు (NICU)' },
    { pattern: /నవజాత\s*శిశు/gi, replacement: 'పసిపాప' },
    { pattern: /వైద్యుడిని\s*కనుగొనండి/gi, replacement: 'డాక్టర్ల వివరాలు' },
    { pattern: /సమాచార\s*వనరులు/gi, replacement: 'సౌకర్యాలు & పథకాలు' },
    { pattern: /వర్చువల్\s*టూర్/gi, replacement: 'హాస్పిటల్ ఫోటోలు' },
    { pattern: /సంప్రదింపుల\s*శోధన/gi, replacement: 'అపాయింట్‌మెంట్' },
    { pattern: /నియామకం/gi, replacement: 'అపాయింట్‌మెంట్' }
  ],
  hi: [
    { pattern: /शिशु\s*पुत्र\s*अस्पताल/gi, replacement: 'बच्चों का अस्पताल' },
    { pattern: /शिशु\s*पुत्र/gi, replacement: 'बच्चों का' },
    { pattern: /बाल\s*चिकित्सा/gi, replacement: 'बच्चों का इलाज' },
    { pattern: /शिशु\s*रोग\s*विशेषज्ञ/gi, replacement: 'बच्चों के डॉक्टर' },
    { pattern: /बाल\s*रोग\s*विशेषज्ञ/gi, replacement: 'बच्चों के डॉक्टर' },
    { pattern: /शल्य\s*चिकित्सा/gi, replacement: 'ऑपरेशन / सर्जरी' },
    { pattern: /आभासी\s*दौरा/gi, replacement: 'अस्पताल फोटो' },
    { pattern: /चिकित्सक\s*खोजें/gi, replacement: 'डॉक्टरों की सूची' },
    { pattern: /नियुक्ति/gi, replacement: 'अपॉइंटमेंट' }
  ],
  ta: [
    { pattern: /குழந்தை\s*மருத்துவம்/gi, replacement: 'குழந்தைகள் சிகிச்சை' },
    { pattern: /குழந்தை\s*மருத்துவர்/gi, replacement: 'குழந்தைகள் డాక్టర్' },
    { pattern: /அறுவை\s*சிகிச்சை/gi, replacement: 'ஆபரேஷன்' },
    { pattern: /மெய்நிகர்\s*சுற்றுப்பயணம்/gi, replacement: 'ஹாஸ்பிட்டல் படங்கள்' },
    { pattern: /நியமனம்/gi, replacement: 'அப்பாயிண்ட்மெண்ட்' }
  ],
  kn: [
    { pattern: /ಮಕ್ಕಳ\s*ಚಿಕಿತ್ಸೆ/gi, replacement: 'ಮಕ್ಕಳ ಆರೈಕೆ' },
    { pattern: /ಮಕ್ಕಳ\s*ವೈದ್ಯರು/gi, replacement: 'ಮಕ್ಕಳ ಡಾಕ್ಟರ್' },
    { pattern: /ವರ್ಚುವಲ್\s*ಪ್ರವಾಸ/gi, replacement: 'ಆಸ್ಪತ್ರೆಯ ಫೋಟೋಗಳು' }
  ],
  ml: [
    { pattern: /കുട്ടികളുടെ\s*ചികിത്സ/gi, replacement: 'കുട്ടികളുടെ പരിചരണം' },
    { pattern: /കുട്ടികളുടെ\s*ഡോക്ടർ/gi, replacement: 'കുട്ടികളുടെ ഡോക്ടർ' },
    { pattern: /വെർച്വൽ\s*ടൂർ/gi, replacement: 'ആശുപത്രി ചിത്രങ്ങൾ' }
  ],
  mr: [
    { pattern: /बालरोग\s*वैद्यक/gi, replacement: 'लहान मुलांचे उपचार' },
    { pattern: /बालरोगतज्ज्ञ/gi, replacement: 'मुलांचे डॉक्टर' },
    { pattern: /व्हर्च्युअल\s*टूर/gi, replacement: 'रुग्णालयाचे फोटो' }
  ],
  bn: [
    { pattern: /শিশু\s*চিকিৎসা/gi, replacement: 'শিশুদের চিকিৎসা' },
    { pattern: /শিশু\s*বিশেষজ্ঞ/gi, replacement: 'শিশুর ডাক্তার' },
    { pattern: /ভার্চুয়াল\s*ট্যুর/gi, replacement: 'হাসপাতালের ছবি' }
  ],
  gu: [
    { pattern: /બાળ\s*રોગ\s*ચિકિત્સા/gi, replacement: 'બાળકોનો ઇલાજ' },
    { pattern: /બાળરોગ\s*નિષ્ણાત/gi, replacement: 'બાળકોના ડોક્ટર' }
  ],
  pa: [
    { pattern: /ਬਾਲ\s*ਚਿਕਿਤਸਾ/gi, replacement: 'ਬੱਚਿਆਂ ਦਾ ਇਲਾਜ' },
    { pattern: /ਬਾਲ\s*ਰੋਗ\s*ਮਾਹਰ/gi, replacement: 'ਬੱਚਿਆਂ ਦੇ ਡਾਕਟਰ' }
  ],
  ur: [
    { pattern: /اطفال\s*کا\s*علاج/gi, replacement: 'بچوں کا علاج' },
    { pattern: /ماہر\s*امراض\s*اطفال/gi, replacement: 'بچوں کے ڈاکٹر' }
  ],
  or: [
    { pattern: /ଶିଶୁ\s*ଚିକିତ୍ସା/gi, replacement: 'ଛୋଟ ଛୁଆଙ୍କ ଚିକିତ୍ସା' },
    { pattern: /ଶିଶୁ\s*ଡାକ୍ତର/gi, replacement: 'ଛୁଆଙ୍କ ଡାକ୍ତର' }
  ],
  as: [
    { pattern: /শিশু\s*চিকিৎসা/gi, replacement: 'শিশুৰ চিকিৎসা' },
    { pattern: /শিশু\s*বিশেষজ্ঞ/gi, replacement: 'শিশুৰ ডাক্তাৰ' }
  ]
};

// Function to sanitize translated DOM text nodes so they use simple everyday spoken terms
function sanitizeTranslatedText() {
  const currentLang = localStorage.getItem('selected_lang') || 'en';
  if (!dailyLanguageOverrides[currentLang]) return;

  const replacements = dailyLanguageOverrides[currentLang];

  function processNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.nodeValue;
      if (!text || !text.trim()) return;
      let modified = false;

      replacements.forEach(r => {
        if (r.pattern.test(text)) {
          text = text.replace(r.pattern, r.replacement);
          modified = true;
        }
      });

      if (modified) {
        node.nodeValue = text;
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // Do not replace elements with class 'notranslate' or script/style tags
      if (node.classList && node.classList.contains('notranslate')) return;
      if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE' || node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') return;

      for (let child of node.childNodes) {
        processNode(child);
      }
    }
  }

  processNode(document.body);
}

// Observe DOM mutations to continuously apply daily spoken language corrections
function startLanguageSanitizer() {
  sanitizeTranslatedText();

  const observer = new MutationObserver(() => {
    sanitizeTranslatedText();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true
  });

  // Additional interval check for async Google Translate widget DOM updates
  setInterval(sanitizeTranslatedText, 1200);
}

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

  setTimeout(sanitizeTranslatedText, 500);
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
  startLanguageSanitizer();
});
