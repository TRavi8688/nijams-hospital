'use strict';

const rooms = [
  { name: 'Welcome & Registration Lobby', desc: 'Spacious, vibrant, and welcoming front desk designed to alleviate first-visit anxiety with dedicated family concierge.', bg: 'linear-gradient(135deg, #3A86FF 0%, #60A5FA 100%)', icon: 'fas fa-door-open' },
  { name: 'Children\'s Interactive Play Lounge', desc: 'Equipped with non-toxic sensory toys, storytelling nooks, and cartoon screens to keep kids engaged and relaxed.', bg: 'linear-gradient(135deg, #FFB703 0%, #FB8500 100%)', icon: 'fas fa-gamepad' },
  { name: 'Pediatric Inpatient Private Suites', desc: 'Cheerful, star-themed private rooms with dedicated sleeper couches for parents and en-suite facilities.', bg: 'linear-gradient(135deg, #2EC4B6 0%, #5EEAD4 100%)', icon: 'fas fa-bed' },
  { name: 'Level III Neonatal ICU (NICU)', desc: 'Ultra-sterile 24/7 intensive care with advanced Dräger incubators, HEPA airflow, and family bonding zones.', bg: 'linear-gradient(135deg, #8338EC 0%, #C084FC 100%)', icon: 'fas fa-baby' },
  { name: 'Modular Pediatric Operation Theaters', desc: 'State-of-the-art sterile surgical suites with child-specific anesthesia workstations and calming LED ceilings.', bg: 'linear-gradient(135deg, #E63946 0%, #FB7185 100%)', icon: 'fas fa-microscope' },
  { name: '24/7 Pediatric Emergency & Trauma Bay', desc: 'Immediate direct-access emergency department fully staffed with pediatric resuscitation specialists.', bg: 'linear-gradient(135deg, #D90429 0%, #EF233C 100%)', icon: 'fas fa-ambulance' },
  { name: 'Diagnostic Imaging & Friendly MRI/CT', desc: 'Low-dose radiation imaging featuring child-friendly themed scanner wraps that look like friendly submarines and spaceships.', bg: 'linear-gradient(135deg, #0284C7 0%, #38BDF8 100%)', icon: 'fas fa-x-ray' },
  { name: 'Outpatient Specialty Consultation Suites', desc: 'Soundproofed, soothing consultation spaces where pediatricians take the time to listen to both parents and kids.', bg: 'linear-gradient(135deg, #0D9488 0%, #2DD4BF 100%)', icon: 'fas fa-user-md' },
  { name: 'Pediatric Rehabilitation & Physio Gym', desc: 'Colorful gym equipped for physical, occupational, and sensory therapies designed for growing young bodies.', bg: 'linear-gradient(135deg, #EA580C 0%, #FB923C 100%)', icon: 'fas fa-heartbeat' }
];

function initTour() {
  const grid = document.getElementById('tour-grid');
  const overlay = document.getElementById('lightbox-overlay');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const display = document.getElementById('lightbox-room-display');
  const title = document.getElementById('lightbox-room-name');
  const desc = document.getElementById('lightbox-room-desc');

  if (!grid) return;

  let currentIndex = 0;

  grid.innerHTML = rooms.map((r, i) => `
    <div class="tour-card reveal visible" onclick="window.openLightbox(${i})">
      <div class="tour-img" style="background:${r.bg};">
        <i class="${r.icon}" style="font-size:3rem;opacity:0.9;"></i>
        <div class="tour-overlay">
          <span class="tour-overlay-btn"><i class="fas fa-expand"></i> Explore Room</span>
        </div>
      </div>
      <div class="tour-card-body">
        <h3>${r.name}</h3>
        <p>${r.desc}</p>
      </div>
    </div>
  `).join('');

  function showRoom(index) {
    currentIndex = index;
    const r = rooms[currentIndex];
    if (display) {
      display.style.background = r.bg;
      display.innerHTML = `<i class="${r.icon}"></i>`;
    }
    if (title) title.textContent = r.name;
    if (desc) desc.textContent = r.desc;
    if (overlay) {
      overlay.hidden = false;
      overlay.style.display = 'flex';
    }
  }

  window.openLightbox = showRoom;

  function close() {
    if (overlay) {
      overlay.hidden = true;
      overlay.style.display = 'none';
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (prevBtn) prevBtn.addEventListener('click', () => {
    showRoom((currentIndex - 1 + rooms.length) % rooms.length);
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    showRoom((currentIndex + 1) % rooms.length);
  });

  document.addEventListener('keydown', (e) => {
    if (!overlay || overlay.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prevBtn?.click();
    if (e.key === 'ArrowRight') nextBtn?.click();
  });
}

document.addEventListener('DOMContentLoaded', initTour);