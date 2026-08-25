'use strict';

const doctorsList = [
  { id: 1, name: 'Dr. Aisha Nizam', specialty: 'Pediatric Cardiology', creds: 'MBBS, MD (Pediatrics), DM (Cardiology)', exp: '16 yrs exp', rating: 4.9, days: ['Mon', 'Wed', 'Fri'], bio: 'Specialist in congenital heart disease and pediatric echocardiography.' },
  { id: 2, name: 'Dr. Rajiv Sharma', specialty: 'Neonatal ICU', creds: 'MBBS, MD, Fellowship in Neonatology', exp: '14 yrs exp', rating: 4.8, days: ['Tue', 'Thu', 'Sat', 'Sun'], bio: 'Expert in extreme preterm care and advanced neonatal life support.' },
  { id: 3, name: 'Dr. Priya Reddy', specialty: 'Pediatric Surgery', creds: 'MBBS, MS (General Surgery), MCh (Pediatric Surgery)', exp: '11 yrs exp', rating: 4.9, days: ['Mon', 'Tue', 'Thu'], bio: 'Leader in minimally invasive and laparoscopic pediatric surgery.' },
  { id: 4, name: 'Dr. Farrukh Ahmed', specialty: 'Pediatric Neurology', creds: 'MBBS, MD, DM (Neurology)', exp: '18 yrs exp', rating: 4.9, days: ['Mon', 'Wed', 'Fri'], bio: 'Specialized in childhood epilepsy, neurometabolic disorders, and developmental delay.' },
  { id: 5, name: 'Dr. Sunita Patel', specialty: 'Pediatric Orthopedics', creds: 'MBBS, MS (Ortho), Fellowship Pediatric Ortho', exp: '10 yrs exp', rating: 4.7, days: ['Tue', 'Fri', 'Sat'], bio: 'Expert in pediatric deformity correction, fractures, and bone disorders.' },
  { id: 6, name: 'Dr. Meera Krishnan', specialty: 'ENT', creds: 'MBBS, MS (ENT)', exp: '12 yrs exp', rating: 4.8, days: ['Mon', 'Wed', 'Thu', 'Sat'], bio: 'Expertise in pediatric airway disorders, cochlear implants, and adenotonsillectomy.' },
  { id: 7, name: 'Dr. Omar Khan', specialty: 'Pediatric Dermatology', creds: 'MBBS, MD (Dermatology)', exp: '9 yrs exp', rating: 4.8, days: ['Tue', 'Thu', 'Sat'], bio: 'Specialist in childhood eczema, vascular birthmarks, and rare genetic skin conditions.' },
  { id: 8, name: 'Dr. Lakshmi Devi', specialty: 'General Pediatrics', creds: 'MBBS, MD (Pediatrics), DCH', exp: '22 yrs exp', rating: 5.0, days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], bio: 'Beloved pediatrician dedicated to comprehensive child wellness and growth tracking.' },
  { id: 9, name: 'Dr. Arjun Menon', specialty: 'Pediatric Oncology', creds: 'MBBS, MD, DM (Pediatric Oncology)', exp: '15 yrs exp', rating: 4.9, days: ['Mon', 'Wed', 'Fri'], bio: 'Pioneering compassionate cancer treatments and bone marrow transplants.' },
  { id: 10, name: 'Dr. Zara Hussain', specialty: 'Pediatric Endocrinology', creds: 'MBBS, MD, Fellowship in Endocrinology', exp: '8 yrs exp', rating: 4.7, days: ['Tue', 'Fri'], bio: 'Focuses on type 1 diabetes, growth hormone deficiencies, and thyroid care.' },
  { id: 11, name: 'Dr. Vivek Naidu', specialty: 'Pediatric Pulmonology', creds: 'MBBS, MD, Fellowship in Respiratory Care', exp: '13 yrs exp', rating: 4.8, days: ['Mon', 'Thu', 'Sat'], bio: 'Expert in childhood asthma, chronic cough, and cystic fibrosis management.' },
  { id: 12, name: 'Dr. Ananya Singh', specialty: 'Pediatric Rheumatology', creds: 'MBBS, MD, Fellowship in Rheumatology', exp: '7 yrs exp', rating: 4.6, days: ['Wed', 'Fri'], bio: 'Specialist in juvenile idiopathic arthritis and autoimmune conditions in children.' }
];

function initDoctors() {
  const grid = document.getElementById('doctors-grid');
  const searchInput = document.getElementById('doctor-search');
  const specialtySelect = document.getElementById('specialty-filter');
  const todayCheckbox = document.getElementById('today-only');
  const resultsCount = document.getElementById('results-count');
  const noResults = document.getElementById('no-results');

  if (!grid) return;

  const currentDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date().getDay()];

  function filterAndRender() {
    const q = (searchInput?.value || '').toLowerCase().trim();
    const specialty = specialtySelect?.value || '';
    const todayOnly = todayCheckbox?.checked || false;

    const filtered = doctorsList.filter(doc => {
      const matchQuery = doc.name.toLowerCase().includes(q) || doc.specialty.toLowerCase().includes(q) || doc.bio.toLowerCase().includes(q);
      const matchSpecialty = !specialty || doc.specialty.toLowerCase() === specialty.toLowerCase();
      const matchToday = !todayOnly || doc.days.includes(currentDay);
      return matchQuery && matchSpecialty && matchToday;
    });

    if (resultsCount) {
      resultsCount.textContent = `Showing ${filtered.length} doctor${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (noResults) noResults.hidden = false;
      return;
    }

    if (noResults) noResults.hidden = true;

    grid.innerHTML = filtered.map(doc => {
      const isToday = doc.days.includes(currentDay);
      const initials = doc.name.split(' ').map(n => n[0]).join('').slice(1, 3);
      return `
        <div class="doctor-card reveal visible">
          <div class="doctor-avatar">${initials}</div>
          <h3>${doc.name}</h3>
          <div class="doctor-specialty">${doc.specialty}</div>
          <div class="doctor-creds">${doc.creds} • ${doc.exp}</div>
          <div class="doctor-rating">
            ★ ★ ★ ★ ★ <span>${doc.rating}</span>
          </div>
          <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:12px;">${doc.bio}</p>
          <div class="doctor-avail">
            <span class="badge ${isToday ? 'badge-success' : 'badge-primary'}">
              ${isToday ? '● Available Today' : 'Next: ' + doc.days[0]}
            </span>
          </div>
          <a href="contact.html?doctor=${encodeURIComponent(doc.name)}" class="btn btn-primary btn-sm" style="margin-top:auto;">
            <i class="fas fa-calendar-plus"></i> Book with ${doc.name.split(' ')[1]}
          </a>
        </div>
      `;
    }).join('');
  }

  if (searchInput) searchInput.addEventListener('input', filterAndRender);
  if (specialtySelect) specialtySelect.addEventListener('change', filterAndRender);
  if (todayCheckbox) todayCheckbox.addEventListener('change', filterAndRender);

  // Check URL params for dept
  const urlParams = new URLSearchParams(window.location.search);
  const deptParam = urlParams.get('dept');
  if (deptParam && specialtySelect) {
    for (let opt of specialtySelect.options) {
      if (opt.text.toLowerCase().includes(deptParam.toLowerCase())) {
        specialtySelect.value = opt.value;
        break;
      }
    }
  }

  filterAndRender();
}

document.addEventListener('DOMContentLoaded', initDoctors);