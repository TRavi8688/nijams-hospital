'use strict';

const testimonialsData = [
  { name: 'Fatima Al-Rashid', role: 'Mother of Ayaan (4 yrs)', dept: 'Pediatric Cardiology', rating: 5, quote: 'Dr. Aisha identified our son\'s heart condition that three other hospitals missed. The care here saved his life. We are forever grateful.' },
  { name: 'Ramesh Gupta', role: 'Father of Ananya (3 yrs)', dept: 'Neonatal ICU', rating: 5, quote: 'My daughter was born premature and the NICU team at Nizam Little Star were absolute angels. She\'s a thriving, healthy toddler now!' },
  { name: 'Sarah Johnson', role: 'Mother of Liam (7 yrs)', dept: 'General Pediatrics', rating: 5, quote: 'From the moment we walked in, the staff made us feel at ease. The doctors explain everything clearly and never make you feel rushed.' },
  { name: 'Mohammed Iqbal', role: 'Father of Zaid (10 yrs)', dept: 'Pediatric Surgery', rating: 5, quote: 'Best pediatric hospital in Hyderabad, hands down. The facilities are world-class and the surgeons are exceptionally skilled and kind.' },
  { name: 'Priya Venkatesh', role: 'Mother of Vihaan (5 yrs)', dept: 'Child Wellness', rating: 5, quote: 'The children\'s play areas and friendly environment helped my son forget he was in a hospital. Recovery was smooth and stress-free!' }
];

function initTestimonials() {
  const track = document.getElementById('testimonials-track');
  const dotsContainer = document.getElementById('carousel-dots');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  if (!track) return;

  let currentIndex = 0;
  let timer = null;

  function render() {
    const item = testimonialsData[currentIndex];
    track.innerHTML = `
      <div class="testimonial-card reveal visible">
        <p class="testimonial-quote">"${item.quote}"</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${item.name.charAt(0)}</div>
          <div class="testimonial-meta">
            <strong>${item.name}</strong>
            <span>${item.role} • ${item.dept}</span>
          </div>
        </div>
      </div>
    `;

    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      testimonialsData.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
        dot.addEventListener('click', () => {
          currentIndex = i;
          render();
          resetTimer();
        });
        dotsContainer.appendChild(dot);
      });
    }
  }

  function next() {
    currentIndex = (currentIndex + 1) % testimonialsData.length;
    render();
  }

  function prev() {
    currentIndex = (currentIndex - 1 + testimonialsData.length) % testimonialsData.length;
    render();
  }

  function resetTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(next, 5000);
  }

  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetTimer(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetTimer(); });

  render();
  resetTimer();
}

document.addEventListener('DOMContentLoaded', initTestimonials);