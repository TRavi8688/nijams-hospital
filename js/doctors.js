'use strict';

const doctorsData = [
  {
    id: 1,
    name: 'Dr. S. Nizamuddin',
    specialty: 'Neonatal ICU (NICU) & Pediatrics',
    credentials: 'MBBS, MD (Pediatrics), Fellowship in Neonatology',
    experience: '18+ Years Experience',
    rating: '5.0',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    initials: 'SN'
  },
  {
    id: 2,
    name: 'Dr. K. Ramesh Kumar',
    specialty: 'Pediatric Intensive Care (PICU)',
    credentials: 'MBBS, MD (Pediatrics), DNB (PICU)',
    experience: '14+ Years Experience',
    rating: '4.9',
    days: ['Mon', 'Wed', 'Fri', 'Sat'],
    initials: 'RK'
  },
  {
    id: 3,
    name: 'Dr. P. Swathi Reddy',
    specialty: 'Pediatric Surgery',
    credentials: 'MBBS, MS (General Surgery), MCh (Pediatric Surgery)',
    experience: '12+ Years Experience',
    rating: '4.9',
    days: ['Tue', 'Thu', 'Sat'],
    initials: 'SR'
  },
  {
    id: 4,
    name: 'Dr. M. Venkata Rao',
    specialty: 'Pediatric Cardiology',
    credentials: 'MBBS, MD, DM (Cardiology)',
    experience: '15+ Years Experience',
    rating: '4.8',
    days: ['Mon', 'Wed', 'Fri'],
    initials: 'VR'
  },
  {
    id: 5,
    name: 'Dr. A. Madhavi Latha',
    specialty: 'General Pediatrics & Immunization',
    credentials: 'MBBS, DCH, DNB (Pediatrics)',
    experience: '16+ Years Experience',
    rating: '5.0',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    initials: 'ML'
  },
  {
    id: 6,
    name: 'Dr. T. Rajesh Naidu',
    specialty: 'Pediatric Pulmonology & Asthma',
    credentials: 'MBBS, MD (Pediatrics)',
    experience: '10+ Years Experience',
    rating: '4.8',
    days: ['Tue', 'Thu', 'Sat'],
    initials: 'RN'
  },
  {
    id: 7,
    name: 'Dr. G. Haritha',
    specialty: 'Pediatric Neurology & Seizures',
    credentials: 'MBBS, MD, DM (Neurology)',
    experience: '11+ Years Experience',
    rating: '4.9',
    days: ['Mon', 'Thu', 'Sat'],
    initials: 'GH'
  },
  {
    id: 8,
    name: 'Dr. B. Suresh',
    specialty: 'Pediatric Orthopedics',
    credentials: 'MBBS, MS (Ortho), Fellowship Pediatric Orthopedics',
    experience: '13+ Years Experience',
    rating: '4.7',
    days: ['Wed', 'Fri', 'Sat'],
    initials: 'BS'
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
      <div class="doctor-card reveal visible">
        <div class="doctor-avatar notranslate" translate="no">${doc.initials}</div>
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
