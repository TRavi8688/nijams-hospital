'use strict';

function initAppointment() {
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

  const times = ['09:00 AM', '10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM', '05:30 PM'];
  let selectedTime = times[0];

  function renderSlots() {
    if (!slotsContainer) return;
    slotsContainer.innerHTML = '<strong style="width:100%;font-size:0.85rem;margin-bottom:4px;display:block;">Select Available Time Slot:</strong>';
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
    const name = document.getElementById('appt-name')?.value;
    const phone = document.getElementById('appt-phone')?.value;
    const specialty = document.getElementById('appt-specialty')?.value;
    const date = document.getElementById('appt-date')?.value;

    if (!name || !phone || !specialty || !date) {
      alert('Please fill out all required fields.');
      return;
    }

    const bookingRef = 'NLS-' + Math.floor(100000 + Math.random() * 900000);
    if (summaryDiv) {
      summaryDiv.innerHTML = `
        <div style="background:var(--bg-secondary);padding:16px;border-radius:12px;text-align:left;margin:16px 0;font-size:0.95rem;">
          <p style="margin-bottom:6px;"><strong>Booking ID:</strong> <span style="color:var(--primary-blue);font-weight:700;">${bookingRef}</span></p>
          <p style="margin-bottom:6px;"><strong>Patient / Parent:</strong> ${name}</p>
          <p style="margin-bottom:6px;"><strong>Specialty:</strong> ${specialty}</p>
          <p style="margin-bottom:6px;"><strong>Date & Time:</strong> ${date} at ${selectedTime}</p>
          <p style="margin-bottom:0;"><strong>Contact:</strong> ${phone}</p>
        </div>
      `;
    }

    if (modal) {
      modal.hidden = false;
      modal.style.display = 'flex';
    }
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

document.addEventListener('DOMContentLoaded', initAppointment);