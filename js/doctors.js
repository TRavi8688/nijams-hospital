'use strict';

const doctorsData = [
  {
    id: 1,
    name: 'Dr. Mohammed Nizam',
    specialty: 'Founder & Chief Consultant - Neonatal ICU (NICU) & Pediatrics',
    credentials: 'M.B.B.S., (Osm.) D.C.H., NLS (Manchester, UK), MRCPCH (London, UK)',
    experience: '20+ Years Experience',
    rating: '5.0',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    initials: 'MN',
    image: 'assets/dr-nizam.png'
  }
];

function initDoctors() {
  const grid = $('#doctors-grid');
  const searchInput = $('#doctor-search');
  const specialtyFilter = $('#specialty-filter');
  const todayOnlyCheckbox = $('#today-only');
  const resultsCount = $('#results-count');
  const noResults = $('#no-results');

  if (!grid) return;

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayName = dayNames[new Date().getDay()];

  function renderDoctors() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const selectedSpecialty = specialtyFilter ? specialtyFilter.value : '';
    const todayOnly = todayOnlyCheckbox ? todayOnlyCheckbox.checked : false;

    const filtered = doctorsData.filter(doc => {
      const matchSearch = doc.name.toLowerCase().includes(query) || doc.specialty.toLowerCase().includes(query) || doc.credentials.toLowerCase().includes(query);
      const matchSpecialty = !selectedSpecialty || doc.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
      const matchToday = !todayOnly || doc.days.includes(todayName);
      return matchSearch && matchSpecialty && matchToday;
    });

    if (resultsCount) resultsCount.textContent = `Showing ${filtered.length} doctor${filtered.length !== 1 ? 's' : ''}`;

    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (noResults) noResults.hidden = false;
      return;
    }

    if (noResults) noResults.hidden = true;

    grid.innerHTML = filtered.map(doc => `
      <div class="doctor-card reveal visible" style="text-align:center;">
        ${doc.image 
          ? `<div class="doctor-avatar notranslate" translate="no" style="width:160px;height:160px;border-radius:50%;overflow:hidden;padding:0;border:3.5px solid var(--accent-yellow);box-shadow:0 8px 20px rgba(0,0,0,0.15);margin:0 auto 15px auto;"><img src="${doc.image}" alt="${doc.name}" style="width:100%;height:100%;object-fit:cover;object-position:center top;"></div>`
          : `<div class="doctor-avatar notranslate" translate="no">${doc.initials}</div>`
        }
        <h3 class="notranslate" translate="no">${doc.name}</h3>
        <div class="doctor-specialty">${doc.specialty}</div>
        <div class="doctor-creds"><span class="notranslate" translate="no">${doc.credentials}</span> • ${doc.experience}</div>
        <div class="doctor-rating"><i class="fas fa-star"></i> ${doc.rating} <span>(Rating)</span></div>
        <div class="doctor-avail">
          <span class="badge badge-yellow">Available: ${doc.days.join(', ')}</span>
        </div>
        <a href="contact.html?doctor=${encodeURIComponent(doc.name)}" class="btn btn-primary btn-sm" style="margin-top:10px;">
          <i class="fas fa-calendar-check"></i> Book Consultation
        </a>
      </div>
    `).join('');
  }

  if (searchInput) searchInput.addEventListener('input', renderDoctors);
  if (specialtyFilter) specialtyFilter.addEventListener('change', renderDoctors);
  if (todayOnlyCheckbox) todayOnlyCheckbox.addEventListener('change', renderDoctors);

  renderDoctors();
}

document.addEventListener('DOMContentLoaded', initDoctors);
