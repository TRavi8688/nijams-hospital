'use strict';

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => scope.querySelectorAll(selector);

// ─── Emergency Bar Dismiss ───────────────────────────────────────────────────

function initEmergencyBar() {
  const bar = $('#emergency-bar');
  const closeBtn = $('#emergency-close');
  if (!bar || !closeBtn) return;

  if (sessionStorage.getItem('emergency-bar-dismissed') === 'true') {
    bar.style.display = 'none';
    return;
  }

  closeBtn.addEventListener('click', () => {
    bar.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    bar.style.opacity = '0';
    bar.style.transform = 'translateY(-100%)';
    setTimeout(() => {
      bar.style.display = 'none';
      sessionStorage.setItem('emergency-bar-dismissed', 'true');
    }, 300);
  });
}

// ─── Sticky Navigation ─────────────────────────────────────────────────────────

function initStickyNav() {
  const nav = $('#main-nav');
  if (!nav) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// ─── Active Nav Link ───────────────────────────────────────────────────────────

function initActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = $$('#nav-links a, #mobile-drawer a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ─── Mobile Hamburger / Drawer with Backdrop Overlay ──────────────────────────

function initMobileDrawer() {
  const hamburgerBtn = $('#hamburger-btn');
  const drawer = $('#mobile-drawer');
  const drawerClose = $('#drawer-close');

  if (!hamburgerBtn || !drawer) return;

  // Create backdrop overlay if not already in DOM
  let overlay = $('.mobile-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    document.body.appendChild(overlay);
  }

  let isOpen = false;

  const openDrawer = (e) => {
    if (e) e.preventDefault();
    isOpen = true;
    drawer.classList.add('open');
    hamburgerBtn.classList.add('open');
    overlay.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = (e) => {
    if (e) e.preventDefault();
    isOpen = false;
    drawer.classList.remove('open');
    hamburgerBtn.classList.remove('open');
    overlay.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburgerBtn.addEventListener('click', (e) => {
    isOpen ? closeDrawer(e) : openDrawer(e);
  });

  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeDrawer();
  });

  // Close when clicking any link inside drawer
  $$('a', drawer).forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

// ─── Scroll Reveal ─────────────────────────────────────────────────────────────

function initScrollReveal() {
  const revealElements = $$('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

  revealElements.forEach(el => observer.observe(el));
}

// ─── Back to Top ───────────────────────────────────────────────────────────────

function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── Mobile Sticky Bottom Action Bar ──────────────────────────────────────────

function injectMobileBottomBar() {
  if ($('.mobile-bottom-bar')) return;

  const bar = document.createElement('div');
  bar.className = 'mobile-bottom-bar';
  bar.innerHTML = `
    <a href="tel:08612315777" class="mobile-bar-call" aria-label="Call Hospital">
      <i class="fas fa-phone-alt"></i>
      <span>కాల్ చేయండి</span>
    </a>
    <a href="https://wa.me/919177363774" target="_blank" class="mobile-bar-whatsapp" aria-label="WhatsApp Support">
      <i class="fab fa-whatsapp"></i>
      <span>వాట్సాప్</span>
    </a>
    <a href="contact.html" class="mobile-bar-book" aria-label="Book Appointment">
      <i class="fas fa-calendar-check"></i>
      <span>బుకింగ్</span>
    </a>
  `;
  document.body.appendChild(bar);
}

document.addEventListener('DOMContentLoaded', () => {
  initEmergencyBar();
  initStickyNav();
  initActiveNavLink();
  initMobileDrawer();
  initScrollReveal();
  initBackToTop();
  injectMobileBottomBar();
});
