'use strict';

const tourRooms = [
  {
    id: 1,
    name: 'Child-Friendly Consultations',
    category: 'Outpatient Clinic',
    image: 'assets/gallery-doctor-care.jpg',
    desc: 'Welcoming consultation suites designed with cheerful colors and child-friendly seating to ensure a stress-free checkup.'
  },
  {
    id: 2,
    name: 'Neonatal Intensive Care (Level III NICU)',
    category: 'Intensive Care',
    image: 'assets/gallery-nicu-care.jpg',
    desc: 'Advanced infant incubators with preterm ventilator support, phototherapy, exchange transfusion, and 24/7 neonatologist monitoring.'
  },
  {
    id: 3,
    name: '24/7 Pediatric Emergency Center',
    category: 'Emergency & Trauma',
    image: 'assets/gallery-emergency.jpg',
    desc: 'Round-the-clock emergency casualty with dedicated pediatric resuscitation beds, multi-parameter monitors, and rapid triage.'
  },
  {
    id: 4,
    name: 'Pediatric Wellness & Play Lounge',
    category: 'Child Care Area',
    image: 'assets/gallery-play-area.jpg',
    desc: 'Colorful recovery lounges equipped with toys, books, and gentle lighting to comfort children and families during hospital visits.'
  },
  {
    id: 5,
    name: '24/7 Dedicated Oxygen Ambulance',
    category: 'Emergency Transport',
    image: 'assets/gallery-emergency.jpg',
    desc: 'Equipped with transport incubators, neonatal oxygen support, and emergency vital equipment for rapid patient transit.'
  },
  {
    id: 6,
    name: '24 Hours Digital Lab & Mobile X-Ray',
    category: 'Diagnostics',
    image: 'assets/gallery-nicu-care.jpg',
    desc: 'Fully automated biochemistry analyzers, hematology lab, and mobile bedside digital X-Ray for rapid emergency diagnostic results.'
  }
];

function initTour() {
  const grid = $('#tour-grid');
  const overlay = $('#lightbox-overlay');
  const closeBtn = $('#lightbox-close');
  const prevBtn = $('#lightbox-prev');
  const nextBtn = $('#lightbox-next');
  const roomName = $('#lightbox-room-name');
  const roomDesc = $('#lightbox-room-desc');
  const roomDisplay = $('#lightbox-room-display');

  if (!grid) return;

  let currentIdx = 0;

  function renderGrid() {
    grid.innerHTML = tourRooms.map((room, idx) => `
      <div class="tour-card reveal visible" data-idx="${idx}">
        <div class="tour-card-img-wrap">
          <img src="${room.image}" alt="${room.name}" class="tour-card-img">
          <div class="tour-card-badge"><i class="fas fa-star"></i> ${room.category}</div>
        </div>
        <div class="tour-card-body">
          <h3>${room.name}</h3>
          <p>${room.desc}</p>
          <div class="tour-card-cta">View Details <i class="fas fa-arrow-right"></i></div>
        </div>
      </div>
    `).join('');

    $$('.tour-card', grid).forEach(card => {
      card.addEventListener('click', () => {
        openLightbox(parseInt(card.dataset.idx, 10));
      });
    });
  }

  function openLightbox(idx) {
    currentIdx = idx;
    const room = tourRooms[currentIdx];
    if (roomName) roomName.textContent = room.name;
    if (roomDesc) roomDesc.textContent = room.desc;
    if (roomDisplay) {
      roomDisplay.innerHTML = `<img src="${room.image}" alt="${room.name}">`;
    }
    if (overlay) overlay.hidden = false;
  }

  function closeLightbox() {
    if (overlay) overlay.hidden = true;
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => {
    currentIdx = (currentIdx - 1 + tourRooms.length) % tourRooms.length;
    openLightbox(currentIdx);
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % tourRooms.length;
    openLightbox(currentIdx);
  });

  renderGrid();
}

document.addEventListener('DOMContentLoaded', initTour);
