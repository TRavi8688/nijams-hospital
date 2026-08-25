'use strict';

function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => {
        i.classList.remove('open');
        const a = i.querySelector('.faq-answer');
        const b = i.querySelector('.faq-question');
        const icon = b ? b.querySelector('i') : null;
        if (a) a.style.display = 'none';
        if (icon) icon.style.transform = 'rotate(0deg)';
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.display = 'block';
        const icon = btn.querySelector('i');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  // Open first item by default
  const first = faqItems[0];
  if (first) {
    first.classList.add('open');
    const ans = first.querySelector('.faq-answer');
    const icon = first.querySelector('.faq-question i');
    if (ans) ans.style.display = 'block';
    if (icon) icon.style.transform = 'rotate(180deg)';
  }
}

document.addEventListener('DOMContentLoaded', initFAQ);