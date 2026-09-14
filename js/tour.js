'use strict';

const tourRooms = [
  {
    id: 1,
    name: "Nizam's Little Star Hospital Building",
    category: 'Hospital',
    image: 'assets/hospital-building.png',
    desc: 'Main hospital building located near Madras Busstand, Opp: District Court in Nellore, equipped with 24/7 hospital and emergency care.'
  },
  {
    id: 2,
    name: 'Level III Neonatal Intensive Care Unit (NICU)',
    category: 'Intensive Care',
    image: 'assets/nicu-real-1.png',
    desc: 'Advanced infant incubators with ventilator support, phototherapy units, exchange transfusion, and 24/7 neonatologist monitoring.'
  },
  {
    id: 3,
    name: 'Modular Operation Theatre',
    category: 'Surgical Suite',
    image: 'assets/operation-theatre-new.jpg',
    desc: 'Ultra-modern sterile modular surgical theater fully equipped for pediatric surgeries and emergency procedures.'
  },
  {
    id: 4,
    name: 'Pediatric ICU (PICU) & Inpatient Ward',
    category: 'Inpatient Care',
    image: 'assets/inpatient-ward.png',
    desc: 'Clean, well-equipped pediatric ward with vital monitors, oxygen lines, and round-the-clock nursing care.'
  },
  {
    id: 5,
    name: '24/7 Specialized NICU Patient Care',
    category: 'Neonatal Care',
    image: 'assets/nicu-real-2.jpg',
    desc: 'Dedicated nursing staff and pediatric specialists delivering round-the-clock monitoring and compassionate care for newborns.'
  },
  {
    id: 6,
    name: 'NICU Infrastructure & Oxygen Support Unit',
    category: 'Hospital Facilities',
    image: 'assets/nicu-real-3.png',
    desc: 'Fully equipped neonatal facility with central oxygen, multi-parameter monitors, and sterile environment.'
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
