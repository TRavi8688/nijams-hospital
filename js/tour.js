'use strict';

const tourRooms = [
  { id: 1, name: 'Main Hospital Building & Facade', icon: 'fa-hospital', desc: '50-bedded pediatric specialty hospital located opposite District Court, Near Madras Busstand, Nellore.' },
  { id: 2, name: 'Neonatal ICU (NICU Level III)', icon: 'fa-baby', desc: 'Preterm ventilator care, dual phototherapy units, exchange blood transfusion, and multipara monitors.' },
  { id: 3, name: 'Pediatric ICU (PICU)', icon: 'fa-heartbeat', desc: 'Specialized intensive care for pediatric heart ailments, severe pneumonia, fits, and critical fever management.' },
  { id: 4, name: '24/7 Oxygen Ambulance', icon: 'fa-ambulance', desc: 'Dedicated pediatric emergency ambulance with oxygen and life support transport services.' },
  { id: 5, name: '24 Hours Laboratory & Mobile X-Ray', icon: 'fa-vial', desc: 'Mobile digital X-Ray and automatic biochemistry analyzers for instant round-the-clock test results.' },
  { id: 6, name: 'State-of-the-Art Operation Theatre', icon: 'fa-hospital-user', desc: 'Modern modular surgical suite equipped for general and advanced pediatric surgical procedures.' },
  { id: 7, name: '24/7 In-House Pharmacy', icon: 'fa-pills', desc: 'Round-the-clock pharmacy stocked with all essential pediatric and neonatal medications.' },
  { id: 8, name: 'Vaccination & Child Wellness Clinic', icon: 'fa-syringe', desc: 'Complete immunization center for infants, children, and teenagers up to 18 years.' }
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
      <div class="tour-thumb reveal visible" data-idx="${idx}">
        <div class="tour-thumb-display">
          <i class="fas ${room.icon}"></i>
        </div>
        <h3>${room.name}</h3>
        <p>${room.desc}</p>
      </div>
    `).join('');

    $$('.tour-thumb', grid).forEach(card => {
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
    if (roomDisplay) roomDisplay.innerHTML = `<i class="fas ${room.icon}"></i>`;
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
