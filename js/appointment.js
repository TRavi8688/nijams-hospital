'use strict';

const HOSPITAL_WHATSAPP = '919177363774'; // 9177363774

function redirectToWhatsApp(message) {
  const encodedMsg = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${HOSPITAL_WHATSAPP}?text=${encodedMsg}`;
  
  // Try opening in a new tab/window, fallback to current window
  const opened = window.open(whatsappUrl, '_blank');
  if (!opened || opened.closed || typeof opened.closed === 'undefined') {
    window.location.href = whatsappUrl;
  }
}

// ─── 1. Home Page Quick Appointment Form ──────────────────────────────────────

function initQuickAppointment() {
  const form = document.getElementById('appointment-form');
  const dateInput = document.getElementById('appt-date');
  const slotsContainer = document.getElementById('time-slots-container');
  const modal = document.getElementById('confirmation-modal');
  const modalClose = document.getElementById('modal-close');
  const modalOverlay = document.getElementById('modal-overlay');
  const summaryDiv = document.getElementById('booking-summary');

  if (!form) return;

  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;
  }

  const times = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM', '05:30 PM', '06:30 PM'];
  let selectedTime = times[0];

  function renderSlots() {
    if (!slotsContainer) return;
    slotsContainer.innerHTML = '<strong style="width:100%;font-size:0.85rem;margin-bottom:4px;display:block;">Select Preferred Time:</strong>';
    times.forEach(t => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'time-slot-chip' + (t === selectedTime ? ' selected' : '');
      chip.textContent = t;
      chip.addEventListener('click', () => {
        selectedTime = t;
        document.querySelectorAll('.time-slot-chip').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
      });
      slotsContainer.appendChild(chip);
    });
  }

  renderSlots();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('appt-name')?.value?.trim();
    const phone = document.getElementById('appt-phone')?.value?.trim();
    const specialty = document.getElementById('appt-specialty')?.value?.trim();
    const date = document.getElementById('appt-date')?.value?.trim();

    if (!name || !phone || !specialty || !date) {
      alert('Please fill in all required fields.');
      return;
    }

    const bookingRef = 'NLS-' + Math.floor(100000 + Math.random() * 900000);
    
    // Construct WhatsApp message
    const whatsappMessage = 
`*New Appointment Booking Request* 🏥
*Hospital*: Nizam's Little Star Children Hospital, Nellore
*Booking Ref*: ${bookingRef}

• *Parent / Guardian*: ${name}
• *Phone*: ${phone}
• *Department*: ${specialty}
• *Preferred Date*: ${date}
• *Preferred Time*: ${selectedTime}

Please confirm my appointment. Thank you!`;

    const whatsappUrl = `https://wa.me/${HOSPITAL_WHATSAPP}?text=${encodeURIComponent(whatsappMessage)}`;

    if (summaryDiv) {
      summaryDiv.innerHTML = `
        <div style="background:#F0FDF4;border:1.5px solid #86EFAC;padding:16px;border-radius:12px;text-align:left;margin:16px 0;font-size:0.92rem;">
          <p style="margin-bottom:6px;"><strong>Booking ID:</strong> <span style="color:#1D4ED8;font-weight:800;">${bookingRef}</span></p>
          <p style="margin-bottom:6px;"><strong>Patient / Parent:</strong> ${name}</p>
          <p style="margin-bottom:6px;"><strong>Specialty:</strong> ${specialty}</p>
          <p style="margin-bottom:6px;"><strong>Date & Time:</strong> ${date} at ${selectedTime}</p>
          <p style="margin-bottom:0;"><strong>Contact:</strong> ${phone}</p>
        </div>
        <a href="${whatsappUrl}" target="_blank" class="btn btn-whatsapp btn-lg" style="width:100%;margin-top:10px;">
          <i class="fab fa-whatsapp"></i> Send Booking via WhatsApp (9177363774)
        </a>
      `;
    }

    if (modal) {
      modal.hidden = false;
      modal.style.display = 'flex';
    }

    // Auto redirect to WhatsApp after 800ms
    setTimeout(() => {
      redirectToWhatsApp(whatsappMessage);
    }, 800);
  });

  const closeModal = () => {
    if (modal) {
      modal.hidden = true;
      modal.style.display = 'none';
    }
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);
}

// ─── 2. Contact Page Full Appointment Form ────────────────────────────────────

function initContactAppointment() {
  const contactForm = document.getElementById('contact-form');
  const dateInput = document.getElementById('contact-date');
  const successDiv = document.getElementById('contact-success');

  if (!contactForm) return;

  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;
  }

  // Pre-fill doctor if in URL param e.g. contact.html?doctor=Dr.%20S.%20Nizamuddin
  const urlParams = new URLSearchParams(window.location.search);
  const doctorParam = urlParams.get('doctor');
  if (doctorParam) {
    const msgArea = document.getElementById('contact-message');
    if (msgArea) {
      msgArea.value = `Consultation requested with ${decodeURIComponent(doctorParam)}.`;
    }
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const parentName = document.getElementById('contact-name')?.value?.trim();
    const phone = document.getElementById('contact-phone')?.value?.trim();
    const childName = document.getElementById('contact-child-name')?.value?.trim();
    const childAge = document.getElementById('contact-child-age')?.value?.trim();
    const specialty = document.getElementById('contact-specialty')?.value?.trim();
    const date = document.getElementById('contact-date')?.value?.trim();
    const symptoms = document.getElementById('contact-message')?.value?.trim() || 'General Checkup';

    if (!parentName || !phone || !childName || !childAge || !specialty || !date) {
      alert('Please fill out all required fields marked with *.');
      return;
    }

    const bookingRef = 'NLS-' + Math.floor(100000 + Math.random() * 900000);

    // Construct formatted WhatsApp message
    const whatsappMessage = 
`*Doctor Consultation & Appointment Request* 🏥
*Hospital*: Nizam's Little Star Children Hospital, Nellore
*Booking Ref*: ${bookingRef}

• *Parent / Guardian*: ${parentName}
• *Phone*: ${phone}
• *Child Name*: ${childName}
• *Child Age*: ${childAge}
• *Department*: ${specialty}
• *Preferred Date*: ${date}
• *Symptoms / Query*: ${symptoms}

Please confirm my appointment slot. Thank you!`;

    const whatsappUrl = `https://wa.me/${HOSPITAL_WHATSAPP}?text=${encodeURIComponent(whatsappMessage)}`;

    if (successDiv) {
      successDiv.hidden = false;
      successDiv.style.display = 'block';
      successDiv.innerHTML = `
        <div style="background:#F0FDF4;border:1.5px solid #86EFAC;padding:16px;border-radius:12px;margin-top:16px;">
          <h4 style="color:#059669;margin-bottom:6px;display:flex;align-items:center;gap:8px;">
            <i class="fas fa-check-circle"></i> Redirecting to WhatsApp...
          </h4>
          <p style="margin-bottom:12px;font-size:0.9rem;color:#1E293B;">
            Your details have been formatted. Opening WhatsApp to connect directly with our hospital desk...
          </p>
          <a href="${whatsappUrl}" target="_blank" class="btn btn-whatsapp btn-lg" style="width:100%;">
            <i class="fab fa-whatsapp"></i> Click to Open WhatsApp (9177363774)
          </a>
        </div>
      `;
    }

    // Auto redirect to WhatsApp after 800ms
    setTimeout(() => {
      redirectToWhatsApp(whatsappMessage);
    }, 800);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initQuickAppointment();
  initContactAppointment();
});
