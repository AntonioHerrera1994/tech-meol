/* ══════════════════════════════════════
   TECH MEOL GROUP — services.js
   ══════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Scroll Reveal ── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      });
    }, { threshold: 0.1 });
    els.forEach((el) => obs.observe(el));
  }

  /* ── Accordion — label updates only, no image swap ── */
  function initAccordion() {
    const items = document.querySelectorAll('.acc-item');
    const label = document.getElementById('svc-active-label');

    items.forEach((item) => {
      const btn  = item.querySelector('.acc-header');
      const body = item.querySelector('.acc-body');

      btn.addEventListener('click', () => {
        const isOpen = btn.classList.contains('active');

        /* Close all */
        items.forEach((i) => {
          i.querySelector('.acc-header').classList.remove('active');
          i.querySelector('.acc-body').classList.remove('open');
        });

        if (!isOpen) {
          /* Open clicked item */
          btn.classList.add('active');
          body.classList.add('open');
          updateLabel(btn.querySelector('.acc-label').textContent.trim());
        } else {
          /* Clicking open item closes it — revert label to first */
          const first = items[0];
          first.querySelector('.acc-header').classList.add('active');
          first.querySelector('.acc-body').classList.add('open');
          updateLabel(first.querySelector('.acc-label').textContent.trim());
        }
      });
    });

    function updateLabel(text) {
      if (!label) return;
      /* Fade out → swap text → fade in */
      label.style.opacity = '0';
      setTimeout(() => {
        label.textContent = text;
        label.style.opacity = '1';
      }, 180);
    }
  }

  /* ── Smooth scroll ── */
  function initScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const nav = document.getElementById('navbar');
        const offset = (nav ? nav.offsetHeight : 0) + 20;
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
      });
    });
  }

  /* ── Footer year ── */
  function initYear() {
    const el = document.getElementById('footerYear');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ── Init ── */
  function init() {
    initReveal();
    initAccordion();
    initScroll();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();